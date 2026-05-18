import { useEffect, useState } from "react";
import { getGenreById, updateGenre } from "../../../_services/genres";
import { useNavigate, useParams } from "react-router-dom";

export default function EditGenre() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const data = await getGenreById(id);

        if (!ignore) {
          setName(data.name || "");
        }

      } catch (error) {
        console.error("ERROR FETCH GENRE:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadData();
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateGenre(id, { name });
      navigate("/admin/genres");
    } catch (error) {
      console.error(error.response?.data || error);
      alert("Gagal update genre");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400 bg-slate-950">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white bg-slate-950">
      <div className="w-full max-w-lg p-6 border shadow-xl bg-slate-900 rounded-2xl border-slate-700">
        <h1 className="mb-6 text-2xl font-bold">Edit Genre</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400"> Genre Name </label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2 mt-1 border rounded-lg outline-none bg-slate-800 border-slate-700 focus:ring-2 focus:ring-indigo-500" placeholder="Masukkan nama genre" />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="px-4 py-2 text-gray-400 border rounded-lg border-slate-600 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}