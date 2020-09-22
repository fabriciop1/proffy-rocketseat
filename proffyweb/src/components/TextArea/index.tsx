import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return (
    <div className="textarea-block">
      <label htmlFor={props.name}>{props.label}</label>
      <textarea id={props.name} {...props}/>
    </div>
  );
}

export default TextArea;