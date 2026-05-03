import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { Link } from "react-router-dom";

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const booksData = await getBooks();
      console.log("API RESULT:", booksData);
      setBooks(booksData);
    };

    fetchData();
  }, []);

  const toggleDropdown = (id) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="bg-white dark:bg-gray-800 shadow-md sm:rounded-lg overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between p-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Books
          </h2>

          <Link
            to="/admin/books/create"
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            + Add Book
          </Link>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Genre</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>

            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr
                    key={book.id}
                    className="border-b dark:border-gray-700"
                  >
                    <td className="px-4 py-3">{book.title}</td>
                    <td className="px-4 py-3">{book.price}</td>

                    {/* 🔥 ambil dari relasi */}
                    <td className="px-4 py-3">
                      {book.author?.name || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {book.genre?.name || "-"}
                    </td>

                    <td className="px-4 py-3">
                      {new Date(book.created_at).toLocaleDateString()}
                    </td>

                    {/* ACTION */}
                    <td className="px-4 py-3 relative text-right">
                      <button
                        onClick={() => toggleDropdown(book.id)}
                        className="text-gray-500 hover:text-black"
                      >
                        ⋮
                      </button>

                      {openDropdownId === book.id && (
                        <div className="absolute right-0 mt-2 w-32 bg-white shadow rounded z-10">
                          <Link
                            to={`/admin/books/edit/${book.id}`}
                            className="block px-4 py-2 hover:bg-gray-100"
                          >
                            Edit
                          </Link>

                          <button
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Data Tidak Ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}