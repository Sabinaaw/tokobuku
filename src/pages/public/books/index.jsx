import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../_services/_api";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await API.get("/books");
        setBooks(Array.isArray(data) ? data : data.data || []);
      } catch (error) {
        console.error(
          "FETCH BOOKS ERROR:",
          error.response?.data || error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const displayedBooks = books.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className="px-6 py-12 mx-auto max-w-7xl">
      {loading ? (
        <div className="py-20 text-xl text-center text-gray-400">
          Loading books...
        </div>
      ) : books.length === 0 ? (
        <div className="py-20 text-xl text-center text-gray-500">
          Buku belum tersedia.
        </div>
      ) : (
        <>
          <div className="mb-12">
            <h1 className="text-5xl font-black text-white">
              Discover Your Favorite Books
            </h1>

            <p className="mt-3 text-lg text-gray-400">
              Explore the best collection of books,
              manga, and novels.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayedBooks.map((book) => (
              <div
                key={book.id}
                className="
                  group
                  bg-slate-900/80
                  backdrop-blur-xl
                  border
                  border-slate-800
                  rounded-[30px]
                  overflow-hidden
                  shadow-2xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-indigo-500/40
                  hover:shadow-indigo-500/10
                "
              >
                {/* IMAGE */}
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

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* GENRE */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="
                        bg-indigo-500/90
                        text-white
                        text-xs
                        px-4
                        py-1.5
                        rounded-full
                        font-semibold
                        backdrop-blur
                      "
                    >
                      {book.genre?.name || "Unknown Genre"}
                    </span>
                  </div>

                  {/* STOCK */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`
                        text-xs
                        px-3
                        py-1.5
                        rounded-full
                        font-semibold
                        backdrop-blur
                        ${
                          book.stock > 0
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }
                      `}
                    >
                      {book.stock > 0
                        ? `Stock: ${book.stock}`
                        : "Out of Stock"}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white line-clamp-1">
                    {book.title}
                  </h3>

                  <p className="mt-3 text-sm text-gray-400">
                    ✍️{" "}
                    {book.author?.name ||
                      "Unknown Author"}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-gray-500 line-clamp-2 min-h-[48px]">
                    {book.description ||
                      "No description available."}
                  </p>

                  <div className="flex items-end justify-between gap-3 mt-7">
                    <div>
                      <p className="text-xs text-gray-400">
                        Price
                      </p>

                      <h2 className="text-2xl font-black text-green-400">
                        Rp{" "}
                        {Number(
                          book.price || 0
                        ).toLocaleString("id-ID")}
                      </h2>
                    </div>

                    <Link
                      to={`/books/${book.id}`}
                      className="px-5 py-3 font-semibold text-white transition shadow-lg bg-slate-800 hover:bg-slate-700 rounded-2xl"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleCount < books.length && (
            <div className="text-center mt-14">
              <button
                onClick={handleShowMore}
                className="px-8 py-4 font-semibold text-gray-300 transition border rounded-2xl border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}