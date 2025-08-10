import config from "@/config";
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    // headers: {
    //     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODk4ODRkNWJlZjE4YmIyZmRmMTJkMzUiLCJlbWFpbCI6ImVtb25vd25tYWlsMTdAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTQ4MjU5NDEsImV4cCI6MTc1NDkxMjM0MX0.RPEZsXNFxt87Fj_zYPH2FZffU34gvVvpmeTKSGLTUUA"
    // }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is 
    // console.log({ config });
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
);

// Add a response interceptor
axiosInstance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log({ response });
    return response;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
