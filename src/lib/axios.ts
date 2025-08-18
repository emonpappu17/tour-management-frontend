import config from "@/config";
import axios, { AxiosRequestConfig } from "axios";

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
    // console.log("request config==>", config);
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
);

let isRefreshing = false;

let pendingQueue: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    console.log('pendingQueue==>', pendingQueue);
    pendingQueue.forEach((promise) => {
        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });

    pendingQueue = [];
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("Res success res==>", response);
        return response
    },
    async (error) => {
        // console.log("Request failed==>", error.response);

        const originalRequest = error.config as AxiosRequestConfig & { _retry: boolean };
        // console.log('originalRequest==>', originalRequest)
        console.log('originalRequest._retry==>', !originalRequest._retry);

        if (
            error.response.status === 500 &&
            error.response.data.message === "jwt expired" &&
            !originalRequest._retry
        ) {
            console.log('Your token is expired!!');

            originalRequest._retry = true;

            if (isRefreshing) {
                console.log('Refreshing ==> working');
                return new Promise((resolve, reject) => {
                    pendingQueue.push({ resolve, reject })
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            isRefreshing = true;
            try {
                // const res = await axiosInstance.post("/auth/refresh-token");
                await axiosInstance.post("/auth/refresh-token");

                // console.log('new token arrived', res);
                // console.log('originalRequest inside try==>', originalRequest);

                processQueue(null);
                return axiosInstance(originalRequest);
            } catch (error) {
                console.log(error);
                processQueue(error);
                return Promise.reject(error);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);
