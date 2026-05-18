import API from "../_api";

export const getBookDetail = async (id) => {
  const response = await API.get(`/books/${id}`);
  return response.data;
};