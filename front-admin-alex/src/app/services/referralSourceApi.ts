import { api } from "./api"
import { ReferralSource } from "../types";

export const referralSourceApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addReferralSource: builder.mutation<{ message: string }, { name: string }>({
               query: (data) => ({
                    url: "referral-source",
                    method: "POST",
                    body: data,
               }),
          }),
          updateReferralSource: builder.mutation<{ message: string }, { name: string, id: number }>({
               query: ({ name, id }) => ({
                    url: `referral-source/${id}`,
                    method: "PUT",
                    body: { name },
               }),
          }),
          getAllReferralSources: builder.query<{ rows: ReferralSource[], count: number }, void>({
               query: () => ({
                    url: "referral-source",
                    method: "GET",
               }),
          }),
          getByIdReferralSource: builder.query<ReferralSource, number>({
               query: (id) => ({
                    url: `referral-source/${id}`,
                    method: "GET",
               }),
          }),
          deleteReferralSource: builder.mutation<{ message: string }, number>({
               query: (id) => ({
                    url: `referral-source/${id}`,
                    method: "DELETE",
               }),
          }),
     }),
})

export const {
     useAddReferralSourceMutation,
     useUpdateReferralSourceMutation,
     useGetAllReferralSourcesQuery,
     useGetByIdReferralSourceQuery,
     useLazyGetAllReferralSourcesQuery,
     useLazyGetByIdReferralSourceQuery,
     useDeleteReferralSourceMutation
} = referralSourceApi 