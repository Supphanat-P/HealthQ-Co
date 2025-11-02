import React from "react";
import { Card, Button } from "react-bootstrap";
import Sample320x240 from "../../assets/Sample250x250.png";
import { FaCartArrowDown } from "react-icons/fa";

const PackageCard = ({ packageData }) => {
  const name = packageData?.package_name || "แพ็กเกจ";
  const price = packageData?.price ? `${packageData.price} ฿` : null;
  const desc =
    packageData?.Description ||
    "รายละเอียด : Lorem Ipsum is simply dummy text...";

  return (
    <Card
      className="m-2 shadow card-hover"
      style={{
        width: "fit-content",
        height: "fit-content",
        minHeight: "445px",
      }}
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
          แพ็กเกจ <br />
          {name}
        </Card.Title>
        <Card.Text
          className="text-white"
          style={{
            width: "100%",
            fontSize: "15px",
          }}
        >
          <p className="text-white truncate-text">
            รายละเอียด : <br /> {desc}
          </p>

          {price && <p className="text-end">ราคา ({price})</p>}
        </Card.Text>
        <div className="justify-content-between d-flex">
          <Button className=" border-0 bg-none text-white">
            อ่านรายละเอียด
          </Button>
          <Button className="border-0 bg-white text-navy d-flex align-items-center">
            <FaCartArrowDown className="me-2" />
            ซื้อเลย
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;
