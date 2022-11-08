import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

import FormInput from "../component/FormInput";
import { PORT } from "../constant/WEB_API";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  border: 1px solid lightgray;
`;

const LoginFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 24px;

  border: 1px solid lightgray;
  border-radius: 12px;
`;

const LoginTitle = styled.div`
  font-size: 50px;
  font-weight: bold;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    font-size: 20px;
    margin-top: 20px;
  }

  input {
    font-size: 16px;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 12px;
    margin-top: 12px;
    :focus {
      outline: none;
    }
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: ${({ active }) =>
    active ? "rgb(253, 179, 179)" : "lightcoral"};
  color: white;
  margin-top: 20px;
  font-size: 16px;

  border: none;
  border-radius: 8px;
  padding: 12px 32px;
  cursor: ${(props) => (props.active ? "not-allowed" : "pointer")};
`;

export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 6-20 characters and include at least 1 letter, 1 number ",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{6,20}$`,
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post(`${PORT}/auth/register`, values)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Wrapper>
      <LoginFormContainer>
        <LoginForm onSubmit={handleLogin}>
          <LoginTitle>Register</LoginTitle>
          {inputs.map((input) => (
            <FormInput
              key={input.name}
              {...input}
              value={values[input.name]}
              handleOnChange={handleOnChange}
            />
          ))}
          <SubmitButton>sign up</SubmitButton>
        </LoginForm>
      </LoginFormContainer>
    </Wrapper>
  );
}
