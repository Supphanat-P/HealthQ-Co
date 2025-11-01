import React from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import Sample320x240 from "../../assets/Sample250x250.png";
import { FaCartArrowDown } from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  return (
    <>
      <div className="col-sm col-md col-lg d-flex justify-content-center">
        <Card
          className="m-4 shadow card-hover"
          style={{ width: "fit-content", height: "fit-content" }}
        >
          <Card.Img
            className="top rounded-0"
            src={Sample320x240}
            style={{ width: "100%", height: "100%" }}
          />
          <Card.Body
            className="bg-gradient-navy rounded-bottom"
            style={{ width: "100%", padding: "10px", marginBottom: "0px" }}
          >
            <Card.Title
              className="text-white"
              style={{
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
              }}
            >
              รายละเอียด : Lorem Ipsum is simply dummy text of the printing and
              ...
            </Card.Text>
            <div className="justify-content-between d-flex">
              <Button className="border-0 bg-white text-navy d-flex align-items-center">
                <FaCartArrowDown className="me-2" />
                ซื้อเลย
              </Button>
              <Button className=" border-0 bg-none text-white">
                อ่านรายละเอียด
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export default PackageCard;
