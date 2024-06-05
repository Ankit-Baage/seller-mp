import { baseUrl, mode, version, role, spares } from "..";


const uploadImageEndPoint = "upload_file";
const vrpDataDeleteEndPoint = (requestId) => `?request_id=${requestId}`;

const spareProductDetailDownloadEndPoint = "download_file?request_id=";

export const spareUrl = `${baseUrl}${version}${mode}${role}${spares}`;
export const spareUploadImageUrl = `${baseUrl}${version}${mode}${role}${spares}${uploadImageEndPoint}`;

export const VrpTableDataDeleteUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${vrpDataDeleteEndPoint(requestId)}`;
  export const spareProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${spares}${spareProductDetailDownloadEndPoint}${requestId}`;