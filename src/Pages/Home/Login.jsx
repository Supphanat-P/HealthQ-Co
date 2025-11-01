const Login = () => {
  return (
    <>
      <div
        className="bg-navy m-auto mt-5 mb-5 d-flex justify-content-center align-items-center rounded-3"
        style={{ width: "500px", height: "120px" }}
      >
        <h1 className="text-white text-center ">เข้าสู่ระบบ</h1>
      </div>
      <div
        className="m-auto d-flex justify-content-center align-items-center flex-column "
        style={{ width: "500px", height: "120px" }}
      >
        <input
          className="mb-3 rounded-3 shadow"
          style={{
            width: "392px",
            height: "72px",
            fontWeight: '200',
            padding: "8px",
            fontSize: "30px",
            border: '2px solid black'
          }}
          type="email"
          placeholder="อีเมล"
        />
        <input className="mb-3 rounded-3 shadow"
          style={{
            width: "392px",
            height: "72px",
            fontWeight: '200',
            padding: "8px",
            fontSize: "30px",
            border: '2px solid black'
          }} type="password" placeholder="รหัสผ่าน" />
      </div>
      <div>
        <button className="btn hover-primary bg-navy m-auto mt-5 mb-5 d-flex justify-content-center align-items-center shadow">
          <p className="fs-4 text-white mb-0">เข้าสู่ระบบ</p>
        </button>
        <button className="btn  hover-secondary bg-white m-auto mt-5 mb-5 d-flex justify-content-center align-items-center shadow">
          <p className="fs-4 text-navy mb-0">สมัครสมาชิก</p>
        </button>
      </div>
    </>
  );
};
export default Login;
