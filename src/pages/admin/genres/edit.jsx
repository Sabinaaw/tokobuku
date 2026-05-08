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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex justify-center items-center">

      <div className="w-full max-w-lg bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6">
          ✏️ Edit Genre
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-400">
              Genre Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Masukkan nama genre"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-2 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/genres")}
              className="px-4 py-2 rounded-lg border border-slate-600 text-gray-400 hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
            >
              Update
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}