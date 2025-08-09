import { api } from "./api"

type PropsPost = {
     id: number,
     date: string,
     time: string,
     period: string,
     limits: number,
     booked: number,
     createdAt: Date,
     updatedAt: Date,
}

type BulkAddDateTimeRequest = {
     dates: string[],
     times: Array<{
          time: string,
          period: string
     }>,
     limits: number
}

export const selectDateTimeApi = api.injectEndpoints({
     endpoints: (builder) => ({
          addSelectDateTime: builder.mutation<{ message: string }, {
               date: string,
               time: string,
               period: string,
               limits: number,
          }>({
               query: (data) => ({
                    url: "select-date-time",
                    method: "POST",
                    body: data,
               }),
          }),
          addBulkSelectDateTime: builder.mutation<{ message: string }, BulkAddDateTimeRequest>({
               query: (data) => ({
                    url: "select-date-time/bulk",
                    method: "POST",
                    body: data,
               }),
          }),
          updateSelectDateTime: builder.mutation<{ message: string }, {
               data: {
                    date: string,
                    time: string,
                    period: string,
                    limits: number,
               }
               id: number;
          }
          >({
               query: ({ data, id }) => ({
                    url: `select-date-time/${id}`,
                    method: "PUT",
                    body: data,
               }),
          }),
          getAllSelectDateTime: builder.query<{ rows: PropsPost[] }, void>({
               query: () => ({
                    url: "select-date-time/all",
                    method: "GET",
               }),
          }),
          deleteSelectDateTime: builder.mutation<void, number>({
               query: (id) => ({
                    url: `select-date-time/${id}`,
                    method: "DELETE",
               }),
          }),

     }),
})

export const {
     useAddSelectDateTimeMutation,
     useAddBulkSelectDateTimeMutation,
     useGetAllSelectDateTimeQuery,
     useLazyGetAllSelectDateTimeQuery,
     useUpdateSelectDateTimeMutation,
     useDeleteSelectDateTimeMutation
} = selectDateTimeApi