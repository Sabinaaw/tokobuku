import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthInput from "../../components/AuthInput";
import { register } from "../../_services/auth";

export default function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        username: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };
    const validate = () => {

        let newErrors = {};

        if (!form.fullname.trim()) {
            newErrors.fullname = "Nama lengkap wajib diisi";
        }

        if (!form.email.trim()) {
            newErrors.email = "Email wajib diisi";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Format email tidak valid";
        }
        if (!form.username.trim()) {
            newErrors.username = "Username wajib diisi";
        }
        if (!form.password.trim()) {
            newErrors.password = "Password wajib diisi";
        } else if (form.password.length < 6) {
            newErrors.password = "Password minimal 6 karakter";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validate()) return;
        try {
            setLoading(true);
            const res = await register({
                name: form.fullname,
                email: form.email,
                username: form.username,
                password: form.password,
            });
            console.log("REGISTER SUCCESS:", res);
            console.log("ROLE:", res.user.role);
            localStorage.clear();
            localStorage.setItem(
                "token",
                res.access_token
            );
            localStorage.setItem(
                "user",
                JSON.stringify(res.user)
            );

            // =========================================
            // REDIRECT ROLE
            // =========================================
            if (res.user.role === "admin") {

                navigate("/admin");
            } else {
                navigate("/customer");
            }
        } catch (err) {
            console.error(
                "REGISTER ERROR:",
                err.response?.data || err
            );
            if (err.response?.data?.errors) {
                const laravelErrors =
                    err.response.data.errors;
                let formattedErrors = {};
                Object.keys(laravelErrors).forEach((key) => {
                    formattedErrors[key] =
                        laravelErrors[key][0];
                });
                setErrors(formattedErrors);
            }
            // GENERAL ERROR
            else if (err.response?.data?.message) {
                setServerError(
                    err.response.data.message
                );
            } else {
                setServerError("Register gagal");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-10">
            <div
                className="
                    w-full
                    max-w-md
                    bg-slate-900
                    border
                    border-slate-700
                    rounded-3xl
                    p-8
                    shadow-2xl
                "
            >
                {/* HEADER */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Register to continue
                    </p>

                </div>
                {/* SERVER ERROR */}
                {serverError && (
                    <div
                        className="
                            mb-5
                            bg-red-500/10
                            border
                            border-red-500
                            text-red-400
                            text-sm
                            p-3
                            rounded-xl
                        "
                    >
                        {serverError}
                    </div>
                )}

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    {/* FULL NAME */}
                    <AuthInput
                        label="Full Name"
                        name="fullname"
                        placeholder="Enter your full name"
                        value={form.fullname}
                        onChange={handleChange}
                        error={errors.fullname}
                    />

                    {/* EMAIL */}
                    <AuthInput
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    {/* USERNAME */}
                    <AuthInput
                        label="Username"
                        name="username"
                        placeholder="Enter your username"
                        value={form.username}
                        onChange={handleChange}
                        error={errors.username}
                    />

                    {/* PASSWORD */}
                    <AuthInput
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

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
                        {loading ? "Loading..." : "Register"}
                    </button>
                </form>

                {/* FOOTER */}
                <p className="text-center text-gray-400 text-sm mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="
                            text-indigo-400
                            hover:text-indigo-300
                            transition
                        "
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}