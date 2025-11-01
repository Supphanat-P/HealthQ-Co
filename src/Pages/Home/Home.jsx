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
      <div
        className="mt-5"
        style={{ marginLeft: "10rem", marginRight: "10rem" }}
      >
        <div className="d-flex flex-row">
          <div className="bg-softgray m-5 mt-5 mb-5 justify-content-center align-items-center rounded-1">
            <ButtonLink label="ค้นหาแพทย์" to="/doctorSearch" />
            <ButtonLink label="ทำนัดหมอ" to="/doctorSearch" />
            <ButtonLink label="ประวัติการรักษา" to="/doctorSearch" />
            <ButtonLink label="ติดต่อเรา" to="/doctorSearch" />
          </div>

          <div className="m-5 mt-5 mb-5 bg-black rounded shadow m-auto">
            <div
              style={{ width: "100%", maxWidth: "100%" }}
              className="m-auto rounded"
            >
              <iframe
                className="rounded"
                src="https://www.youtube.com/embed/7vDYQEkJa3Y"
                title="YouTube video player"
                width="800px"
                height="500"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            {/* <img
            src={Sample1500x500}
            alt="1500x500"
            style={{ width: "750px", height: "500px" }}
          /> */}
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
