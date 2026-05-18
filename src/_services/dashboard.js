import API from "../_api";

export const getDashboard = async () => {
    const response = await API.get("/dashboard");
    return response.data;
};