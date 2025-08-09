import { baseApi } from "@/redux/baseApi";
import { IResponse, ISendOtp } from "@/types";



const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo   // when we use fetchBaseQuery we send data/userInfo from body but when we send data/userInfo with axiosBaseQuery we must use data to send data/userInfo
            })
        }),
        register: builder.mutation({
            query: (userInfo) => ({
                url: "/user/register",
                method: "POST",
                data: userInfo
            })
        }),
        sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
            query: (userInfo) => ({
                url: "/otp/send",
                method: "POST",
                data: userInfo
            })
        }),
    })
})

export const { useRegisterMutation, useLoginMutation, useSendOtpMutation } = authApi;