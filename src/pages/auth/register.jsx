import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Register berhasil!");
        console.log(data);

        // opsional: langsung login setelah register
        localStorage.setItem("token", data.token);
      } else {
        alert("Register gagal: " + data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi error");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white p-6 rounded shadow w-96">
          <h1 className="text-xl font-bold mb-4">Register</h1>

          <form onSubmit={handleRegister} className="space-y-3">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Register
            </button>
          </form>

          <p className="text-sm mt-3">
            Sudah punya akun?{" "}
            <a href="/login" className="text-indigo-600">
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}