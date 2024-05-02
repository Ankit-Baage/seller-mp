const baseUrl = "https://dev.backend.mobigarage.com/";
const version = "v1/";
const mode = "mp/";
const role = "sellers/";
const logInEndpoint = "login";
const uploadImageEndPoint = "upload_file";
const vrpDataDeleteEndPoint = (requestId) => `?request_id=${requestId}`;
const vrpLotStockStatusEndPoint = (requestId, status) => `stock?request_id=${requestId}&status=${status}`;

const vrpProductDetailDownloadEndPoint = "download_file?request_id=";

export const sellerLoginUrl = `${baseUrl}${version}${mode}${role}${logInEndpoint}`;
export const vrpUrl = `${baseUrl}${version}${mode}${role}`;
export const uploadImageUrl = `${baseUrl}${version}${mode}${role}${uploadImageEndPoint}`;

export const VrpTableDataDeleteUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${vrpDataDeleteEndPoint(requestId)}`;
export const vrpProductDetailDownloadUrl = (requestId) =>
  `${baseUrl}${version}${mode}${role}${vrpProductDetailDownloadEndPoint}${requestId}`;


  export const VrpLotStockStatusUrl = (requestId, status) =>
  `${baseUrl}${version}${mode}${role}${vrpLotStockStatusEndPoint(requestId, status)}`;
