import { createToaster } from "@meforma/vue-toaster";
export const Toast = (message, type, time = 2000) => {
  createToaster({}).show(message, {
    type: type,
    message: message,
    duration: time,
    dismisible: true,
  });
};
