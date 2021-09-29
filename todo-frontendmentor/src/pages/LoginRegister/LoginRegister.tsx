import { EyeIcon, ClosedEyeIcon } from "assets/Icons";
import React from "react";
import styled, { css } from "styled-components";
import { PasswordStrenth } from "./PasswordStrenth";

import { useLoginRegister } from "./useLoginRegister";

const AuthFormContainer = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  padding: 30px 25px;
  border-radius: 5px;

  background: ${({ theme }) => theme.backgroundList};
  -webkit-box-shadow: ${({ theme }) => theme.boxShadow};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

const InputContainer = styled.label`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0;
`;

const Label = styled.span`
  transform: translateY(-30px);
  height: 1.4rem;
  line-height: 1.4rem;
  font-size: 3.3rem;
  letter-spacing: 0.8px;
  cursor: text;
  transition: all 0.2s;
  color: ${({ theme }) => theme.fontColor};

  input:focus + &,
  input:not(:placeholder-shown) + & {
    transform: translateY(-63px);
    font-size: 1.2rem;
    background: -webkit-linear-gradient(#57ddff, #c058f3);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Input = styled.input`
  height: 50px;
  line-height: 40px;
  font-size: 3.3rem;
  letter-spacing: 0.8px;

  font-weight: 400;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.fontColor};

  outline: none;
`;

const BorderLine = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  transform: translateY(-10px);

  background: ${({ theme }) => theme.border};

  input:focus ~ &,
  input:not(:placeholder-shown) ~ & {
    background: linear-gradient(#57ddff, #c058f3);
  }
`;

const Button = styled.button`
  height: 35px;
  border: none;
  border-radius: 5px;
  color: white;
  background: linear-gradient(#57ddff, #c058f3);
  cursor: pointer;

  &:hover {
    background: linear-gradient(#68eeff, #d169f5);
  }
`;

const ButtonContainer = styled.div`
  padding: 0;
  margin: 0;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  button {
    max-width: 30%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #4e77c6;
    text-align: left;
  }

  button:hover {
    text-decoration: underline;
  }
`;

const CommonIcon = css`
  stroke: ${({ theme }) => theme.fontColor};
  fill: ${({ theme }) => theme.fontColor};

  &:hover {
    stroke: #4e77c6;
    fill: #4e77c6;
  }
`;

const ClosedEye = styled(ClosedEyeIcon)`
  ${CommonIcon}
`;

const Eye = styled(EyeIcon)`
  ${CommonIcon}
`;

const MAX_PASSWORD_LENGTH = 10;

export const LoginRegister: React.FC = () => {
  const {
    isSignIn,
    credentials: { email, password },
    error: { emailError, passwordError },
    handleSignInUp,
    handleForgot,
    switchMode,
    handleChange,
  } = useLoginRegister();

  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <AuthFormContainer>
      <InputContainer>
        <Input
          type="text"
          placeholder=" "
          value={email}
          onChange={handleChange("email")}
        />
        <Label>Email</Label>
        <BorderLine />
        {emailError && (
          <span style={{ marginTop: -10, color: "red" }}>{emailError}</span>
        )}
      </InputContainer>
      <InputContainer>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder=" "
          maxLength={MAX_PASSWORD_LENGTH}
          value={password}
          onChange={handleChange("password")}
        />
        <Label>Password</Label>
        <BorderLine />
        {((!isSignIn && !!password.length) || !!passwordError) && (
          <PasswordStrenth password={password} showError={!!passwordError} />
        )}
        <button
          onClick={() => setShowPassword((prev) => !prev)}
          style={{
            position: "absolute",
            right: 10,
            top: 17,
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? <Eye /> : <ClosedEye />}
        </button>
      </InputContainer>
      <Button onClick={handleSignInUp}>
        {isSignIn ? "Sign in" : "Sign up"}
      </Button>
      <ButtonContainer>
        <button onClick={switchMode}>
          {isSignIn
            ? "Don't have account yet? Create here"
            : "Already have an account? Sign in"}
        </button>
        {isSignIn && <button onClick={handleForgot}>Forgot Password</button>}
      </ButtonContainer>
    </AuthFormContainer>
  );
};
