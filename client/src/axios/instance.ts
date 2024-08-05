import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
});

axiosInstance.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    req.headers.Authorization = `${token ? `Bearer ${token}` : null} `;
    return req;
}, (err) => {
    Promise.reject(err);
})

export default axiosInstance ; 