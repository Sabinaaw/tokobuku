import { useEffect, useState } from "react";
import { createBook } from "../../../_services/books";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function CreateBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    author_id: "",
    genre_id: "",
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorRes, genreRes] = await Promise.all([
          API.get("/authors"),
          API.get("/genres"),
        ]);

        const authorData = Array.isArray(authorRes.data)
          ? authorRes.data
          : authorRes.data.data || [];

        const genreData = Array.isArray(genreRes.data)
          ? genreRes.data
          : genreRes.data.data || [];

        setAuthors(authorData);
        setGenres(genreData);
      } catch (error) {
        console.error("Error fetch dropdown:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDASI FRONTEND
    if (!form.title || !form.price || !form.author_id || !form.genre_id) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      setSubmitLoading(true);

      await createBook({
        ...form,
        price: Number(form.price),
        author_id: Number(form.author_id),
        genre_id: Number(form.genre_id),
      });

      navigate("/admin/books");
    } catch (error) {
      console.error("ERROR DETAIL:", error.response?.data);

      alert(
        error.response?.data?.message ||
        JSON.stringify(error.response?.data)
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-lg bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700">

        <h1 className="text-2xl font-bold mb-6">
          + Add Book
        </h1>

        {loading ? (
          <div className="text-center py-10 text-gray-400">
            Loading data...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* TITLE */}
            <div>
              <label className="text-sm text-gray-400">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

            {/* PRICE */}
            <div>
              <label className="text-sm text-gray-400">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

            {/* AUTHOR */}
            <div>
              <label className="text-sm text-gray-400">Author</label>
              <select
                name="author_id"
                value={form.author_id}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700"
              >
                <option value="">-- Pilih Author --</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GENRE */}
            <div>
              <label className="text-sm text-gray-400">Genre</label>
              <select
                name="genre_id"
                value={form.genre_id}
                onChange={handleChange}
                className="w-full mt-1 p-2 rounded-lg bg-slate-800 border border-slate-700"
              >
                <option value="">-- Pilih Genre --</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => navigate("/admin/books")}
                className="px-4 py-2 rounded-lg border border-slate-600 text-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitLoading}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {submitLoading ? "Saving..." : "Save"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}