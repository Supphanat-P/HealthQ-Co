import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useData } from "../../../Context/DataContext";

const Logout = () => {
  const {
    setCurrentUser,
    setToken,
    fetchAndSetData,
  } = useData();

  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");

        setToken("");
        setCurrentUser(null);

        fetchAndSetData(null);

        toast.success("ออกจากระบบสำเร็จ");

        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch {
        toast.error("ออกจากระบบไม่สำเร็จ");
      }
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default Logout;