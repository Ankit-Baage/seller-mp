import Cookies from "js-cookie";

export const getExpirationDuration = () => {
  const storedExpirationTimeInSeconds = Number(Cookies.get("expirationTime"));

  // Convert storedExpirationTimeInSeconds to milliseconds
  const storedExpirationTimeInMillis = storedExpirationTimeInSeconds * 1000;

  const expirationTime = new Date(storedExpirationTimeInMillis);

  const now = new Date();

  const duration = expirationTime.getTime() - now.getTime();

  return duration;
};
export const getAuthToken = () => {
  const token = Cookies.get("token");
  const tokenDuration = getExpirationDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};