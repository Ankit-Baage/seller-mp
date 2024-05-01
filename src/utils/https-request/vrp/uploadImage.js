import axios from "axios";
import { uploadImageUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const uploadImageRequest = async (file) => {
  const formData = new FormData();
  formData.append("uploaded_file", file);
  try {
    const response = await axiosInstance.post(uploadImageUrl, formData);

    console.log("Upload successful:", uploadImageUrl);

    return response;
  } catch (error) {
    throw error;
  }
};
