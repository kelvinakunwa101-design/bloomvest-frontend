import API_URL from "../config/api";

const getToken = () => localStorage.getItem("token");

export const api = {
  get: async (url) => {
    const res = await fetch(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },

  post: async (url, body) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    });
    return res.json();
  },

  del: async (url) => {
    const res = await fetch(`${API_URL}${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return res.json();
  },
};