import { baseUrl, mode, version, role } from "..";

const logInEndpoint = "login";


export const sellerLoginUrl = `${baseUrl}${version}${mode}${role}${logInEndpoint}`;