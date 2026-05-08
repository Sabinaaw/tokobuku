import { useState } from "react";
import { login } from "../../_services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // =========================================
    // HANDLE CHANGE
    // =========================================
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    // =========================================
    // VALIDATION
    // =========================================
    const validate = () => {

        if (!form.email.trim()) {
            setError("Email wajib diisi");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError("Format email tidak valid");
            return false;
        }

        if (!form.password.trim()) {
            setError("Password wajib diisi");
            return false;
        }

        return true;
    };

    // =========================================
    // SUBMIT
    // =========================================
    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

            setLoading(true);
            setError("");

            const res = await login({
                email: form.email,
                password: form.password,
            });

            console.log("LOGIN SUCCESS:", res);
            console.log("ROLE:", res.user.role);

            // CLEAR OLD STORAGE
            localStorage.clear();

            // SAVE TOKEN
            localStorage.setItem(
                "token",
                res.access_token
            );

            // SAVE USER
            localStorage.setItem(
                "user",
                JSON.stringify(res.user)
            );

            // =========================================
            // REDIRECT BASED ON ROLE
            // =========================================
            if (res.user.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/customer");

            }

        } catch (err) {

            console.error(
                "LOGIN ERROR:",
                err.response?.data || err
            );

            if (err.response?.data?.message) {

                setError(err.response.data.message);

            } else {

                setError("Email atau password salah");

            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

            <div
                className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-800
                    rounded-3xl
                    shadow-2xl
                    p-8
                "
            >

                {/* HEADER */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-indigo-500">
                        Welcome Back 👋
                    </h1>

                    <p className="text-gray-400 text-sm mt-2">
                        Login untuk melanjutkan
                    </p>

                </div>

                {/* ERROR */}
                {error && (
                    <div
                        className="
                            bg-red-500/10
                            border
                            border-red-500
                            text-red-400
                            p-3
                            rounded-xl
                            mb-5
                            text-sm
                            text-center
                        "
                    >
                        {error}
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* EMAIL */}
                    <div>

                        <label className="block text-sm text-gray-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="admin@gmail.com"
                            value={form.email}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-slate-800
                                text-white
                                border
                                border-slate-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                                transition
                            "
                        />

                    </div>

                    {/* PASSWORD */}
                    <div>

                        <label className="block text-sm text-gray-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-slate-800
                                text-white
                                border
                                border-slate-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-indigo-500
                                transition
                            "
                        />

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            w-full
                            bg-indigo-600
                            hover:bg-indigo-700
                            transition
                            py-3
                            rounded-xl
                            font-semibold
                            text-white
                            shadow-lg
                            hover:shadow-indigo-500/30
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >
                        {loading ? "Loading..." : "Login"}
                    </button>

                </form>

                {/* FOOTER */}
                <p className="text-sm text-gray-400 text-center mt-6">

                    Belum punya akun?{" "}

                    <span
                        onClick={() => navigate("/register")}
                        className="
                            text-indigo-400
                            cursor-pointer
                            hover:text-indigo-300
                            transition
                        "
                    >
                        Register
                    </span>

                </p>

            </div>
        </div>
    );
}