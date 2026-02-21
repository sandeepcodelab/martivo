import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1/",
  withCredentials: true,
});

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !originalRequest.url.includes("/auth/refresh")
//     ) {
//       originalRequest._retry = true;

//       try {
//         await api.post("/auth/refresh");

//         return api(originalRequest);
//       } catch (err) {
//         window.location.href = "/auth/login";
//       }
//     }

//     return Promise.reject(error);
//   },
// );

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/login")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        // Stop infinite loop
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
