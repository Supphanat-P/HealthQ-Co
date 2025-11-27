import React, { useEffect } from "react";
import { useData } from "../../../Context/DataContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { logout } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        toast.success("ออกจากระบบสำเร็จ");

        setTimeout(() => {
          navigate("/");  
        }, 600);
      } catch (err) {
        toast.error("ออกจากระบบไม่สำเร็จ");
      }
    };

    performLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
