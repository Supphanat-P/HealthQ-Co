import React from "react";
import { Modal } from "react-bootstrap";
import { useData } from "../../../Context/DataContext";
import toast from "react-hot-toast";

const Logout = () => {
  const waiting = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { logout } = useData();

  try {
    logout();
    toast.success("ออกจากระบบสำเร็จ");
  } catch (err) {}
  waiting(600).then(() => {
    window.location.href = "/";
  });

  return <></>;
};

export default Logout;
