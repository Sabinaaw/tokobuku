import API from "../_api";

const handleError = (label, error) => {
  console.error(label, error.response?.data || error);
  if (error.response?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Session expired. Silakan login kembali.");
    window.location.href = "/login";
    return;
  }

  throw error;
};

export const getCart = async () => {
  try {
    const { data } = await API.get("/cart");
    return data?.data || data || [];
  } catch (error) {
    handleError("GET CART ERROR:", error);
  }
};

export const addToCart = async (
  bookId,
  quantity = 1
) => {
  try {
    const { data } = await API.post("/cart/add", {
      book_id: bookId,
      quantity,
    });

    return data;
  } catch (error) {
    handleError("ADD TO CART ERROR:", error);
  }
};

export const updateCart = async (
  cartId,
  quantity
) => {
  try {
    const { data } = await API.put(
      `/cart/update/${cartId}`,
      {
        quantity,
      }
    );

    return data;
  } catch (error) {
    handleError("UPDATE CART ERROR:", error);
  }
};

export const removeCartItem = async (
  cartId
  ) => {
    try {
      const { data } = await API.delete(
        `/cart/remove/${cartId}`
      );

      return data;
    } catch (error) {
      handleError("REMOVE CART ERROR:", error);
    }
};