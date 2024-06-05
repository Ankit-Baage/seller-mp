import axiosInstance from "../../axios-middleware/axiosMiddleware";

import { spareUploadImageUrl } from "../../../config/spare/spareConfig";

export const spareUploadImageRequest = async (file) => {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  try {
    const response = await axiosInstance.post(spareUploadImageUrl, formData);

    console.log("Upload successful:", spareUploadImageUrl);

    return response;
  } catch (error) {
    throw error;
  }
};
