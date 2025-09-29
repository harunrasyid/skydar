import axios from "axios";

const baseUrl = import.meta.env.VITE_OSN_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: Number(10000),
  //   headers: {
  //     Authorization: `Bearer `,
  //   },
});

export default axiosInstance;
