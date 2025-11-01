import React from "react";
import { Form } from "react-bootstrap";

const RadioChoice = ({
  label,
  name,
  value,
  onChange,
  options = [
    { id: "-1", value: "self", label: ` ${label}เอง` },
    { id: "-2", value: "auto", label: "ระบบเลือกให้โดยอัตโนมัติ" },
  ],
  selectedValue = null,
  onOptionClick = () => {},
}) => {
  return (
    <div>
      <p className="text-gray fw-bold">{label}</p>
      <Form
        className="d-flex flex-row gap-5 pb-4"
        role="radiogroup"
        aria-label={label}
      >
        {options.map((opt, idx) => {
          const id = `${name}-${idx}`;
          const isChecked = value === opt.value;
          return (
            <Form.Group
              className="radio-btn"
              key={opt.value + idx}
              role="radio"
              aria-checked={isChecked}
              tabIndex={0}
              onClick={() => {
                onOptionClick(opt.value);
                if (!isChecked) onChange(opt.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOptionClick(opt.value);
                  if (!isChecked) onChange(opt.value);
                }
              }}
            >
              <Form.Check.Input
                type="radio"
                id={id}
                name={name}
                value={opt.value}
                checked={isChecked}
                onChange={(e) => onChange(e.target.value)}
                style={{ width: "24px", height: "24px" }}
              />
              <Form.Check.Label htmlFor={id} className="text-gray">
                {opt.label}
              </Form.Check.Label>
            </Form.Group>
          );
        })}
      </Form>
      <p className="text-primary fw-bold">
        {selectedValue ? `คุณเลือก : ${selectedValue}` : ""}
      </p>
    </div>
  );
};

export default RadioChoice;
