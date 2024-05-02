import Cookies from "js-cookie";

export function getTokenDuration() {
  const storedExpirationDate = Cookies.get("expiryTimestamp");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
