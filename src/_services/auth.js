import API from "../_api";

export const login = async (payload) => {
    try {
        const { data } = await API.post("/login", payload);
        return data;
    } catch (error) {
        console.error("LOGIN ERROR:", error.response?.data || error);
        throw error;
    }
};

export const register = async (payload) => {
    try {
        const { data } = await API.post("/register", payload);
        return data;
    } catch (error) {
        console.error("REGISTER ERROR:", error.response?.data || error);
        throw error;
    }
};

export const logout = async () => {
    const { data } = await API.post("/logout");
    return data;
};