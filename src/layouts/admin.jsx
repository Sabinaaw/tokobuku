import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // hapus semua data login
    navigate("/login");   // redirect ke login
  };

  const menuItems = [
    {
      name: "Overview",
      path: "/admin",
      icon: "📊",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "👤",
    },
    {
      name: "Authors",
      path: "/admin/authors",
      icon: "✍️",
    },
    {
      name: "Genres",
      path: "/admin/genres",
      icon: "🏷️",
    },
    {
      name: "Books",
      path: "/admin/books",
      icon: "📚",
    },
    {
      name: "Transactions",
      path: "/admin/transactions",
      icon: "🧾",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* NAVBAR */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-4 py-3 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="text-xl dark:text-white">☰</span>
              </button>

              <NavLink to="/admin" className="flex items-center gap-3">
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                    NawBooks
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin Dashboard
                  </p>
                </div>
              </NavLink>
            </div>
            <div className="flex items-center gap-3">

              {/* SEARCH */}
              <div className="items-center hidden px-3 py-2 bg-gray-100 md:flex dark:bg-gray-700 rounded-xl w-72">
                <span className="text-gray-500">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-2 text-sm text-gray-700 bg-transparent outline-none dark:text-white"
                />
              </div>

              {/* NOTIFICATION */}
              <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
                <span className="text-lg dark:text-white">🔔</span>
                <span className="absolute w-2 h-2 bg-red-500 rounded-full top-1 right-1"></span>
              </button>

              {/* PROFILE */}
              <div className="flex items-center gap-3 pl-2">
                <img
                  src="https://i.pravatar.cc/100"
                  alt="profile"
                  className="w-10 h-10 border-2 border-indigo-500 rounded-full"
                />

                <div className="hidden md:block">
                  <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
                    Admin
                  </h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    admin@nawbook.com
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </nav>

      {/* SIDEBAR */}
      <aside className="fixed top-0 left-0 z-40 h-screen pt-20 bg-white border-r border-gray-200 w-72 dark:bg-gray-800 dark:border-gray-700">
        <div className="h-full px-4 py-6 overflow-y-auto">

          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.path}
                  end={item.path === "/admin"}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-2xl transition ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* BOTTOM */}
          <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">

            <NavLink
              to="/help"
              className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-2xl hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              <span>❓</span>
              <span>Help Center</span>
            </NavLink>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-4 py-3 mt-2 text-red-500 transition rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>

          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="p-6 pt-24 md:ml-72">
        <div className="min-h-[calc(100vh-120px)] rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <Outlet />
        </div>
      </main>

    </div>
  );
}