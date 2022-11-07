import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;

  label {
    font-size: 12px;
    color: gray;
  }

  span {
    font-size: 12px;
    padding: 3px;
    color: red;
    display: none;
  }
`;

const Input = styled.input.attrs({})`
  padding: 15px;
  margin: 10px 0px;
  border-radius: 5px;
  border: 1px solid gray;

  // invalid && data-focused='true'
  :invalid[data-focused="true"] {
    border: 1px solid red;
  }

  :invalid[data-focused="true"] ~ span {
    display: block;
  }
`;

export default function FormInput({ errorMessage, handleOnChange, ...input }) {
  const [focused, setFocused] = useState(false);
  return (
    <InputContainer>
      <label htmlFor={input.name}>{input.label}</label>
      <Input
        {...input}
        onChange={handleOnChange}
        onBlur={() => setFocused(true)}
        onFocus={() => input.name === "confirmPassword" && setFocused(true)}
        data-focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </InputContainer>
  );
}
