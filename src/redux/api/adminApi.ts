import { baseApi } from "./baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBranch: build.mutation({
      query: (data) => ({
        url: "/branch/create-branch",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["branch"],
    }),
    getUsers: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/users/",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["user"],
    }),
    getAdminStats: build.query({
      query: () => ({
        url: "/stats/admin-stats",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getAccount: build.query({
      query: (id) => ({
        url: `/account/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getAdminLastMonthStats: build.query({
      query: () => ({
        url: "/stats/last-month-stats",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getManagers: build.query({
      query: () => ({
        url: "/users/managers",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    updateUserRole: build.mutation({
      query: (data) => ({
        url: `/users/update-role/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data?.userRole,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        contentType: "application/json",
      }),
      invalidatesTags: ["user"],
    }),
    updateAccountStatus: build.mutation({
      query: (data) => ({
        url: `/account/update-status/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.data,
      }),
      invalidatesTags: ["admin"],
    }),
    updateAccount: build.mutation({
      query: (data) => ({
        url: `/account/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.data,
      }),
      invalidatesTags: ["admin"],
    }),
    deleteAccount: build.mutation({
      query: (id) => ({
        url: `/account/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useCreateBranchMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useGetAdminStatsQuery,
  useGetAdminLastMonthStatsQuery,
  useUpdateAccountStatusMutation,
  useGetAccountQuery,
  useDeleteAccountMutation,
  useUpdateAccountMutation,
  useGetManagersQuery,
} = adminApi;
