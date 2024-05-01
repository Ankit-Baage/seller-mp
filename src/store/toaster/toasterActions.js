import { openToaster, closeToaster } from "./toasterSlice";

export const showToastWithTimeout = (message, backgroundColor) => async (dispatch) => {
  dispatch(openToaster({ message, backgroundColor }));
  setTimeout(() => {
    dispatch(closeToaster());
  }, 3000);
};