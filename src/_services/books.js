import API from "../_api";

const handleError = (label, error) => {
    console.error(label, error.response?.data || error);
    throw error;
};

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token); 

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};

export const getBooks = async () => {
    try {
        const { data } = await API.get("/books", {
            headers: getAuthHeader(),
        });
        return data?.data || data;
    } catch (error) {
        handleError("GET BOOKS ERROR:", error);
    }
};

export const getBookById = async (id) => {
    try {
        const { data } = await API.get(`/books/${id}`);
        return data?.data || data;
    } catch (error) {
        handleError("GET BOOK ERROR:", error);
    }
};

export const createBook = async (payload) => {
    try {
        const { data } = await API.post("/books", payload, {
            headers: getAuthHeader(),
        });
        return data;
    } catch (error) {
        handleError("CREATE BOOK ERROR:", error);
    }
};

export const updateBook = async (id, payload) => {
    try {
        const { data } = await API.put(`/books/${id}`, payload, {
            headers: getAuthHeader(),
        });
        return data;
    } catch (error) {
        handleError("UPDATE BOOK ERROR:", error);
    }
};

export const deleteBook = async (id) => {
    try {
        const { data } = await API.delete(`/books/${id}`, {
            headers: getAuthHeader(),
        });
        return data;
    } catch (error) {
        handleError("DELETE BOOK ERROR:", error);
    }
};