import { useState } from "react";
import { createGenre } from "../../../_services/genres";
import { useNavigate } from "react-router-dom";

export default function GenreCreate() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Nama genre tidak boleh kosong");
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            console.log("TOKEN DI CREATE:", token);
            await createGenre({ name }, token);
            navigate("/admin/genres");

        } catch (err) {
            console.error(err.response?.data || err);
            if (err.response?.status === 401) {
                setError("Unauthorized (token tidak valid)");
            } else {
                setError("Gagal menambahkan genre");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center min-h-screen p-6 text-white bg-slate-950">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-6 border shadow-lg bg-slate-900 border-slate-700 rounded-2xl">
                <h1 className="mb-6 text-2xl font-semibold text-center">
                    Create Genre
                </h1>
                {error && (
                    <div className="p-3 mb-4 text-sm text-center text-red-400 border border-red-500 rounded-lg bg-red-500/10">
                        {error}
                    </div>
                )}
                <div className="mb-4">
                    <label className="block mb-1 text-sm text-gray-400">
                        Genre Name
                    </label>
                    <input type="text" placeholder="Masukan Genre" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded-lg bg-slate-800 border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                </div>
                <button disabled={loading} className="w-full px-4 py-2 font-semibold transition bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50">
                    {loading ? "Submitting..." : "Create Genre"}
                </button>
            </form>

        </section>
    );
}