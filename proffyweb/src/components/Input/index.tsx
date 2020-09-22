import React, { InputHTMLAttributes} from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className="input-block">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" id={props.name} {...props}/>
    </div>
  );
}

export default Input;