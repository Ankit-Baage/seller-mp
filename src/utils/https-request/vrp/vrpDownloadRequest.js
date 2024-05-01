import { vrpProductDetailDownloadUrl } from "../../../config/config";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const downloadFile = async (url) => {
  try {
    const response = await axiosInstance.get(url, {
      responseType: "arraybuffer",
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export const vrpDownloadRequest = async ({ requestId }) => {
  try {
    const downloadUrl = vrpProductDetailDownloadUrl(requestId);
    console.log("url :", downloadUrl);
    const fileData = await downloadFile(downloadUrl);

    // Log the downloaded file data
    console.log("Downloaded file data:", fileData);

    return fileData;
  } catch (error) {
    console.log(error)
    throw error; // Re-throw the original error
  }
};
