import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://us-central1-amzn-clone-desndev.cloudfunctions.net/api",
});

export default axiosInstance;
