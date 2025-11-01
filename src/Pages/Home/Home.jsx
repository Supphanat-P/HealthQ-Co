const Home = () => {
  return (
    <>
      <div className="d-flex flex-row">
        <div className="d-flex flex-column">
            <button
              className="btn hover-primary bg-navy m-5 mt-5 mb-5 d-grid gap-2 container shadow"
              style={{ width: "225px", height: "100px" }}
            >
              <h3 className="text-white text-center mt-4">ค้นหาแพทย์</h3>
            </button>
        </div>

        <div className="bg-navy">
          <div className="">📷 พื้นที่สำหรับใส่รูป (1500 × 500)</div>
        </div>
      </div>
    </>
  );
};
export default Home;
