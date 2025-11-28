import { useTranslation } from "react-i18next";

const AppointmentHeader = ({ label }) => {
  const { t } = useTranslation();

  return (
    <div className="w-fit mx-auto mt-5 mb-4">
      <h1 className="text-navy text-center font-bold mb-2">
        {label ? label : t("appointmentTitle", "ทำนัดหมายแพทย์")}
      </h1>
      
      <div
        className="w-full rounded-full" 
        style={{
          height: "4px",
          backgroundImage:
            "linear-gradient(to right, #002D73, #386FAA, #8DD3FF, #8DD3FF)",
        }}
      />
    </div>
  );
};

export default AppointmentHeader;