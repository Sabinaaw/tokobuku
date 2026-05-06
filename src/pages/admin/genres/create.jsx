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
        <section className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-6">

            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-lg"
            >
                {/* HEADER */}
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Create Genre
                </h1>

                {/* ERROR */}
                {error && (
                    <div className="mb-4 p-3 text-sm rounded-lg bg-red-500/10 border border-red-500 text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* INPUT */}
                <div className="mb-4">
                    <label className="block text-sm text-gray-400 mb-1">
                        Genre Name
                    </label>

                    <input
                        type="text"
                        placeholder="e.g Fantasy"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* BUTTON */}
                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
                >
                    {loading ? "Submitting..." : "Create Genre"}
                </button>

                {/* BACK LINK */}
                <button
                    type="button"
                    onClick={() => navigate("/admin/genres")}
                    className="w-full mt-3 text-sm text-gray-400 hover:text-white transition"
                >
                    ← Back to Genres
                </button>
            </form>

        </section>
    );
}