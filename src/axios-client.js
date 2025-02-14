import axios from "axios";
import {useStateContext} from "./context/ContextProvider.jsx";

const axiosClient = axios.create({
//   baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
  baseURL: `http://localhost:3000`
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
})
axiosClient.interceptors.response.use((response) => {
  // debugger
  return response
}, (error) => {
  const {response} = error;
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
    window.location.href = "/login";
  } else if (response.status === 404) {
    //Show not found
  }

  throw error;
})

export default axiosClient