import React, { useEffect } from "react";
import { useData } from "../../../Context/DataContext";
import toast from "react-hot-toast";

const Logout = () => {
  const { logout } = useData();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        toast.success("ออกจากระบบสำเร็จ");
        setTimeout(() => {
          window.location.href = "/";
        }, 600);
      } catch (err) {
        toast.error("ออกจากระบบไม่สำเร็จ");
      }
    };

    performLogout();
  }, [logout]);

  return <></>;
};

export default Logout;
