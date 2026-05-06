import API from "../_api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

export const getGenres = async () => {
  try {
    const { data } = await API.get("/genres");
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error("GET GENRES ERROR:", error.response?.data || error);
    throw error;
  }
};

export const getGenreById = async (id) => {
  try {
    const { data } = await API.get(`/genres/${id}`);
    return data?.data || data;
  } catch (error) {
    console.error("GET GENRE ERROR:", error.response?.data || error);
    throw error;
  }
};

export const createGenre = async (payload) => {
  try {
    const { data } = await API.post("/genres", payload, {
      headers: getAuthHeader(),
    });

    return data;
  } catch (error) {
    console.error("CREATE GENRE ERROR:", error.response?.data || error);
    throw error;
  }
};

export const updateGenre = async (id, payload) => {
  try {
    const { data } = await API.put(`/genres/${id}`, payload, {
      headers: getAuthHeader(),
    });

    return data;
  } catch (error) {
    console.error("UPDATE GENRE ERROR:", error.response?.data || error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const { data } = await API.delete(`/genres/${id}`, {
      headers: getAuthHeader(),
    });

    return data;
  } catch (error) {
    console.error("DELETE GENRE ERROR:", error.response?.data || error);
    throw error;
  }
};