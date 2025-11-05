import React, { useState } from "react";
import { Calendar } from "../../components/Shared/Calendar";
import SelectTime from "../../components/Shared/SelectTime";
import BackToNavigate from "../../components/Shared/backToNavigate";
import { useData } from "../../Context/DataContext";
import { Button } from "react-bootstrap";

export default function DatePickerExample() {
  const [selectedDoctorId, setSelectedDoctorId] = useState("D001");
  const { doctors } = useData();
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <BackToNavigate label="กลับไปหน้าค้นหาแพทย์" linkTo="doctorsearch" />
      <div className="main d-flex justify-content-center">
        <div className="d-flex flex-row">
          <div className="d-flex flex-column">
            {/* Doctor info */}
            <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              หมออยู่ตรงนี้
            </div>
            {/* P */}
            <div className="card m-2" style={{ width: "600px" }}>
              <div className="p-3">
                <Calendar
                  mode="single"
                  selectedDoctorId={selectedDoctorId}
                  onDateSelect={(d) => setSelectedDate(d)}
                />
                <hr />
                <SelectTime
                  selectedDoctorId={selectedDoctorId}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
            {/* Patient Info */}
            <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              คนไข้กรอกข้อมูลตรงนี้
            </div>
             <div className="card shadow p-3 m-2" style={{ width: "600px" }}>
              แนบไฟล์ตรงนี้
            </div>
          </div>
          <div className="stickky-side">
            <div className="card w-75 shadow m-2 p-3">
              <h5 className="mb-4 text-navy">สรุปรายละเอียดการจอง</h5>

              <div className="mb-3">
                <p className="text-gray mb-1">แพทย์</p>
                <p className="text-black mb-1">นพ. หงสาวดี แซ่ลี่</p>
              </div>
              <div className="mb-3">
                <p className="text-gray mb-1">วันที่</p>
                <p className="text-black mb-1">ศุกร์ที่ 10 มีนาคม 2566</p>
              </div>
              <div className="mb-3">
                <p className="text-gray mb-1">เวลา</p>
                <p className="text-black mb-1">10:00 - 11:00 น.</p>
              </div>
              <div className="footer">
                <Button className="btn-navy w-100 mt-4">ยืนยันการจอง</Button>

                <p
                  className="text-gray mt-3 text-center"
                  style={{ fontSize: "12px" }}
                >
                  คุณสามารถยกเลิกหรือเปลี่ยนแปลงนัดหมายได้ภายใน 24
                  ชั่วโมงก่อนเวลานัด
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
