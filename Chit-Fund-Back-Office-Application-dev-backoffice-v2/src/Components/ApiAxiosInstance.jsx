// // axiosInstance.js
// import axios from "axios";

// const apiUrl = import.meta.env.VITE_API_URL;
// // axios.defaults.withCredentials = true;
// const token = import.meta.env.VITE_SESSION_TOKEN;
// const axiosInstance = axios.create({
//   baseURL: apiUrl,
//   withCredentials: true, // Include cookies if required
// });

// // Request Interceptor: Add Authorization Header
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // const token = localStorage.getItem("admRetailToken");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log("Response error: second", error);
//     if (error.status === 401) {
//       try {
//         const refreshToken = localStorage.getItem("antlabRefreshToken");
//         console.log("Refresh token:", refreshToken);
//         if (refreshToken && refreshToken !== "undefined") {
//           const response = await axios.post(
//             `${apiUrl}/auth/refresh-token`,
//             null,
//             {
//               headers: {
//                 "x-refresh-token": refreshToken,
//               },
//             }
//           );
//           console.log("Refreshed token:", response);
//           localStorage.setItem("admRetailToken", response.data.accessToken);
//           localStorage.setItem(
//             "antlabRefreshToken",
//             response.data.refreshToken
//           );

//           error.config.headers.Authorization = `Bearer ${response.data.accessToken}`;
//           return axios(error.config);
//         } else {
//           localStorage.removeItem("admRetailToken");
//           localStorage.removeItem("refreshToken");
//           window.location.href = "/login";
//         }
//       } catch (refreshError) {
//         localStorage.removeItem("admRetailToken");
//         localStorage.removeItem("refreshToken");
//         console.error("Error refreshing token:", refreshError);
//         window.location.href = "/login";
//       }
//     }
//     // window.location.href = "/login";

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

// axiosInstance.js

import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // Include cookies if required
});

// Request Interceptor: Add Authorization Header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("BackOfficeToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle 401 Unauthorized
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized - token is likely expired
      localStorage.removeItem("BackOfficeToken");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
