import { useState } from "react";
import { login } from "../../_services/auth";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!form.email || !form.password) {
      setError("Email dan password wajib diisi");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Format email tidak valid");
      return false;
    }

    return true;
  };

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

      // ambil token fleksibel (biar gak error beda response)
      const token =
        res.access_token ||
        res.token ||
        res.data?.access_token ||
        res.data?.token;

      const user = res.user || res.data?.user;

      if (!token) {
        throw new Error("Token tidak ditemukan dari backend");
      }

      // SIMPAN TOKEN
      localStorage.setItem("token", token);

      // SIMPAN USER
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      console.log("TOKEN SAVED:", token);

      // IMPORTANT: set default header axios (INI YANG KAMU LUPA)
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // redirect
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/customer");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err);

      setError(
        err.response?.data?.message ||
          err.message ||
          "Login gagal"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8">

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
          <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-5 text-sm text-center">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="admin@gmail.com"
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
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}