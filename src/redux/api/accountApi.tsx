import { baseApi } from "./baseApi";

const accountApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    createAccount: build.mutation({
      query: (data) => ({
        url: "/account/create-account",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["account"],
    }),
    getMyAccount: build.query({
      query: () => ({
        url: "/account/my-account",
        method: "GET",
      }),
      providesTags: ["account"],
    }),
    getAccounts: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/account/",
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
      providesTags: ["admin"],
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useGetMyAccountQuery,
  useGetAccountsQuery,
} = accountApi;
