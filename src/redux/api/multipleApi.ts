import { baseApi } from "./baseApi";

const multipleApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStripeTransaction: build.query({
      query: (id) => ({
        url: `/transaction/stripe/success/${id}`,
        method: "GET",
      }),
      providesTags: ["stripe"],
    }),
    getMyTransactions: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/transaction/personal-transactions",
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
      providesTags: ["transaction"],
    }),
    getAccountTypes: build.query({
      query: () => ({
        url: "/type/",
        method: "GET",
      }),
      providesTags: ["types"],
    }),
    getAccountStats: build.query({
      query: () => ({
        url: "/stats/customer-stats",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
    getCustomerAdditionalStats: build.query({
      query: () => ({
        url: "/stats/customer-additional-stats",
        method: "GET",
      }),
      providesTags: ["stats"],
    }),
    updateLoanStatus: build.mutation({
      query: (data) => ({
        url: `/loan/update-requested-loan/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.data,
      }),
      invalidatesTags: ["loan", "account", "transaction", "branch"],
    }),
  }),
});

export const {
  useGetStripeTransactionQuery,
  useGetMyTransactionsQuery,
  useGetAccountTypesQuery,
  useGetAccountStatsQuery,
  useGetCustomerAdditionalStatsQuery,
  useUpdateLoanStatusMutation,
} = multipleApi;
