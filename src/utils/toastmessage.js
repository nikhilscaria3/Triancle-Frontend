import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notifySuccess = (message) => toast.success(message);
const notifyError = (message) => toast.error(message);


export const showNotification = ({ type, message }) => {
  switch (type) {
    case "SUCCESS":
      return notifySuccess(message);
    case "ERROR":
      return notifyError(message);
    default:
      console.log("Notify type not defined");
  }
}

