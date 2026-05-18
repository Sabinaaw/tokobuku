import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../_api";

export default function CustomerBookDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchBook() {
      try {
        const { data } = await API.get("/books");

        const books = Array.isArray(data)
          ? data
          : data.data || [];

        const selectedBook = books.find(
          (item) => String(item.id) === String(id)
        );

        if (!ignore) {
          setBook(selectedBook || null);
        }
      } catch (error) {
        console.error(
          "FETCH DETAIL ERROR:",
          error.response?.data || error
        );
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchBook();

    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">
          Buku tidak ditemukan
        </h1>

        <button
          onClick={() => navigate("/customer")}
          className="px-6 py-3 transition bg-slate-800 rounded-2xl hover:bg-slate-700"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="px-6 mx-auto max-w-7xl py-14">
        <button
          onClick={() => navigate("/customer")}
          className="px-6 py-3 mb-8 transition bg-slate-800 rounded-2xl hover:bg-slate-700"
        >
          ← Kembali
        </button>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div className="rounded-[32px] overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <img
              src={
                book.image
                  ? `http://127.0.0.1:8000/books/${book.image}`
                  : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
              }
              alt={book.title}
              className="w-full h-[700px] object-cover"
            />
          </div>

          <div className="pt-6">
            <h1 className="mb-6 text-5xl font-black leading-tight">
              {book.title}
            </h1>

            <div className="space-y-3 text-xl text-gray-300">
              <p>
                ✍️ {book.author?.name || "Unknown Author"}
              </p>

              <p>
                📚 {book.genre?.name || "Unknown Genre"}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-6xl font-black text-green-400">
                Rp{" "}
                {Number(book.price).toLocaleString("id-ID")}
              </h2>
            </div>

            <p className="mt-8 text-lg leading-9 text-gray-300">
              {book.description ||
                "No description available."}
            </p>

            <div className="mt-8">
              <span
                className={`inline-block px-6 py-3 rounded-full font-bold text-lg ${
                  book.stock > 0
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {book.stock > 0
                  ? `Stock: ${book.stock}`
                  : "Out of Stock"}
              </span>
            </div>

            <button
              disabled={book.stock <= 0}
              className={`mt-10 px-10 py-4 rounded-2xl font-bold text-lg transition ${
                book.stock > 0
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
                  : "bg-slate-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}