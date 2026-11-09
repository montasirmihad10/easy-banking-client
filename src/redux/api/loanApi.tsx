import { baseApi } from "./baseApi";

const loanApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyLoan: build.query({
      query: () => ({
        url: "/loan/my-loan",
        method: "GET",
      }),
      providesTags: ["loan"],
    }),
    getLoan: build.query({
      query: (id) => ({
        url: `/loan/${id}`,
        method: "GET",
      }),
      providesTags: ["loan"],
    }),
    getCustomerLoans: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: { name: string; value: string }) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/loan/",
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
      providesTags: ["loan"],
    }),
    requestLoan: build.mutation({
      query: (data) => ({
        url: "/loan/request-loan",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["loan", "account"],
    }),
    payLaon: build.mutation({
      query: (data) => ({
        url: `/loan/pay-loan/${data?.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data?.loanData,
      }),
      invalidatesTags: ["loan", "account", "transaction"],
    }),
  }),
});

export const {
  useGetMyLoanQuery,
  useRequestLoanMutation,
  usePayLaonMutation,
  useGetCustomerLoansQuery,
  useGetLoanQuery,
} = loanApi;
