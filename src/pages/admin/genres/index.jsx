import { useEffect, useState } from "react";
import { getGenres, deleteGenre } from "../../../_services/genres";
import { Link } from "react-router-dom";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchGenres = async () => {
    try {
      setLoading(true);

      const data = await getGenres();

      const result = Array.isArray(data)
        ? data
        : data?.data || [];

      setGenres(result);

    } catch (err) {
      console.error("GET GENRES ERROR:", err.response?.data || err);
      setError("Gagal mengambil data genre");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const init = async () => {
      await fetchGenres();
    };

    init();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Yakin mau hapus genre ini?");
    if (!confirmDelete) return;

    try {
      await deleteGenre(id);
      setGenres((prev) => prev.filter((g) => g.id !== id));

    } catch (error) {
      console.error("DELETE ERROR:", error.response?.data || error);
      alert("Gagal menghapus genre");
    }
  };

  return (
    <section className="p-6 text-white min-h-screen bg-slate-950">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Genres</h1>
          <p className="text-gray-400 text-sm">
            Manage your genres data
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/admin/genres/create"
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-xl"
          >
            + Add Genre
          </Link>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        {loading && (
          <div className="p-6 text-center text-gray-400">
            Loading...
          </div>
        )}

        {error && (
          <div className="p-6 text-center text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <table className="w-full text-sm">

            <thead className="bg-slate-800 text-gray-300">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {genres.length > 0 ? (
                genres.map((g) => (
                  <tr
                    key={g.id}
                    className="border-t border-slate-800 hover:bg-slate-800/60"
                  >
                    <td className="px-6 py-4 text-gray-300">
                      #{g.id}
                    </td>

                    <td className="px-6 py-4 font-medium">
                      {g.name}
                    </td>

                    <td className="px-6 py-4 text-right space-x-2">

                      <Link
                        to={`/admin/genres/edit/${g.id}`}
                        className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(g.id)}
                        className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-10 text-gray-500">
                    🚫 No genres found
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