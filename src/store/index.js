// store.js
import { configureStore } from "@reduxjs/toolkit";

import backdropReducer from "./backdropSlice";
import toasterReducer from "./toaster/toasterSlice";
import phoneNumberReducer from "./authentication/phoneNumberSlice";
import spinnerReducer from "./spinnerSlice";

export const store = configureStore({
  reducer: {
    backdrop: backdropReducer,
    toaster: toasterReducer,
    phoneNumber: phoneNumberReducer,
    spinner: spinnerReducer,
    // Add other reducers if any
  },
});
