import { useEffect, useState } from "react";
import { getAuthors, deleteAuthor } from "../../../_services/authors";
import { Link } from "react-router-dom";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAuthors();

        const result = Array.isArray(data)
          ? data
          : data?.data || [];

        if (isMounted) {
          setAuthors(result);
        }

      } catch (error) {
        console.error("ERROR DETAIL:", error.response?.data || error);

        if (isMounted) {
          setError("Gagal mengambil data author");
        }

      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus author ini?");
    if (!confirmDelete) return;

    try {
      await deleteAuthor(id);
      setAuthors((prev) => prev.filter((a) => a.id !== id));

    } catch (error) {
      console.error("DELETE ERROR:", error.response?.data || error);
      alert(
        error.response?.data?.message ||
        "Gagal menghapus author"
      );
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 p-6 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Authors</h1>
          <p className="text-gray-400 text-sm">
            Manage your authors data
          </p>
        </div>

        <Link
          to="/admin/authors/create"
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl shadow-lg transition font-medium"
        >
          + Add Author
        </Link>
      </div>

      {/* CARD */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl overflow-hidden">

        {/* LOADING */}
        {loading && (
          <div className="p-6 text-center text-gray-400">
            Loading...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {/* TABLE */}
        {!loading && !error && (
          <table className="w-full text-sm">

            <thead className="bg-slate-800 text-gray-300">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">ID</th>
                <th className="text-left px-6 py-4 font-semibold">Name</th>
                <th className="text-right px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {authors.length > 0 ? (
                authors.map((a) => (
                  <tr
                    key={a.id}
                    className="border-t border-slate-700 hover:bg-slate-800/60 transition"
                  >
                    <td className="px-6 py-4 text-gray-300">
                      #{a.id}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {a.name}
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">

                      {/* EDIT */}
                      <Link
                        to={`/admin/authors/edit/${a.id}`}
                        className="px-3 py-1.5 text-xs bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30"
                      >
                        Edit
                      </Link>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(a.id)}
                        className="px-3 py-1.5 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center py-10 text-gray-500"
                  >
                    🚫 No authors found
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        )}
      </div>
    </section>
  );
}