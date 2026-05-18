import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/books", label: "Buku" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact Us" },
  ];

  const navClass = (path) =>
    `transition ${isActive(path) ? "text-white font-semibold" : "text-gray-300 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl">
      <nav className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white bg-indigo-600 shadow-lg rounded-xl">N</div>
            <span className="text-3xl font-black tracking-tight text-white">Nawbook</span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-10 text-base font-medium md:flex">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} className={navClass(item.to)}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="items-center hidden gap-4 md:flex">
            <Link to="/login" className="px-6 py-3 text-white transition border rounded-xl border-slate-700 hover:bg-slate-800">
              Masuk
            </Link>

            <Link to="/register" className="px-6 py-3 font-semibold text-white transition bg-indigo-600 shadow-lg rounded-xl hover:bg-indigo-500">
              Bergabung
            </Link>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setOpen(!open)} className="p-2 text-white transition rounded-lg md:hidden hover:bg-slate-800">
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="pt-4 pb-6 space-y-2 border-t md:hidden border-slate-800">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="block px-2 py-2 text-gray-300 hover:text-white">
                {item.label}
              </Link>
            ))}

            <div className="flex gap-3 pt-4">
              <Link to="/login" onClick={() => setOpen(false)} className="w-full px-4 py-3 text-center text-white border rounded-xl border-slate-700">
                Masuk
              </Link>

              <Link to="/register" onClick={() => setOpen(false)} className="w-full px-4 py-3 font-semibold text-center text-white bg-indigo-600 rounded-xl">
                Bergabung
              </Link>
            </div>
          </div>
        )}

      </nav>
    </header>
  );
}