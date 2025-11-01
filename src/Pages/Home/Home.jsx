import { Button, Card } from "react-bootstrap";
import TestPhoto from "../assets/TestPhoto.png";
import V2 from "../assets/V2.png";
const Home = () => {
  return (
    <>
      <div className="d-flex flex-row">
        <div>
          <button
            className="btn hover-primary bg-navy m-5 mt-5 mb-5 d-grid gap-2 container shadow"
            style={{ width: "275px", height: "70px" }}
          >
            <h3 className="text-white text-center mt-2">จองคิวตรวจ</h3>
          </button>
          <button
            className="btn hover-primary bg-navy m-5 mt-auto mb-5 d-grid gap-2 container shadow"
            style={{ width: "275px", height: "70px" }}
          >
            <h3 className="text-white text-center mt-2">ทำนัด</h3>
          </button>
          <button
            className="btn hover-primary bg-navy m-5 mt-auto mb-5 d-grid gap-2 container shadow"
            style={{ width: "275px", height: "70px" }}
          >
            <h3 className="text-white text-center mt-2">ชำระค่าบริการ</h3>
          </button>
          <button
            className="btn hover-primary bg-navy m-5 mt-auto mb-5 d-grid gap-2 container shadow"
            style={{ width: "275px", height: "70px" }}
          >
            <h3 className="text-white text-center mt-2">เลือกโรงพยาบาล</h3>
          </button>
        </div>

        <div
          className="btn"
          src={V2}
          style={{ width: "1500px", height: "500px" }}
        >
          <div className="text-black"> พื้นที่สำหรับใส่รูป (1500 × 500)</div>
        </div>
      </div>

      <hr className="border border-black " />
      <h3 className="text-black m-4 mt-1 mb-3">แพ็กเกจ และ โปรโมชั่น</h3>
      <div className="d-flex flex-row">
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>

        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <hr className="border border-black " />
      <h3 className="text-black m-4 mt-1 mb-3">แพทย์แนะนำ</h3>
      <div className="d-flex flex-row">
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={TestPhoto}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="gradient-box rounded-top-3"
            style={{ width: "320px", height: "162px", padding: "10px" }}
          >
            <Card.Title
              className="text-white"
              style={{
                fontSize: "20px",
                marginBottom: "5px",
                marginTop: "0px",
              }}
            >
              แพ็กเกจ
            </Card.Title>
            <Card.Text
              className="text-white truncate-text"
              style={{
                width: "100%",
                fontSize: "15px",
                marginBottom: "10px",
              }}
            >
              รายละเอียด Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
      <hr className="border border-black " />
      <h3 className="text-black m-4 mt-1 mb-3">ข่าวสาร</h3>
      
      
      
      
      
      
      
      <div
        className="bg-navy m-auto mt-5 mb-5 d-flex justify-content-center align-items-center rounded-3"
        src={V2}     
        style={{ width: "1500px", height: "500px" }}
      >
        <div className="text-white"> พื้นที่สำหรับใส่รูป (1500 × 500)</div>
      </div>
    </>
  );
};
export default Home;
