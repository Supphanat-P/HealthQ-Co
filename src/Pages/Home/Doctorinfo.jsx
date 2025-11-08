import { Row, Col } from "react-bootstrap";

const Doctorin = () => {
  return (
    <>
      <div className="text-center mb-4 pb-4" style={{ marginTop: "150px" }}>
        <h1 className="m-auto text-navy fw-bold">ข้อมูลแพทย์</h1>

        <div
          className="align-content-center m-auto"
          style={{
            height: "4px",
            width: "205px",
            backgroundImage:
              "linear-gradient(to right, #002D73, #386FAA, #8DD3FF, #8DD3FF)",
            margin: "80px 60px",
          }}
        />
      </div>

      <div
        className="m-auto shadow rounded p-4 bg-softgray"
        style={{
          width: "850px",
          height: "auto",
        }}
      >
        <Row className="align-items-center mb-4">
          <Col md={4} className="text-center">
            <img
              src="./public/phdoctor.jpg"
              alt="doc"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </Col>

          <Col md={8}>
            <h2 className="text-navy fw-bold">นพ. หงสาวดี แซ่ลี่</h2>
            <p className="text-secondary mb-1">แพทย์ชำนาญการ รักษาอาการทางใจ</p>
            <p className="text-secondary mb-1">โรงพยาบาล กรุงเทพ</p>
            <p className="text-secondary">ประสบการณ์ทำงาน 15 ปี</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p
              className="text-dark fw-bold fs-4 "
              style={{ marginBottom: "-10px" }}
            >
              การศึกษาและใบรับรอง
            </p>
            <hr style={{ border: "1px solid #000000ff" }} />
            <p>
              แพทย์ผู้เชี่ยวชาญด้านโรคหัวใจและหลอดเลือด มีประสบการณ์กว่า 15 ปี
              ในการรักษาและดูแลผู้ป่วยโรคหัวใจ
            </p>
          </Col>
        </Row>

        <Row>
          <Col>
            <p
              className="text-dark fw-bold fs-4 "
              style={{ marginBottom: "-10px" }}
            >
              ติดต่อแพทย์
            </p>
            <hr style={{ border: "1px solid #000000ff" }} />
            <p>02-123-4567</p>
            <p>dr.hongsawadee@hearthrakna.co.th</p>
            <p>123 อาคารแพทย์ ชั้น 4 ถนนพระราม 4 กรุงเทพฯ 10110</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Doctorin;
