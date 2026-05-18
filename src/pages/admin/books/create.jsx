import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function CreateBook() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    author_id: "",
    genre_id: "",
    image: null,
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

        setAuthors(authorRes.data.data || []);
        setGenres(genreRes.data.data || []);
      } catch (error) {
        void error;
        alert("Gagal mengambil data author dan genre.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "image" ? files?.[0] || null : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.price || !form.stock || !form.author_id || !form.genre_id) {
      alert("Semua field wajib diisi!");
      return;
    }

    try {
      setSubmitLoading(true);

      const formData = new FormData();

      Object.entries({
        title: form.title,
        description: form.description || "",
        price: form.price,
        stock: form.stock,
        author_id: form.author_id,
        genre_id: form.genre_id,
      }).forEach(([key, value]) => formData.append(key, value));

      if (form.image) formData.append("image", form.image);

      const res = await API.post("/books", formData, {
        headers: { Accept: "application/json" },
      });

      alert(res.data.message || "Book berhasil ditambahkan! ✅");
      navigate("/admin/books");
    } catch (error) {
      const err = error.response;

      if (err?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (err?.status === 403) {
        alert("Akses ditolak. Hanya admin.");
        return;
      }

      if (err?.status === 422) {
        const errors = err?.data?.errors;
        if (errors) {
          const firstKey = Object.keys(errors)[0];
          alert(errors[firstKey][0]);
          return;
        }
      }

      alert(err?.data?.message || "Gagal menambahkan book.");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-20 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white bg-slate-950">
      <div className="w-full max-w-2xl p-6 border shadow-xl bg-slate-900 rounded-2xl border-slate-700">
        <h1 className="mb-6 text-3xl font-bold">Create Book</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Author</label>
            <select
              name="author_id"
              value={form.author_id}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            >
              <option value="">-- Select Author --</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Genre</label>
            <select
              name="genre_id"
              value={form.genre_id}
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            >
              <option value="">-- Select Genre --</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-xl bg-slate-800 border-slate-700"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/admin/books")}
              className="px-5 py-2 text-gray-400 border rounded-xl border-slate-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitLoading}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl disabled:opacity-50"
            >
              {submitLoading ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}