import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await axios.post("/auth/refresh");

        return api(originalRequest);
      } catch (err) {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
