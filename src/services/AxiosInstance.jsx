import axios from "axios";

const AxiosInstance = () => {
  const url = process.env.REACT_APP_BASE_PRODUCTION_URL;
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const axiosInstance = axios.create({
    baseURL: url,
    headers,
  });

  return axiosInstance;
};

export default AxiosInstance;
