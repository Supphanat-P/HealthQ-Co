import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        toast.success("ออกจากระบบสำเร็จ");

        setTimeout(() => {
          navigate("/");
        }, 600);
      } catch {
        toast.error("ออกจากระบบไม่สำเร็จ");
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;