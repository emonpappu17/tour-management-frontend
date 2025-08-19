import { baseApi } from "@/redux/baseApi";
import { IDivision, IResponse } from "@/types";

export const divisionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addDivision: builder.mutation({
            query: (divisionData) => ({
                url: "/division/create",
                method: "POST",
                data: divisionData
            }),
            invalidatesTags: ["DIVISION"]
        }),

        updateDivision: builder.mutation({
            query: ({ id, divisionData }) => ({
                url: `/division/${id}`,
                method: "PATCH",
                data: divisionData
            }),
            invalidatesTags: ["DIVISION"]
        }),

        deleteDivision: builder.mutation({
            query: (divisionId) => ({
                url: `/division/${divisionId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DIVISION"]
        }),

        getDivisions: builder.query<IResponse<IDivision[]>, unknown>({
            query: (params) => ({
                url: "/division",
                method: "GET",
                params
            }),
            providesTags: ["DIVISION"],
            // transformResponse: (response) => response.data
        }),

        getSingleDivision: builder.query<IResponse<IDivision>, unknown>({
            query: (divisionId) => ({
                url: `/division/${divisionId}`,
                method: "GET",
            }),
            providesTags: ["DIVISION"],
            // transformResponse: (response) => response.data
        }),
    })
})

export const { useAddDivisionMutation, useGetDivisionsQuery, useGetSingleDivisionQuery, useUpdateDivisionMutation, useDeleteDivisionMutation } = divisionApi;