import API from "../_api";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("TOKEN:", token);
    const response = await API.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;

  } catch (error) {
    console.log(error.response);
    return [];
  }
};