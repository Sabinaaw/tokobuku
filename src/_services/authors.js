import API from "../_api";

// GET ALL AUTHORS
export const getAuthors = async () => {
    try {
        const { data } = await API.get("/authors");
        return data;
    } catch (error) {
        console.error("GET AUTHORS ERROR:", error.response?.data || error);
        throw error;
    }
};

export const createAuthor = async (payload) => {
    const token = localStorage.getItem("token");

    console.log("TOKEN DIKIRIM:", token); // 🔥 debug

    const { data } = await API.post("/authors", payload, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return data;
};

// GET AUTHOR BY ID
export const getAuthorById = async (id) => {
    try {
        const { data } = await API.get(`/authors/${id}`);
        return data?.data || data;
    } catch (error) {
        console.error("GET AUTHOR ERROR:", error.response?.data || error);
        throw error;
    }
};

// UPDATE AUTHOR
export const updateAuthor = async (id, payload) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Token tidak ditemukan, silakan login dulu");
    }

    try {
        const { data } = await API.put(`/authors/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        return data;
    } catch (error) {
        console.error("UPDATE AUTHOR ERROR:", error.response?.data || error);
        throw error;
    }
};

// DELETE AUTHOR
export const deleteAuthor = async (id) => {
    const token = localStorage.getItem("token");

    try {
        const { data } = await API.delete(`/authors/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (error) {
        console.error("DELETE AUTHOR ERROR:", error.response?.data || error);
        throw error;
    }
};