import { Container } from "react-bootstrap";
import { InputGroup, Form, Button } from "react-bootstrap";
import { BiSearch } from "react-icons/bi";
import { BiCalendar, BiSearchAlt, BiPhone } from "react-icons/bi";
const Home = () => {
  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          backgroundImage: `url('/Logo.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="gradient-logo"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
            opacity: 0.5,
          }}
        />

        <div
          className="m-auto d-flex justify-content-start align-items-start"
          style={{
            textAlign: "center",
            position: "relative",
            zIndex: 2,
            padding: "0 20px",
          }}
        >
          <div
            className="d-flex flex-column justify-content-center align-items-center text-white"
            style={{
              height: "600px",
              textAlign: "center",
            }}
          >
            <div
              className="move-left"
              style={{
                fontSize: "64px",
                fontWeight: "500",
                lineHeight: "1.2",
              }}
            >
              WE CARE ABOUT <br /> YOUR HEALTH
            </div>

            <div
              className="move-left fs-4"
              style={{
                marginTop: "20px",
                lineHeight: "1.5",
                maxWidth: "800px",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              every day is a new opportunity for you to do <br /> something for
              your health.
            </div>

            <div className="move-left d-flex flex-column justify-content-center align-items-center">
              <button
                className="btn bg-sky d-grid gap-2 shadow"
                style={{
                  width: "275px",
                  height: "70px",
                  borderRadius: "50px",
                  marginTop: "30px",
                  alignSelf: "center",
                }}
              >
                <h3 className="text-white text-center mt-2">นัดหมายแพทย์</h3>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="d-flex justify-content-center"
        style={{ backgroundColor: "#EEEEFF", padding: "50px" }}
      >
        <div>
          <div className="m-5 d-flex justify-content-center">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "500px",
                height: "55px",
                backgroundColor: "#ffffff",
                borderRadius: "50px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#1a1f57",
                  border: "none",
                  width: "55px",
                  height: "55px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  margin: "0",
                }}
              >
                <BiSearch size={22} color="white" />
              </button>
              <input
                type="text"
                placeholder="ค้นหาโรงพยาบาล ชื่อแพทย์ ความชำนาญ"
                style={{
                  flex: 1,
                  height: "100%",
                  border: "none",
                  outline: "none",
                  paddingLeft: "20px",
                  fontSize: "16px",
                  color: "#1a1f57",
                  borderRadius: "50px",
                }}
              />
            </div>
          </div>

          <div className="d-flex m-auto justify-content-center align-items-center">
            <button
              className="btn bg-sky m-5 d-flex align-items-center justify-content-center gap-2 box-shadow"
              style={{ width: "275px", height: "70px" }}
            >
              <BiCalendar size={24} color="white" />
              <h3 className="text-white mb-0">จองคิวตรวจ</h3>
            </button>

            <button
              className="btn bg-sky m-5 d-flex align-items-center justify-content-center gap-2 box-shadow"
              style={{ width: "275px", height: "70px" }}
            >
              <BiSearchAlt size={24} color="white" />
              <h3 className="text-white mb-0">ค้นหาแพทย์</h3>
            </button>

            <button
              className="btn bg-sky m-5 d-flex align-items-center justify-content-center gap-2 box-shadow"
              style={{ width: "275px", height: "70px" }}
            >
              <BiPhone size={24} color="white" />
              <h3 className="text-white mb-0">ติดต่อเรา</h3>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div
          className="d-flex flex-column align-items-center"
          style={{ backgroundColor: "#EEEEFF", padding: "20px 0" }}
        >
          <div className="text-darkblue fs-1">วิธีการใช้งาน</div>

          <div
            style={{
              height: "4px",
              width: "300px",
              backgroundImage:
                "linear-gradient(to right, rgb(0, 45, 115), rgb(56, 111, 170), rgb(141, 211, 255), rgb(141, 211, 255))",
              marginTop: "10px",
            }}
          ></div>
        </div>

        <div
          className="d-flex flex-column align-items-center"
          style={{ backgroundColor: "#EEEEFF", padding: "20px 0" }}
        >
          <div className="text-darkblue fs-3 text-center">
            เพียง 4 ขั้นตอนง่ายๆ คุณก็สามารถจองนัดหมายกับแพทย์ได้ทันที
          </div>
          <div
            style={{
              height: "4px",
              width: "800px",
              backgroundImage:
                "linear-gradient(to right, rgb(0, 45, 115), rgb(56, 111, 170), rgb(141, 211, 255), rgb(141, 211, 255))",
              marginTop: "10px",
            }}
          ></div>
        </div>

        <div style={{ backgroundColor: "#EEEEFF" }}>
          <Container
            className="d-flex justify-content-center m-auto align-items-center gap-5"
            style={{ height: "500px" }}
          >
            <div className="d-flex flex-column align-items-center text-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#1F2054",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  position: "relative",
                  top: "10px",
                  left: "-120px",
                }}
              >
                01
              </div>

              <div
                style={{
                  width: "180px",
                  height: "160px",
                  backgroundColor: "#1F2054",
                  borderRadius: "20px",
                  marginTop: "-20px",
                }}
              ></div>
              <div style={{ marginTop: "20px" }}>
                <h5 style={{ color: "#1F2054", fontWeight: "700" }}>
                  เลือกโรงพยาบาล
                </h5>
                <p
                  style={{
                    color: "#1F2054",
                    marginBottom: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  เลือกโรงพยาบาลที่ต้องการจากรายชื่อของเรา
                </p>
              </div>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#1F2054",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  position: "relative",
                  top: "10px",
                  left: "-120px",
                }}
              >
                02
              </div>

              <div
                style={{
                  width: "180px",
                  height: "160px",
                  backgroundColor: "#1F2054",
                  borderRadius: "20px",
                  marginTop: "-20px",
                }}
              ></div>
              <div style={{ marginTop: "20px" }}>
                <h5 style={{ color: "#1F2054", fontWeight: "700" }}>
                  เลือกแพทย์
                </h5>
                <p
                  style={{
                    color: "#1F2054",
                    marginBottom: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  เลือกแพทย์ที่ต้องจากรายชื่อแพทย์ผู้เชี่ยวชาญของเรา
                </p>
              </div>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#1F2054",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  position: "relative",
                  top: "10px",
                  left: "-120px",
                }}
              >
                03
              </div>

              <div
                style={{
                  width: "180px",
                  height: "160px",
                  backgroundColor: "#1F2054",
                  borderRadius: "20px",
                  marginTop: "-20px",
                }}
              ></div>
              <div style={{ marginTop: "20px" }}>
                <h5 style={{ color: "#1F2054", fontWeight: "700" }}>
                  เลือกวันและเวลา
                </h5>
                <p
                  style={{
                    color: "#1F2054",
                    marginBottom: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  เลือกวันที่และเวลาที่สะดวกสำหรับคุณจากตารางที่ว่าง
                </p>
              </div>
            </div>

            <div className="d-flex flex-column align-items-center text-center">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#1F2054",
                  color: "white",
                  fontWeight: "700",
                  fontSize: "20px",
                  position: "relative",
                  top: "10px",
                  left: "-120px",
                }}
              >
                04
              </div>

              <div
                style={{
                  width: "180px",
                  height: "160px",
                  backgroundColor: "#1F2054",
                  borderRadius: "20px",
                  marginTop: "-20px",
                }}
              ></div>
              <div style={{ marginTop: "20px" }}>
                <h5 style={{ color: "#1F2054", fontWeight: "700" }}>
                  ยืนยันนัดหมาย
                </h5>
                <p
                  style={{
                    color: "#1F2054",
                    marginBottom: "0",
                    whiteSpace: "nowrap",
                  }}
                >
                  ยืนยันการนัดหมายและรับการแจ้งเตือนก่อนถึงเวลานัด
                </p>
              </div>
            </div>
          </Container>
        </div>
      </div>

      <div
        className="bg-sky m-auto d-flex flex-column"
        style={{ height: "300px", position: "relative" }}
      >
        <div className="text-white move-left mt-5 fs-2">Health Queue</div>

        <div
          className="d-flex justify-content-start align-items-center gap-5"
          style={{ marginTop: "50px" }}
        >
          <button
            className="invisible-button  fs-4"
            style={{ marginLeft: "240px" }}
          >
            About Us
          </button>
          <button
            className="invisible-button  fs-4"
            style={{ marginLeft: "240px" }}
          >
            Services
          </button>
          <button
            className="invisible-button  fs-4"
            style={{ marginLeft: "240px" }}
          >
            Help & Support
          </button>
          <button
            className="invisible-button  fs-4"
            style={{ marginLeft: "240px" }}
          >
            Social Media
          </button>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1600px",
            height: "2px",
            backgroundColor: "white",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1600px",
            color: "white",
            fontSize: "14px",
            textAlign: "left",
            paddingLeft: "0px",
          }}
        >
          © 2025 Health Queue
        </div>
      </div>
    </>
  );
};
export default Home;
