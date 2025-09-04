// UserContext.js
import React, { createContext, useState, useEffect } from "react";

import { handleLogout } from "../Components/API/Api.jsx";
// Create the UserContext
export const UserContext = createContext();
// Constants
// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("svcf_backOffice_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user data and timestamp whenever user changes
  useEffect(() => {
    if (user) {
      // console.log(user);
      localStorage.setItem("svcf_backOffice_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("svcf_backOffice_user");
    }
  }, [user]);

  console.log(user);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };
  const clearUser = async () => {
    try {
      const response = await handleLogout();
      if (response.success) {
        localStorage.removeItem("svcf_backOffice_user");
        localStorage.removeItem("BackOfficeToken");
      }
      setUser(null);
    } catch (error) {
      console.error(
        "Error during logout:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
