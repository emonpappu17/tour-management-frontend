import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from './axiosBaseQuery';

export const baseApi = createApi({
    reducerPath: "baseApi",
    // baseQuery: fetchBaseQuery({
    //     baseUrl: "http://localhost:5000/api/v1",
    //     credentials: "include"
    // }),
    baseQuery: axiosBaseQuery(),
    tagTypes: ["USER"],
    endpoints: () => ({}),
});
