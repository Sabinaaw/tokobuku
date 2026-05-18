import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../../_api";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState(""); 
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const loadCart = async () => {
    try {
      const { data } = await API.get("/cart");
      const items = data?.data || data || [];
      setCartCount(items.length);
    } catch (error) {
      console.error("LOAD CART ERROR:", error.response?.data || error);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadBooks() {
      try {
        const { data } = await API.get("/books");
        const booksData = Array.isArray(data) ? data : data.data || [];

        if (!ignore) {
          setBooks(booksData);
        }
      } catch (err) {
        console.error("FETCH BOOKS ERROR:", err.response?.data || err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    async function fetchData() {
      await loadBooks();
      await loadCart();
    }
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddToCart = async (bookId) => {
    try {
      const { data } = await API.post("/cart/add", {
        book_id: bookId,
        quantity: 1,
      });

      await loadCart();
      alert(data?.message || "Book berhasil ditambahkan ke cart!");
    } catch (error) {
      console.error("ADD TO CART ERROR:", error.response?.data || error);

      if (error.response?.status === 401) {
        alert("Silakan login terlebih dahulu.");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Gagal menambahkan ke cart.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Filter books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/70 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div>
            <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-cyan-300 via-indigo-200 to-pink-300 bg-clip-text">
              Nawbooks
            </h1>
            <p className="mt-1 text-sm text-gray-300"> Explore your favorite books </p>
          </div>

          {/* User Section*/}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome back 👋</p>
              <h2 className="text-lg font-bold">{user?.name || "Guest"}</h2>
            </div>
            <div className="relative">
              <button
                onClick={() => navigate("/checkout")}
                className="p-3 transition bg-slate-800 hover:bg-slate-700 rounded-2xl"
              >
                🛒
              </button>
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-pink-500 rounded-full -top-2 -right-2">
                {cartCount}
              </span>
            </div>
            <button
              onClick={() => navigate("/my-transactions")}
              className="px-5 py-2 text-sm font-semibold text-indigo-300 transition border bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/50 rounded-2xl"
            >
              My Orders
            </button>
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-semibold text-red-400 transition border bg-red-500/20 hover:bg-red-500/30 border-red-500/50 rounded-2xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content*/}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-6 text-4xl font-black">
          Recommended Books ✨
        </h2>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search buku..."
            className="w-full max-w-md px-4 py-3 text-white border rounded-2xl bg-slate-800 border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400">
            Loading books...
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="py-20 text-center text-gray-500">
            {search ? "Buku tidak ditemukan 🔍" : "Buku belum tersedia"}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className={`group bg-slate-900/80 backdrop-blur border border-slate-800 rounded-[30px] overflow-hidden transition-all duration-300 shadow-2xl ${
                  book.stock > 0
                    ? "hover:border-indigo-500/40 hover:-translate-y-3"
                    : "opacity-60"
                }`}
              >

                <div className="relative overflow-hidden h-80 bg-slate-800">
                  <img
                    src={
                      book.image
                        ? `http://127.0.0.1:8000/books/${book.image}`
                        : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
                    }
                    alt={book.title}
                    className="object-cover w-full h-full transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-500/90 text-white text-xs px-4 py-1.5 rounded-full font-semibold">
                      {book.genre?.name || "Unknown"}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${
                      book.stock > 0 ? "bg-green-500/90" : "bg-red-500/90"
                    }`}>
                      {book.stock > 0 ? `Stock: ${book.stock}` : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold line-clamp-1"> {book.title} </h3>
                  <p className="mt-3 text-sm text-gray-400"> ✍️ {book.author?.name || "Unknown Author"} </p>
                  <p className="mt-4 text-sm text-gray-500 line-clamp-2 min-h-[40px]"> {book.description || "No description available"} </p>
                  <div className="flex items-center justify-between mt-7">
                    <div>
                      <p className="text-xs text-gray-400">Price</p>
                      <h2 className="text-2xl font-black text-green-400">
                        Rp {Number(book.price).toLocaleString("id-ID")}
                      </h2>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/customer/books/${book.id}`}
                        className="px-4 py-2.5 rounded-2xl font-semibold bg-slate-800 hover:bg-slate-700">
                        Detail
                      </Link>
                      <button
                        disabled={book.stock <= 0}
                        onClick={() => handleAddToCart(book.id)}
                        className={`px-4 py-2.5 rounded-2xl font-semibold ${
                          book.stock > 0
                            ? "bg-indigo-600 hover:scale-105"
                            : "bg-slate-700 text-gray-400"
                        }`}
                      > 🛒 Add
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* About dan contact admin */}
        <div className="grid grid-cols-1 gap-8 mt-20 lg:grid-cols-2">
          <div className="p-8 border bg-slate-900/70 border-slate-800 rounded-[30px]">
            <h3 className="mb-4 text-2xl font-black">About Nawbooks 📚</h3>
            <p className="text-gray-400"> Nawbooks adalah platform toko buku online modern. </p>
          </div>
          
          <div className="p-8 border bg-slate-900/70 border-slate-800 rounded-[30px]">
            <h3 className="mb-4 text-2xl font-black">Contact Admin 🛠️</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div>📧 nawbooks@gmail.com</div>
              <div>💬 +62 813-8272-6985</div>
            </div>

            <a
              href="https://wa.me/qr/NAWAA63ENTVFD1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 mt-6 font-semibold transition bg-green-500 hover:bg-green-400 rounded-2xl">
              💬 Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}