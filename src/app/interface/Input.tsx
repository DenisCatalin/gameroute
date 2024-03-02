import React from "react";

type Props = {
  placeholder: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ placeholder, name, type, onChange }: Props) => {
  return (
    <input
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      className="w-full h-full p-2 rounded-small bg-coverLight dark:bg-coverDark"
    />
  );
};

export default Input;
