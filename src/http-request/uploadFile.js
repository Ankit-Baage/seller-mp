
import axiosInstance from "../axios/axiosTokenMiddleware";
import { baseUrl, uploadFile, mode, role, version } from "../config/config";
import { upload } from "@testing-library/user-event/dist/upload";

// Create a function to generate the upload URL based on category

const uploadUrl = (category) =>
  `${baseUrl}${version}${mode}${role}/${category}${uploadFile}`;

export const uploadImageRequest = async (file, category) => {
  const formData = new FormData();
  formData.append("uploaded_file", file);

  try {
    // Pass the category to the uploadUrl function to generate the correct URL
    const url = uploadUrl(category);
    console.log(url)
    const response = await axiosInstance.post(uploadUrl(category), formData);

    console.log("Upload successful:", uploadUrl);

    return response;
  } catch (error) {
    const url = uploadUrl(category);
    console.log(url)
    throw error;
  }
};
