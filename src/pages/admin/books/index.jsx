import { useEffect, useState } from "react";
import { getBooks, deleteBook } from "../../../_services/books";
import { Link } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getBooks();

        console.log("DATA:", data); // debug

        const result = Array.isArray(data)
          ? data
          : data?.data || [];

        if (isMounted) {
          setBooks(result);
        }

      } catch (err) {
        console.error("FETCH ERROR:", err.response?.data || err);

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            "Gagal mengambil data buku"
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus buku ini?");
    if (!confirmDelete) return;

    try {
      await deleteBook(id);

      // update state tanpa reload
      setBooks((prev) => prev.filter((b) => b.id !== id));

    } catch (error) {
      console.error("DELETE ERROR:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
        "Gagal menghapus buku"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">📚 Books</h1>
          <p className="text-gray-400 text-sm mt-1">
            Manage your books data
          </p>
        </div>

        <Link
          to="/admin/books/create"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl"
        >
          + Add Book
        </Link>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-400">
          Loading data...
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl text-center">
          {error}
        </div>
      )}

      {/* TABLE */}
      {!loading && !error && (
        <div className="bg-slate-900 rounded-xl overflow-hidden">
          <table className="w-full text-sm">

            <thead className="bg-slate-800 text-gray-300">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Title</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Author</th>
                <th className="px-6 py-4 text-left">Genre</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="border-t border-slate-700 hover:bg-slate-800"
                  >
                    <td className="px-6 py-4">#{book.id}</td>

                    <td className="px-6 py-4 font-medium">
                      {book.title}
                    </td>

                    <td className="px-6 py-4 text-indigo-400">
                      Rp {Number(book.price || 0).toLocaleString("id-ID")}
                    </td>

                    <td className="px-6 py-4">
                      {book.author?.name || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {book.genre?.name || "-"}
                    </td>

                    <td className="px-6 py-4 flex gap-2">

                      {/* EDIT */}
                      <Link
                        to={`/admin/books/edit/${book.id}`}
                        className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-xs"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(book.id)}
                        className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-xs"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-400">
                    Belum ada data buku
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
}