import api from "../_services/_api";

export default function BookCard({ book }) {

  const addToCart = async () => {
    try {
      await api.post("/cart/add", {
        book_id: book.id,
      });
      alert("Berhasil ditambahkan ke cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border p-4 rounded-xl">

      <h2 className="text-xl font-bold">
        {book.title}
      </h2>

      <p>
        Rp {book.price}
      </p>

      <button
        onClick={addToCart}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg">
        Add To Cart
      </button>
    </div>
  );
}