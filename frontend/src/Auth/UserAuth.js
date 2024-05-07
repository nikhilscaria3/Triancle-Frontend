import { useState, useEffect } from "react"; // Import useEffect from React
import { axiosInstance } from "../util/baseurl";

const setisMaintenanceMode = false;

export const isAuthenticated = () => {
  const token = localStorage.getItem("refreshtoken");
  return !!token; // Returns true if token exists, otherwise false
};

export const isMaintenanceMode = () => {
  return setisMaintenanceMode; // Change this based on your implementation
};

export const useCheckAdminStatus = () => {
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    const fetchAdminStatus = async () => {
      try {
        const userToken = localStorage.getItem('refreshtoken');
        const response = await axiosInstance.get('/user/getuser', {
          params: {
            token: userToken,
          },
        });
        if (response && response.data.status === 'Admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        // Handle error
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  return isAdmin;
};
