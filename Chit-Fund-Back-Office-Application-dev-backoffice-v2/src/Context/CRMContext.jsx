import { createContext, useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export const CRMContext = createContext();

export const CRMContextProvider = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const showToast = (message) => {
    const toastId = toast.success(message, {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => toast.dismiss(toastId), 2000);
  };

  const showErrorToast = (message) => {
    const toastId = toast.error(message, {
      position: "top-right",
      autoClose: 2000,
    });
    setTimeout(() => toast.dismiss(toastId), 2000);
  };

  return (
    <CRMContext.Provider
      value={{
        showToast,
        showErrorToast,
        openSidebar,
        setOpenSidebar,
      }}
    >
      {children}
      <ToastContainer />
    </CRMContext.Provider>
  );
};

export const useCRM = () => useContext(CRMContext);
