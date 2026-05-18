import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../../_api";
import { deleteBook } from "../../../_services/books";

export default function AdminBooks() {

  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const fetchBooks = async () => {
    try {
      setLoading(true);
      let url = "/books?";

      // SEARCH
      if (search) {
        url += `search=${search}&`;
      }

      // FILTER GENRE
      if (selectedGenre) {
        url += `genre_id=${selectedGenre}`;
      }
      const res = await API.get(url);
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setBooks(data);
    } catch (error) {
      console.error(
        "FETCH BOOK ERROR:",
        error.response?.data || error
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const res = await API.get("/genres");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setGenres(data);
    } catch (error) {
      console.error(
        "FETCH GENRE ERROR:",
        error.response?.data || error
      );
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchGenres();
      await fetchBooks();
    };
    init();
  }, []);

  useEffect(() => {
    const delay = setTimeout(async () => {
      await fetchBooks();
    }, 500);
    return () => clearTimeout(delay);
  }, [search, selectedGenre]);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Yakin mau hapus buku ini?"
    );
    if (!confirmDelete) return;
    try {
      await deleteBook(id);
      setBooks((prev) =>
        prev.filter((book) => book.id !== id)
      );
      alert("Buku berhasil dihapus");
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error.response?.data || error
      );
      alert(
        error.response?.data?.message ||
        "Gagal menghapus buku"
      );
    }
  };

  return (
    <div className="min-h-screen p-6 text-white bg-slate-950">

      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            📚 Books
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            Manage your books data
          </p>
        </div>
        <Link
          to="/admin/books/create"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl text-center"
        >
          Add Book
        </Link>
      </div>
      <div className="flex flex-col gap-4 p-4 mb-6 bg-slate-900 rounded-2xl md:flex-row">
        <input type="text" placeholder="Search title..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-1 px-4 py-3 border outline-none bg-slate-800 border-slate-700 rounded-xl"/>
        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="px-4 py-3 border outline-none bg-slate-800 border-slate-700 rounded-xl" >
          <option value="">
            All Genre
          </option>
          {genres.map((genre) => (
            <option
              key={genre.id}
              value={genre.id}
            >
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="py-10 text-center text-gray-400">
          Loading data...
        </div>
      )}

      {/* TABLE */}
      {!loading && (
        <div className="overflow-hidden border bg-slate-900 rounded-2xl border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-300 bg-slate-800">
                <tr>
                  <th className="px-6 py-4 text-left">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left">
                    Genre
                  </th>
                  <th className="px-6 py-4 text-left">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {books.length > 0 ? (
                  books.map((book) => (
                    <tr
                      key={book.id}
                      className="border-t border-slate-800 hover:bg-slate-800/50"
                    >

                      <td className="px-6 py-4">
                        {book.image ? (
                          <img
                            src={`http://127.0.0.1:8000/books/${book.image}`}
                            alt={book.title}
                            className="object-cover w-16 h-20 rounded-lg"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-16 h-20 text-xs text-gray-400 rounded-lg bg-slate-700">
                            No Image
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-semibold">
                          {book.title}
                        </div>
                        <div className="mt-1 text-xs text-gray-400 line-clamp-2">
                          {book.description || "-"}
                        </div>
                      </td>

                      {/* AUTHOR */}
                      <td className="px-6 py-4">
                        {book.author?.name || "-"}
                      </td>

                      {/* GENRE */}
                      <td className="px-6 py-4">
                        {book.genre?.name || "-"}
                      </td>

                      {/* STOCK */}
                      <td className="px-6 py-4">
                        {book.stock}
                      </td>

                      {/* PRICE */}
                      <td className="px-6 py-4 font-medium text-indigo-400">
                        Rp{" "}
                        {Number(book.price || 0)
                          .toLocaleString("id-ID")}
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {/* EDIT */}
                          <Link
                            to={`/admin/books/edit/${book.id}`}
                            className="px-3 py-2 text-xs text-yellow-400 rounded-lg bg-yellow-500/20"
                          >
                            Edit
                          </Link>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="px-3 py-2 text-xs text-red-400 rounded-lg bg-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="py-10 text-center text-gray-400"
                    >
                      🚫 No books found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}