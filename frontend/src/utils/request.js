import axios from "axios";
// import { baseURL } from "./config";

const baseURL = API_URL;
// create an axios instance
const service = axios.create({
  baseURL: baseURL,
  timeout: 50000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
  //withCredentials: true, // default
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error("error");
    return Promise.reject(error);
  }
);

export default service;
