import React, { useEffect, useState } from "react";
import "./Stepper.css";

const steps = [
  { id: 1, label: "เริ่มต้น" },
  { id: 2, label: "นัดหมายแพทย์" },
  { id: 3, label: "ข้อมูลผู้ป่วย" },
  { id: 4, label: "เสร็จสิ้น" },
];

const Stepper = ({ Step }) => {
  const [animatedStep, setAnimatedStep] = useState(null);

  useEffect(() => {
    setAnimatedStep(Step);
    const t = setTimeout(() => setAnimatedStep(null), 600);
    return () => clearTimeout(t);
  }, [Step]);
  return (
    <div className="stepper-container">
      {steps.map((step, index) => {
        const isCompleted = step.id < Step;
        const isActive = step.id === Step;
        const isAnimating = step.id === animatedStep;

        return (
          <div
            key={step.id}
            className={`step-wrapper ${isAnimating ? "animating" : ""}`}
          >
            <div
              className={`step-circle ${isCompleted ? "completed" : ""} ${
                isActive ? "active" : ""
              } ${isAnimating ? "pulsing" : ""}`}
            >
              {step.id}
            </div>

            <div className={`step-label ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}`}>
              {step.label}
            </div>

            {index !== steps.length - 1 && (
              <div
                className={`step-line ${isCompleted ? "completed-line" : ""}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
