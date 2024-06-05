
import { VrpTableDataDeleteUrl } from "../../../config/vrp/vrpConfig";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const vrpTableDataDeleteRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(
      VrpTableDataDeleteUrl(requestId)
    );
    console.log(response)

    return response;
  } catch (error) {
    throw error;
  }
};
