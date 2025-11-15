import Sample1500x500 from "../../assets/Sample1500x500.png";
import { useEffect, useContext, useState } from "react";
import DataContext from "../../Context/DataContext";
import ButtonLink from "../../components/Shared/ButtonLink";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";

// import PackageCard from "../../components/Shared/PackageCard";
// import PackageCarousel from "../../components/Shared/PackageCarousel";
import DoctorCard from "../../components/Shared/DoctorCard";
import { Button } from "react-bootstrap";
const Home = () => {
  const { doctors, packages } = useContext(DataContext);
  const [recDoctors, setRecDoctors] = useState([]);
  const [activeIdxCard, setActiveIdxCard] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    if (!doctors || doctors.length === 0) {
      setRecDoctors([]);
      return;
    }

    const currPage = activeIdxCard / cardsToShow + 1;
    const filtered = doctors.filter((doctor) => doctor.recommended === true);
    setRecDoctors(
      filtered.slice(
        currPage * cardsToShow - cardsToShow,
        currPage * cardsToShow
      )
    );
  }, [doctors, activeIdxCard, cardsToShow]);

  return (
    <>
      <div className="mt-5 container px-4">
        <div className="row align-items-center hero-section mb-4">
          <div className="col-lg-4">
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
          <div className="col-lg-8" style={{ overflow: "hidden" }}>
            <div className="rounded p-3" style={{ overflow: "hidden" }}>
              <h5 className="text-navy mb-3">ประกาศ</h5>
              <div className="ratio ratio-16x9 rounded">
                <img
                  className="hero-iframe rounded"
                  style={{ overflow: "hidden" }}
                  src={Sample1500x500}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
        {/* Package */}
        <hr className="border border-black m-auto" style={{ width: "100%" }} />
        <h3 className="text-black m-4 mt-1 mb-3">แพ็กเกจ และ โปรโมชั่น</h3>
        {/* <PackageCarousel packages={packages} /> */}

        {/* Recommended */}
        <hr className="border border-black m-auto" style={{ width: "97%" }} />
        <h3 className="text-black m-4 mt-1 mb-3">แพทย์แนะนำ</h3>
        <div className="d-flex flex-row gap-3 mb-3 flex-warp">
          <Button
            className="bg-navy text-white h-fit w-fit border-0 mt-0 align-self-center "
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            disabled={activeIdxCard === 0}
            onClick={() => setActiveIdxCard(activeIdxCard - cardsToShow)}
          >
            <ArrowBigLeft />
          </Button>
          <div className="d-flex gap-3 overflow-hidden m-auto justify-content-center w-100">
            {recDoctors && recDoctors.length > 0 ? (
              recDoctors.map((doctor) => (
                <DoctorCard key={doctor.doctor_id} doctor={doctor} />
              ))
            ) : (
              <div className="text-muted m-4">ยังไม่มีแพทย์แนะนำในขณะนี้</div>
            )}
          </div>
          <Button
            className="bg-navy text-white h-fit w-fit border-0 mt-0 align-self-center "
            style={{ borderRadius: "50%", width: "50px", height: "50px" }}
            disabled={
              activeIdxCard + cardsToShow >=
              doctors.filter((doctor) => doctor.recommended === true).length
            }
            onClick={() => setActiveIdxCard(activeIdxCard + cardsToShow)}
          >
            <ArrowBigRight />
          </Button>
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
