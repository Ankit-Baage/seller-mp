import { baseUrl, mode, version, role, stock, } from "..";


const uploadImageEndPoint = "upload_file";
const vrpDataDeleteEndPoint = (requestId) => `?request_id=${requestId}`;

const vrpProductDetailDownloadEndPoint = "download_file?request_id=";

export const vrpUrl = `${baseUrl}${version}${mode}${role}`;
export const uploadImageUrl = `${baseUrl}${version}${mode}${role}${uploadImageEndPoint}`;

export const VrpTableDataDeleteUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${vrpDataDeleteEndPoint(requestId)}`;
  export const vrpProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${vrpProductDetailDownloadEndPoint}${requestId}`;
  export const VrpLotStockStatusUrl = (requestId, status) =>
    `${baseUrl}${version}${mode}${role}${stock}request_id=${requestId}&status=${status}`;