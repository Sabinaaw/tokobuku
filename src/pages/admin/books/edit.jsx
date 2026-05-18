import { useEffect, useState } from "react";
import { getBookById, updateBook } from "../../../_services/books";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function EditBook() {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, authorRes, genreRes] = await Promise.all([
          getBookById(id),
          API.get("/authors"),
          API.get("/genres"),
        ]);

        const authorsData = Array.isArray(authorRes.data)
          ? authorRes.data
          : authorRes.data.data || [];

        const genresData = Array.isArray(genreRes.data)
          ? genreRes.data
          : genreRes.data.data || [];

        setAuthors(authorsData);
        setGenres(genresData);

        setForm({
          title: bookRes.title || "",
          price: bookRes.price || "",
          author_id: String(bookRes.author_id || ""), // 🔥 fix dropdown
          genre_id: String(bookRes.genre_id || ""),   // 🔥 fix dropdown
        });

      } catch (error) {
        console.error("ERROR FETCH:", error.response?.data || error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateBook(id, {
        ...form,
        price: Number(form.price),
        author_id: Number(form.author_id),
        genre_id: Number(form.genre_id),
      });

      navigate("/admin/books");
    } catch (error) {
      console.error(error.response?.data);
      alert("Gagal update buku");
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen p-6 text-white bg-slate-950">
      <div className="w-full max-w-lg p-6 bg-slate-900 rounded-xl">
        <h1 className="mb-6 text-xl font-bold">Edit Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} className="w-full p-2 rounded bg-slate-800"/>

          <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full p-2 rounded bg-slate-800"/>
          <select name="author_id" value={form.author_id} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
            <option value="">-- Pilih Author --</option>
            {authors.map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>

          <select name="genre_id" value={form.genre_id} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
            <option value="">-- Pilih Genre --</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <button className="px-4 py-2 bg-indigo-600 rounded">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}