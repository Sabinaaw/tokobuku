// src/_services/checkout.js

import API from "../_api";

export const checkout = async () => {

  try {
    const { data } = await API.post(
      "/transactions"
    );
    return data;

  } catch (error) {
    console.error(
      "CHECKOUT ERROR:",
      error.response?.data || error
    );
    throw error;
  }
};