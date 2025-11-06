import AppointmentHeader from "../../../components/AppointmentComponents/AppointmentHeader";
const Login = () => {
  const Login = () => {
    sessionStorage.setItem("login", "true");
    window.location.href = "/";
  };
  return (
    <>
      <div className="card h-fit w-fit m-auto shadow mt-5">
        <AppointmentHeader label="เข้าสู่ระบบ" />
        <div
          className="m-auto d-flex justify-content-center align-items-center flex-column mt-2 "
          style={{ width: "500px", height: "120px" }}
        >
          <input
            type="email"
            className="form-control doctor-filter-input w-50 mb-3"
            placeholder="Email หรือ เบอร์โทรศัพท์"
          />
          <input
            type="password"
            className="form-control doctor-filter-input w-50"
            placeholder="รหัสผ่าน"
          />
        </div>
        <div className="m-auto align-content-center text-center mb-5">
          <button
            className="btn bg-navy m-auto mb-2 d-flex justify-content-center align-items-center shadow"
            style={{ width: "100%" }}
          >
            <p className="text-white mb-0" onClick={() => Login()}>
              เข้าสู่ระบบ
            </p>
          </button>
          <button className="btn bg-white m-auto mb-3 d-flex justify-content-center align-items-center shadow">
            <p className="text-navy mb-0">สมัครสมาชิก</p>
          </button>
          <a className="m-auto mt-5" href="">
            ลืมรหัสผ่าน
          </a>
        </div>
      </div>
    </>
  );
};
export default Login;
