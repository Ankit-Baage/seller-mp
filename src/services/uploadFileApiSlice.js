import { apiSlice } from "./apiSlice";
import { baseUrl, uploadFile } from "../config/config";

export const uploadFileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: ({ category, file }) => {
        const formData = new FormData();
        formData.append('uploaded_file', file);  // Ensure this matches your backend field name

        return {
          url: `${baseUrl}/${category}/${uploadFile}`,
          method: 'POST',
          body: formData,
        };
      },
      extraOptions: {
        maxAge: 0,  // Disable caching
      },
    }),
  }),
});

export const { useUploadFileMutation } = uploadFileSlice;
