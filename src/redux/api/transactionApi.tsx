import { baseApi } from "./baseApi";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    depositBalance: build.mutation({
      query: (data) => ({
        url: "/transaction/create-deposit",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["transaction", "account"],
    }),
    withdrawBalance: build.mutation({
      query: (data) => ({
        url: "/transaction/create-withdraw",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["transaction", "account"],
    }),
    reviewWithdraw: build.mutation({
      query: ({ id, action }: { id: string; action: "approve" | "reject" }) => ({
        url: `/transaction/review-withdraw/${id}`,
        method: "PATCH",
        contentType: "application/json",
        data: { action },
      }),
      invalidatesTags: ["transaction", "account"],
    }),
    transferBalance: build.mutation({
      query: (data) => ({
        url: "/transaction/create-transfer",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["transaction", "account"],
    }),
    downloadTransaction: build.mutation({
      query: (id) => ({
        url: `/transaction/${id}/download`,
        method: "POST",
        responseType: "blob",
      }),
    }),
    getTransactions: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/transaction/",
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
  }),
});

export const {
  useDepositBalanceMutation,
  useWithdrawBalanceMutation,
  useReviewWithdrawMutation,
  useTransferBalanceMutation,
  useDownloadTransactionMutation,
  useGetTransactionsQuery,
} = transactionApi;
