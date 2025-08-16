import { baseApi } from "@/redux/baseApi";
import { IResponse, ITourPackage } from "@/types";

export const bookingApi
    = baseApi.injectEndpoints({
        endpoints: (builder) => ({
            createBooking: builder.mutation({
                query: (bookingData) => ({
                    url: "/booking",
                    method: "POST",
                    data: bookingData
                }),
                invalidatesTags: ["BOOKING"]
            }),

            getAllTours: builder.query<ITourPackage[], unknown>({
                query: (params) => ({
                    url: "/tour",
                    method: "GET",
                    params,
                }),
                providesTags: ["TOUR"],
                transformResponse: (response: IResponse<ITourPackage[]>) => response.data // ai return a data r jei shape darabe, setai akhane return type hobe builder.query<IResponse<ITourPackage>, unknown>
            }),
        })
    })

export const { useCreateBookingMutation } = bookingApi
    ;