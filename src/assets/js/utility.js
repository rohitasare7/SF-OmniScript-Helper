//Add Toast
import toast from "./toast";
const addToast = (toastText, toastType = null) => {
  toast.add({
    message: {
      text: toastText,
      type: toastType,
    },
  });
};

const copyData = (value, toastMsg = null) => {
  if (value) {
    navigator.clipboard.writeText(value);
    if (toastMsg) {
      addToast(toastMsg);
    }
  }
};

export { addToast, copyData };
