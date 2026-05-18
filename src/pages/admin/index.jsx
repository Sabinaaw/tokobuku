import { useEffect, useState } from "react";
import { getDashboard } from "../../_services/dashboard";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();
        setDashboard(data);
      } catch (err) {
        console.error("DASHBOARD ERROR:", err.response || err);

        if (err.response?.status === 401) {
          setError("Unauthorized. Silakan login kembali.");
          localStorage.removeItem("token");
        } else {
          setError("Gagal mengambil data dashboard.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 text-red-400 border bg-slate-800 border-red-500/30 rounded-3xl">
        {error}
      </div>
    );
  }
  if (!dashboard) {
    return (
      <div className="text-white">
        No dashboard data found.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-400">
          Welcome back admin 👋
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 mb-8 md:grid-cols-4">
        <div className="p-6 border bg-slate-800 border-slate-700 rounded-3xl">
          <p className="text-sm text-gray-400">
            Total Users
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {dashboard.total_users ?? 0}
          </h1>
        </div>

        <div className="p-6 border bg-slate-800 border-slate-700 rounded-3xl">
          <p className="text-sm text-gray-400">
            Total Books
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {dashboard.total_books ?? 0}
          </h1>
        </div>

        <div className="p-6 border bg-slate-800 border-slate-700 rounded-3xl">
          <p className="text-sm text-gray-400">
            Total Authors
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {dashboard.total_authors ?? 0}
          </h1>
        </div>

        <div className="p-6 border bg-slate-800 border-slate-700 rounded-3xl">
          <p className="text-sm text-gray-400">
            Transactions
          </p>

          <h1 className="mt-3 text-4xl font-bold text-white">
            {dashboard.total_transactions ?? 0}
          </h1>
        </div>
      </div>
      <div className="p-6 border bg-slate-800 border-slate-700 rounded-3xl">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-white">
            <thead className="text-gray-400 border-b border-slate-700">
              <tr>
                <th className="pb-4">ID</th>
                <th className="pb-4">User</th>
                <th className="pb-4">Total</th>
              </tr>
            </thead>

            <tbody>
              {(dashboard.recent_transactions ?? []).length > 0 ? (
                (dashboard.recent_transactions ?? []).map((trx) => (
                  <tr
                    key={trx.id}
                    className="border-b border-slate-700"
                  >
                    <td className="py-4">
                      #{trx.id}
                    </td>

                    <td>
                      {trx.user?.name || "Unknown User"}
                    </td>

                    <td>
                      Rp {Number(trx.total_price || 0).toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="py-6 text-center text-gray-400"
                  >
                    Belum ada transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}