import { baseApi } from "./baseApi";

const branchApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyBranch: build.query({
      query: () => ({
        url: "/branch/my-branch",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getBranches: build.query({
      query: () => ({
        url: "/branch/",
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    getEachBranch: build.query({
      query: (id) => ({
        url: `/branch/${id}`,
        method: "GET",
      }),
      providesTags: ["branch"],
    }),
    updateBranchManager: build.mutation({
      query: (data) => ({
        url: `/branch/update-branch-manager/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.data,
      }),
      invalidatesTags: ["branch"],
    }),
    updateBranch: build.mutation({
      query: (data) => ({
        url: `/branch/${data.id}`,
        method: "PATCH",
        contentType: "application/json",
        data: data.data,
      }),
      invalidatesTags: ["branch"],
    }),
  }),
});

export const {
  useGetMyBranchQuery,
  useGetBranchesQuery,
  useGetEachBranchQuery,
  useUpdateBranchManagerMutation,
  useUpdateBranchMutation,
} = branchApi;
