import { Button, Card, Carousel, Modal } from "react-bootstrap";
import Sample320x240 from "../../assets/Sample320x240.png";
import Sample1500x500 from "../../assets/Sample1500x500.png";
import { useEffect, useContext, useState } from "react";
import DataContext from "../../Context/DataContext";
import ButtonLink from "../../components/Shared/ButtonLink";
import PackageCard from "../../components/etc/PackageCard";
import DoctorCard from "../../components/AppointmentComponents/DoctorCard";
const Home = () => {
  const { doctors } = useContext(DataContext);
  const [recDoctors, setRecDoctors] = useState([]);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setRecDoctors([]);
      return;
    }
    const topFour = doctors.slice(0, 4);
    const filtered = topFour.filter((doctor) => doctor.recommended === true);
    setRecDoctors(filtered);
  }, [doctors]);

  return (
    <>
      <div className="mt-5 container px-4">
        <div className="row align-items-center hero-section">
          <div className="col-lg-4 mb-4">
            <div className="hero-links p-4 rounded-1">
              <h3 className="mb-3 text-navy">บริการของเรา</h3>
              <p className="text-muted small">
                ค้นหาแพทย์ นัดหมาย และดูประวัติการรักษาได้อย่างรวดเร็ว
              </p>
              <div className="d-grid gap-2 mt-3">
                <ButtonLink label="ค้นหาแพทย์" to="/doctorSearch" />
                <ButtonLink label="ทำนัดหมอ" to="/appointment" />
                <ButtonLink label="ประวัติการรักษา" to="/history" />
                <ButtonLink label="ติดต่อเรา" to="/contact" />
              </div>
            </div>
          </div>

          <div className="col-lg-8 mb-4">
            <div className="hero-video-card rounded shadow-sm p-3">
              <h5 className="text-navy mb-3">วีดีโอแนะนำ</h5>
              <div className="ratio ratio-16x9 rounded overflow-hidden">
                <iframe
                  className="hero-iframe"
                  src="https://www.youtube.com/embed/7vDYQEkJa3Y"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        <hr className="border border-black m-auto" style={{ width: "100%" }} />
        <h3 className="text-black m-4 mt-1 mb-3">แพ็กเกจ และ โปรโมชั่น</h3>
        <div className="d-flex flex-row gap-3 flex-wrap">
          <PackageCard />
          <PackageCard />
          <PackageCard />
          <PackageCard />
        </div>
        <hr className="border border-black m-auto" style={{ width: "97%" }} />
        <h3 className="text-black m-4 mt-1 mb-3">แพทย์แนะนำ</h3>
        <div className="d-flex flex-row gap-3 flex-wrap">
          {recDoctors && recDoctors.length > 0 ? (
            recDoctors.map((doctor) => (
              <DoctorCard key={doctor.doctor_id} doctor={doctor} />
            ))
          ) : (
            <div className="text-muted m-4">ยังไม่มีแพทย์แนะนำในขณะนี้</div>
          )}
        </div>
        <hr className="border border-black m-auto" style={{ width: "97%" }} />
        <h3 className="text-black m-4 mt-1 mb-3">ข่าวสาร</h3>

        <div
          className="bg-navy m-auto mt-5 mb-5 d-flex justify-content-center align-items-center rounded-3"
          src={Sample1500x500}
          style={{ width: "100%", height: "500px" }}
        >
          <div className="text-white"> พื้นที่สำหรับใส่รูป (1500 × 500)</div>
        </div>
      </div>
    </>
  );
};
export default Home;
