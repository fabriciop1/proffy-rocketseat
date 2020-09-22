import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div className="select-block">
      <label htmlFor={props.name}>{props.label}</label>
      <select value="" id={props.name} {...props}>
        <option value="" disabled hidden>
          Selecione uma opção
        </option>
        {props.options.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
