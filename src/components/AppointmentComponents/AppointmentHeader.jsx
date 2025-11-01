const AppointmentHeader = () => {
  return (
    <div className="text-center justify-center  align-items-center mb-2 pb-4 mt-5">
      <h1 className="m-auto text-navy">ทำนัดหมายแพทย์</h1>
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
  );
};
export default AppointmentHeader;
