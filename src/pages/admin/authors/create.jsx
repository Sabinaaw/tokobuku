import { useState } from "react";
import { createAuthor } from "../../../_services/authors";
import { useNavigate } from "react-router-dom";

export default function AuthorCreate() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Nama author tidak boleh kosong");
            return;
        }

        try {
            setLoading(true);
            setError(null);

            console.log("PAYLOAD:", { name });

            await createAuthor({ name });

            alert("Author berhasil ditambahkan ✅");

            navigate("/admin/authors");

        } catch (err) {
            console.error("CREATE ERROR:", err.response?.data || err);

            if (err.response?.status === 401) {
                setError("Unauthorized (token tidak dikirim / invalid)");
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Gagal menambahkan author");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-slate-900 p-6 rounded-xl border border-slate-700 w-full max-w-md"
            >
                <h1 className="text-xl font-bold mb-4 text-indigo-500">
                    Create Author
                </h1>

                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 p-2 rounded mb-3 text-sm">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Author Name"
                    className="w-full p-2 mb-4 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded font-semibold"
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}