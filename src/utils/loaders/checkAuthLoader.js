import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = Cookies.get("expiryTimestamp");
  const expirationDate = new Date(parseFloat(storedExpirationDate) * 1000);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}

// export function getAuthToken() {
//   const authToken = Cookies.get("authToken");
//   const tokenDuration = getTokenDuration();

//   if (tokenDuration < 0) {
//     return "EXPIRED";
//   }
//   return authToken;
// }

export function checkAuthLoader() {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    return redirect("/");
  }
  return null;
}
