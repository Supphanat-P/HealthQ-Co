import { Button } from "react-bootstrap";
import { ClipboardPlus } from "lucide-react";
import { Calendar } from "lucide-react";
import { Clock } from "lucide-react";
import { Hospital } from "lucide-react";

const AppointmentSummary = () => {
  return (
    <>
      <div
        className="sticky-side"
        style={{ position: "sticky", top: 20, zIndex: 100 }}
      >
        <div className="card w-75 shadow m-2 p-3">
          <h5 className="mb-4 text-navy">สรุปรายละเอียดการจอง</h5>

          <div className="mb-3">
            <p className="text-gray mb-1">
              <ClipboardPlus />
              &nbsp; แพทย์
            </p>
            <p className="text-black mb-1">นพ. หงสาวดี แซ่ลี่</p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Hospital />
              &nbsp; โรงพยาบาล
              <p className="text-black mb-1">โรงพยาบาลหงสาวดี</p>
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Hospital />
              &nbsp; ความชำนาญ/สาขาเฉพาะทาง
              <p className="text-black mb-1">รักษาอาการทางใจ</p>
            </p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Calendar />
              &nbsp; วันที่
            </p>
            <p className="text-black mb-1">ศุกร์ที่ 10 มีนาคม 2566</p>
          </div>
          <div className="mb-3">
            <p className="text-gray mb-1">
              <Clock />
              &nbsp; เวลา
            </p>
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
    </>
  );
};
export default AppointmentSummary;
