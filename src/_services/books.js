import API from "../_api";

export const getBooks = async () => {
    const { data } = await API.get("http://127.0.0.1:8000/api/books")
    return data;
}

export const createBooks = async (data) => {
    try {
        const response = await API.post("/books", data)
        return response.data;
    } catch (error) {
        console.log(error);
        throw error
        
    }
}