import API from "../_api";

const handleError = (label, error) => {
  console.error(label, error.response?.data || error);
  throw error;
};

export const getBooks = async () => {
  try {
    const { data } = await API.get("/books");
    return data?.data || [];
  } catch (error) {
    handleError("GET BOOKS ERROR:", error);
  }
};

export const getBookById = async (id) => {
  try {
    const { data } = await API.get(`/books/${id}`);
    return data?.data || data;
  } catch (error) {
    handleError("GET BOOK BY ID ERROR:", error);
  }
};

// CREATE BOOK
export const createBook = async (payload) => {
  try {
    const { data } = await API.post("/books", payload, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    handleError("CREATE BOOK ERROR:", error);
  }
};

// UPDATE BOOK
export const updateBook = async (id, payload) => {
  try {
    payload.append("_method", "PUT");
    const { data } = await API.post(`/books/${id}`, payload, {
      headers: {
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    handleError("UPDATE BOOK ERROR:", error);
  }
};

// DELETE BOOK
export const deleteBook = async (id) => {
  try {
    const { data } = await API.delete(`/books/${id}`);
    return data;
  } catch (error) {
    handleError("DELETE BOOK ERROR:", error);
  }
};