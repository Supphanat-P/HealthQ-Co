import { Button, Card } from "react-bootstrap";
import Sample320x240 from "../../assets/Sample320x240.png";
import Sample1500x500 from "../../assets/Sample1500x500.png";
import React from "react";
import ButtonLink from "../../components/Shared/ButtonLink";
const Home = () => {
  return (
    <>
      <div className="d-flex flex-row gap-5">
        <div className="bg-softgray m-5 mt-5 mb-5 w-fit h-fit justify-content-center align-items-center rounded-3">
          <ButtonLink label="ค้นหาแพทย์" to="/doctorSearch" />
        </div>

        <div className="m-5 mt-5 mb-5 bg-black" style={{ width: "1500px" }}>
          {/* <img
            src={Sample1500x500}
            alt="1500x500"
            style={{ width: "750px", height: "500px" }}
          /> */}
        </div>
      </div>
      <hr className="border border-black m-auto" style={{ width: "97%" }} />
      <h3 className="text-black m-4 mt-1 mb-3">แพ็กเกจ และ โปรโมชั่น</h3>
      <div className="d-flex flex-row">
        <Card
          className="m-4 shadow"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top"
            src={Sample320x240}
            style={{ width: "320px", height: "240px" }}
          />
          <Card.Body
            className="bg-gradient-navy rounded-top-3"
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
      <hr className="border border-black m-auto" style={{ width: "97%" }} />
      <h3 className="text-black m-4 mt-1 mb-3">แพทย์แนะนำ</h3>
      <div className="d-flex flex-row"></div>
      <hr className="border border-black m-auto" style={{ width: "97%" }} />
      <h3 className="text-black m-4 mt-1 mb-3">ข่าวสาร</h3>
      <Card
        className="m-4 shadow"
        style={{ width: "fit-content", height: "fit-content" }}
      >
        <Card.Img
          className="top"
          src={Sample320x240}
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
          <div className="justify-content-between d-flex ">
            <Button className="border-0 bg-white text-navy">ซื้อเลย</Button>
            <Button className=" border-0 bg-none text-white">
              อ่านรายละเอียด
            </Button>
          </div>
        </Card.Body>
      </Card>
      <div
        className="bg-navy m-auto mt-5 mb-5 d-flex justify-content-center align-items-center rounded-3"
        src={Sample1500x500}
        style={{ width: "1500px", height: "500px" }}
      >
        <div className="text-white"> พื้นที่สำหรับใส่รูป (1500 × 500)</div>
      </div>
    </>
  );
};
export default Home;
