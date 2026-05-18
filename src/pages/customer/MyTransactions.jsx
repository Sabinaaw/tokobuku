import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function MyTransactions() {

  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadTransactions() {
      try {
        const { data } = await API.get(
          "/my-transactions"
        );

        if (!ignore) {
          setTransactions(
            data?.data || []
          );
        }

      } catch (error) {
        console.error(
          "LOAD TRANSACTIONS ERROR:",
          error.response?.data || error
        );

      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadTransactions();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 text-white bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-indigo-500"> My Transactions </h1>
            <p className="mt-2 text-gray-400"> Riwayat pembelian buku kamu 📚 </p>
          </div>
          <button onClick={() => navigate("/customer")} className="px-5 py-3 transition  bg-slate-800 hover:bg-slate-700 rounded-2xl">
            ← Back
          </button>
        </div>
        {
          loading ? (
            <div className="py-20 text-center text-gray-400">
              Loading transactions...
            </div>
          ) : transactions.length === 0 ? (
            <div className="p-10 text-center border bg-slate-900 rounded-3xl border-slate-800">
              <h2 className="mb-3 text-2xl font-bold"> Belum ada transaksi </h2>
              <p className="mb-6 text-gray-400"> Yuk beli buku favorit kamu </p>
              <button onClick={() => navigate("/customer")} className="px-6 py-3 bg-indigo-600  hover:bg-indigo-700 rounded-2xl">
                Belanja Sekarang
              </button>
            </div>

          ) : (

            <div className="space-y-6">
              {
                transactions.map((trx) => (
                  <div key={trx.id} className="p-6 border  bg-slate-900 border-slate-800 rounded-3xl">

                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-indigo-400">
                          {trx.order_number}
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                          {
                            new Date(
                              trx.created_at
                            ).toLocaleString("id-ID")
                          }
                        </p>
                      </div>
                      <div className="px-4 py-2 text-sm font-semibold text-green-400 border  bg-green-500/20 border-green-500/40 rounded-xl">
                        Paid
                      </div>
                    </div>
                    <div className="space-y-4">
                      {
                        trx.details?.map((item) => (
                          <div key={item.id} className="flex items-center gap-5 p-4  bg-slate-800/60 rounded-2xl">
                            <img
                              src={
                                item.book?.image
                                  ? `http://127.0.0.1:8000/books/${item.book.image}`
                                  : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
                              }
                              alt={item.book?.title}
                              className="object-cover w-20  h-28 rounded-xl"/>

                            <div className="flex-1">
                              <h3 className="text-xl font-bold"> {item.book?.title} </h3>
                              <p className="mt-2 text-gray-400"> Qty: {item.quantity} </p>
                              <p className="mt-2 font-semibold text-green-400">
                                Rp{" "}
                                {Number(
                                  item.price
                                ).toLocaleString("id-ID")}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-sm text-gray-400"> Subtotal </p>
                              <h2 className="text-2xl font-bold text-indigo-400">
                                Rp{" "}
                                {Number(
                                  item.subtotal
                                ).toLocaleString("id-ID")}
                              </h2>
                            </div>
                          </div>
                        ))
                      }
                    </div>

                    <div className="flex items-center justify-between pt-5 mt-6 border-t  border-slate-700">
                      <h2 className="text-xl font-bold"> Total </h2>
                      <h2 className="text-3xl font-black text-indigo-400">
                        Rp{" "}
                        {Number(
                          trx.total_amount
                        ).toLocaleString("id-ID")}
                      </h2>
                    </div>
                  </div>
                ))
              }
            </div>
          )
        }

      </div>
    </div>
  );
}