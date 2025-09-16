import axios from "axios";

const api = axios.create({
  baseURL: 'https://himaliyansalt.innovationpixel.com/public/api',
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const request = async ({
  url,
  method = "GET",
  data = null,
  baseURL = null,
  headers = {},
}) => {
  try {
    const config = {
      url,
      method,
      baseURL: baseURL || api.defaults.baseURL,
      headers: {
        ...headers,
      },
    };

     if (data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
  
    if (method.toUpperCase() === "GET") {
      config.params = data; 
    } else {
      config.data = data;
    }

    const response = await api(config);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default api;