import { baseApi } from "./baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getBankSettings: build.query({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getAdminBankSettings: build.query({
      query: () => ({
        url: "/settings/admin",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updateBankSettings: build.mutation({
      query: (data) => ({
        url: "/settings",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["settings"],
    }),
    uploadWebsiteImage: build.mutation({
      query: (data: FormData) => ({
        url: "/settings/upload-image",
        method: "POST",
        contentType: "multipart/formdata",
        data,
      }),
    }),
    getPrivacy: build.query({
      query: () => ({
        url: "/settings/privacy",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updatePrivacy: build.mutation({
      query: (data) => ({
        url: "/settings/privacy",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["settings"],
    }),
    getTerms: build.query({
      query: () => ({
        url: "/settings/terms",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updateTerms: build.mutation({
      query: (data) => ({
        url: "/settings/terms",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["settings"],
    }),
    getAbout: build.query({
      query: () => ({
        url: "/settings/about",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    updateAbout: build.mutation({
      query: (data) => ({
        url: "/settings/about",
        method: "PATCH",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetBankSettingsQuery,
  useGetAdminBankSettingsQuery,
  useUpdateBankSettingsMutation,
  useUploadWebsiteImageMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} = settingsApi;
