import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

export function checkAuthLoader() {
  const authToken = Cookies.get("authToken");
  const timeStamp = Cookies.remove("expiryTimestamp");

  if (!authToken && !timeStamp) {
    return redirect("/");
  }
  return null;
}
