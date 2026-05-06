import { useEffect, useState } from "react";
import { getAuthorById, updateAuthor } from "../../../_services/authors";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await getAuthorById(id);
        const author = res?.data ? res.data : res;

        if (isMounted) {
          setName(author?.name || "");
        }

      } catch (error) {
        console.error("FETCH AUTHOR ERROR:", error.response?.data || error);
        alert("Gagal mengambil data author");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Nama author tidak boleh kosong");
      return;
    }

    try {
      await updateAuthor(id, { name });

      alert("Berhasil update author ✅");
      navigate("/admin/authors");

    } catch (error) {
      console.error("UPDATE ERROR:", error.response?.data || error);

      alert(
        error.response?.data?.message ||
        "Gagal update author"
      );
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
          ✏️ Edit Author
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* INPUT */}
          <div>
            <label className="text-sm text-gray-400">
              Author Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Masukkan nama author"
              className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* BUTTON */}
          <div className="flex justify-end gap-2 pt-4">

            <button
              type="button"
              onClick={() => navigate("/admin/authors")}
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