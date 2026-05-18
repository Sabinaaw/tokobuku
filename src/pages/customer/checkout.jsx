// src/pages/customer/Checkout.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../_services/cart";
import { checkout } from "../../_services/checkout";

export default function Checkout() {

  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {

    const fetchCart = async () => {
      try {
        const data = await getCart();
        if (Array.isArray(data)) {
          setCart(data);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.log(
          "LOAD CART ERROR:",
          error.response?.data || error
        );
        setCart([]);
      } finally {
        setPageLoading(false);
      }
    };

    fetchCart();

  }, []);

  const total = Array.isArray(cart)
    ? cart.reduce((sum, item) => {
        return sum + (
          Number(item.book?.price || 0) *
          Number(item.quantity || 0)
        );
      }, 0)
    : 0;

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await checkout();
      alert(
        res.message ||
        "Checkout berhasil"
      );
      setCart([]);
      navigate("/customer");
    } catch (error) {

      console.log(
        "CHECKOUT ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Checkout gagal"
      );

    } finally {

      setLoading(false);

    }
  };

  if (pageLoading) {

    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-950">
        <h1 className="text-2xl font-bold">
          Loading Cart...
        </h1>
      </div>
    );
  }

  return (

    <div className="min-h-screen px-6 py-10 text-white bg-slate-950">

      <div className="max-w-5xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-indigo-500">
            Checkout
          </h1>

          <p className="mt-2 text-gray-400">
            Review pesanan kamu sebelum checkout
          </p>

        </div>

        {
          cart.length === 0 ? (

            <div className="p-10 text-center border bg-slate-900 border-slate-800 rounded-3xl">

              <h2 className="mb-4 text-3xl font-bold">
                Cart kosong 🛒
              </h2>

              <p className="mb-8 text-gray-400">
                Tambahkan buku terlebih dahulu
              </p>

              <button
                onClick={() => navigate("/customer")}
                className="px-6 py-3 font-semibold transition-all bg-indigo-600 hover:bg-indigo-700 rounded-xl"
              >
                Kembali Belanja
              </button>

            </div>

          ) : (

            <>
              <div className="space-y-5">

                {
                  cart.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-5 p-5 border bg-slate-900 border-slate-800 rounded-3xl"
                    >

                      <img
                        src={
                          item.book?.image
                            ? `http://127.0.0.1:8000/books/${item.book.image}`
                            : "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop"
                        }
                        alt={item.book?.title}
                        className="object-cover w-24 h-32 rounded-2xl"
                      />

                      <div className="flex-1">

                        <h2 className="text-2xl font-bold">
                          {item.book?.title}
                        </h2>

                        <p className="mt-2 text-gray-400">
                          Qty: {item.quantity}
                        </p>

                        <p className="mt-4 text-lg font-semibold text-indigo-400">
                          Rp{" "}
                          {Number(
                            item.book?.price || 0
                          ).toLocaleString("id-ID")}
                        </p>

                      </div>

                      <div className="text-right">

                        <p className="text-sm text-gray-400">
                          Subtotal
                        </p>

                        <h2 className="mt-2 text-xl font-bold text-white">
                          Rp{" "}
                          {Number(
                            (item.book?.price || 0) *
                            (item.quantity || 0)
                          ).toLocaleString("id-ID")}
                        </h2>

                      </div>

                    </div>
                  ))
                }

              </div>

              <div className="p-8 mt-10 border bg-slate-900 border-slate-800 rounded-3xl">

                <div className="flex items-center justify-between mb-8">

                  <div>

                    <h2 className="text-2xl font-bold">
                      Total Pembayaran
                    </h2>

                    <p className="mt-1 text-gray-400">
                      Termasuk semua item dalam cart
                    </p>

                  </div>

                  <h2 className="text-4xl font-bold text-indigo-400">
                    Rp{" "}
                    {Number(total).toLocaleString("id-ID")}
                  </h2>

                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="w-full py-4 text-lg font-semibold transition-all bg-indigo-600 hover:bg-indigo-700 rounded-2xl disabled:opacity-50"
                >
                  {
                    loading
                      ? "Processing..."
                      : "Checkout Now"
                  }
                </button>

              </div>
            </>
          )
        }
      </div>
    </div>
  );
}