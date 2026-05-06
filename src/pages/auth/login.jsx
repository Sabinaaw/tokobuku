import { useState } from "react";
import { login } from "../../_services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError(null);

            const res = await login({ email, password });

            localStorage.setItem("token", res.access_token);

            navigate("/admin/authors");

        } catch (err) {
            console.error(err.response?.data || err);
            setError("Email atau password salah");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8">

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-2 text-indigo-500">
                    Welcome Back 👋
                </h1>
                <p className="text-center text-gray-400 text-sm mb-6">
                    Login untuk melanjutkan
                </p>

                {/* Error */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="admin@gmail.com"
                            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Button */}
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-4 py-2 rounded-lg font-semibold shadow-md disabled:opacity-50"
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="text-sm text-gray-400 text-center mt-6">
                    Belum punya akun?{" "}
                    <span
                        onClick={() => navigate("/register")}
                        className="text-indigo-400 cursor-pointer hover:underline"
                    >
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
}