import { UserRound, HeartPulse, Phone } from "lucide-react";
import AppointmentHeader from "../components/Shared/AppointmentHeader";

const Profile = () => {
  return (
    <>
      <AppointmentHeader label={"ข้อมูลผู้ใช้"} />

      <div className="bg-navy text-white rounded-4 shadow-lg p-5 mx-auto mt-4" style={{ width: "90%" }}>
        <div className="d-flex justify-content-between flex-wrap">

          <div className="bg-white text-navy rounded-4 p-4 mb-4" style={{ width: "30%" }}>
            <div className="d-flex align-items-center fw-bold fs-5 mb-3">
              <UserRound className="me-2" /> ข้อมูลส่วนตัว
            </div>
            <div className="fw-bold fs-5 text-center mb-3">
              นาย ธีรดน คนธรรมดา
            </div>
            <div className="d-flex justify-content-between"><div className="mb-3">เพศ : </div><span className="ms-3">ชาย</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">วันเกิด : </div><span className="ms-3">วว/ดด/ปป</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">สัญชาติ : </div><span className="ms-3">ไทย</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">เลขประจำตัวประชาชน : </div><span className="ms-3">xxxxx-xxxxx-xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">น้ำหนัก : </div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">ส่วนสูง : </div><span className="ms-3">xxx</span></div>
          </div>

          <div className="bg-white text-navy rounded-4 p-4 mb-4" style={{ width: "30%" }}>
            <div className="d-flex align-items-center fw-bold fs-5 mb-3">
              <HeartPulse className="me-2" /> ประวัติสุขภาพ
            </div>
                        <div className="d-flex justify-content-between"><div className="mb-3">โรคประจำตัว :</div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">ยาประจำตัว : </div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">ประวัติแพ้ยา : </div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">ประวัติแพ้อาหาร : </div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">น้ำหนัก : </div><span className="ms-3">xxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">ส่วนสูง : </div><span className="ms-3">xxx</span></div>
          </div>

          <div className="bg-white text-navy rounded-4 p-4 mb-4" style={{ width: "30%" }}>
            <div className="d-flex align-items-center fw-bold fs-5 mb-3">
              <Phone className="me-2" /> ข้อมูลติดต่อ
            </div>
                        <div className="d-flex justify-content-between"><div className="mb-3">เบอร์ติดต่อ : </div><span className="ms-3">xxx-xxx-xxxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">เบอร์ติดต่อฉุกเฉิน : </div><span className="ms-3">xxx-xxx-xxxx</span></div>
                        <div className="d-flex justify-content-between"><div className="mb-3">E-mail : </div><span className="ms-3">xxxx@gmail.com</span></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
