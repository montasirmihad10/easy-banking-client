import { baseApi } from "./baseApi";

const supportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSupportTicket: build.mutation({
      query: (data) => ({
        url: "/support",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["support"],
    }),
    createGuestSupportTicket: build.mutation({
      query: (data) => ({
        url: "/support/guest",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["support"],
    }),
    getMySupportTickets: build.query({
      query: (params?: Record<string, unknown>) => ({
        url: "/support/my",
        method: "GET",
        params,
      }),
      providesTags: ["support"],
    }),
    getAllSupportTickets: build.query({
      query: (params?: Record<string, unknown>) => ({
        url: "/support",
        method: "GET",
        params,
      }),
      providesTags: ["support"],
    }),
    getSupportTicket: build.query({
      query: (id: string) => ({
        url: `/support/${id}`,
        method: "GET",
      }),
      providesTags: ["support"],
    }),
    replySupportTicket: build.mutation({
      query: ({ id, message }: { id: string; message: string }) => ({
        url: `/support/${id}/reply`,
        method: "POST",
        contentType: "application/json",
        data: { message },
      }),
      invalidatesTags: ["support"],
    }),
    updateSupportTicket: build.mutation({
      query: ({ id, ...data }: { id: string } & Record<string, unknown>) => ({
        url: `/support/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const {
  useCreateSupportTicketMutation,
  useCreateGuestSupportTicketMutation,
  useGetMySupportTicketsQuery,
  useGetAllSupportTicketsQuery,
  useGetSupportTicketQuery,
  useReplySupportTicketMutation,
  useUpdateSupportTicketMutation,
} = supportApi;
