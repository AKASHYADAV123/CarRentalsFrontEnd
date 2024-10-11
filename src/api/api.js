import axios from "axios";

// Create a new instance of Axios
const api = axios.create({
  baseURL: "http://localhost:8082/api",
});

// Add a request interceptor to modify requests before they are sent
api.interceptors.request.use(
  (config) => {
    // Retrieve the latest token value from the localStorage
    const token = localStorage.getItem("token");
    if (token) {
      // Set the token in the request header
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with the request error, like logging it
    return Promise.reject(error);
  }
);

// Add a response interceptor to add CORS headers
api.interceptors.response.use(
  (response) => {
    // Add CORS headers
    response.headers["Access-Control-Allow-Origin"] = "*";
    response.headers["Access-Control-Allow-Methods"] =
      "GET, POST, PUT, DELETE, OPTIONS";
    response.headers["Access-Control-Allow-Headers"] =
      "Content-Type, Authorization";
    return response;
  },
  (error) => {
    // Do something with the response error, like logging it
    return Promise.reject(error);
  }
);

export default api;
