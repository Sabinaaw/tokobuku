import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../_services/_api";

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCart = async () => {
    try {
      const response = await api.get("/cart");
      setCart(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      await getCart();
    };

    fetchCart();
  }, []);

  const updateQty = async (id, quantity, stock) => {
    if (quantity < 1) return;
    if (quantity > stock) {
      alert(`Stok hanya tersedia ${stock}`);
      return;
    }
    try {
      await api.put(`/cart/update/${id}`, {
        quantity,
      });

      await getCart();
    } catch (error) {
      console.log(error);
      alert("Gagal memperbarui quantity.");
    }
  };

  const removeItem = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus item ini?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/cart/remove/${id}`);
      await getCart();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus item.");
    }
  };

  const totalPrice =
    cart?.cart_items?.reduce((total, item) => {
      return total + item.book.price * item.quantity;
    }, 0) || 0;

  if (loading) {
    return (
      <div className="mt-20 text-xl font-semibold text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-gray-800">
        🛒 My Cart
      </h1>

      {cart?.cart_items?.length === 0 && (
        <div className="p-8 text-center bg-gray-100 rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-600">
            Cart masih kosong
          </h2>
        </div>
      )}

      <div className="space-y-5">
        {cart?.cart_items?.map((item) => (
          <div key={item.id} className="flex flex-col p-5 bg-white shadow-md rounded-2xl md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {item.book.title}
              </h2>

              <p className="mt-1 text-gray-500">
                Rp{" "}
                {Number(item.book.price).toLocaleString(
                  "id-ID"
                )}
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Quantity: {item.quantity}
              </p>

              <p className="text-sm text-gray-400">
                Stock tersedia: {item.book.stock}
              </p>

              <p className="mt-2 font-semibold text-indigo-600">
                Subtotal: Rp{" "}
                {Number(
                  item.book.price * item.quantity
                ).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0">
              <button
                onClick={() =>
                  updateQty(
                    item.id,
                    item.quantity - 1,
                    item.book.stock
                  )
                }
                disabled={item.quantity <= 1}
                className={`px-4 py-2 rounded-xl text-white font-bold ${
                  item.quantity <= 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                −
              </button>
              <button
                onClick={() =>
                  updateQty(
                    item.id,
                    item.quantity + 1,
                    item.book.stock
                  )
                }
                disabled={
                  item.quantity >= item.book.stock
                }
                className={`px-4 py-2 rounded-xl text-white font-bold ${
                  item.quantity >= item.book.stock
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                +
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="px-4 py-2 font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart?.cart_items?.length > 0 && (
        <div className="flex flex-col p-6 mt-10 text-white bg-indigo-600 rounded-2xl md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Total Belanja
            </h2>

            <p className="mt-2 text-3xl font-extrabold">
              Rp{" "}
              {Number(totalPrice).toLocaleString(
                "id-ID"
              )}
            </p>
          </div>

          <button onClick={() => navigate("/checkout")} className="px-6 py-3 mt-5 font-bold text-indigo-600 bg-white md:mt-0 rounded-xl hover:bg-gray-100">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}