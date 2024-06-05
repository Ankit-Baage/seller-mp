
import { VrpLotStockStatusUrl } from "../../../config/vrp/vrpConfig";
import axiosInstance from "../../axios-middleware/axiosMiddleware";

export const vrpLotStockStatusRequest = async (data) => {
  const requestId = data.requestId;
  const status = data.status;
  try {
    const response = await axiosInstance.patch(
      VrpLotStockStatusUrl(requestId, status),
      null
    );

    return response;
  } catch (error) {
    throw error;
  }
};
