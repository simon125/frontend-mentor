import { usePasswordStrengh } from "hooks/usePasswordStrengh";
import { useState } from "react";

function validateEmailWithRegexp(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const useLoginRegister = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const {
    hasAtLeast6Chars,
    atLeastOneUpperCase,
    atLeastOneSpecialChar,
  } = usePasswordStrengh(credentials.password);

  const handleSignInUp = () => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }
  };

  const validateEmail = () => {
    const emailIsValid = validateEmailWithRegexp(credentials.email);
    if (!emailIsValid) {
      setEmailError("Emails has not valid format");
      return emailIsValid;
    }

    if (emailError) {
      setEmailError(null);
    }

    return emailIsValid;
  };

  const validatePassword = () => {
    const isValid =
      hasAtLeast6Chars && atLeastOneUpperCase && atLeastOneSpecialChar;

    if (!isValid) {
      setPasswordError("true");
    }

    return isValid;
  };

  const handleForgot = () => {
    // handleForgot();
  };

  const switchMode = () => {
    setIsSignIn((prev) => !prev);
  };

  const handleChange = (key: keyof typeof credentials) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (emailError || passwordError) {
      setPasswordError(null);
      setEmailError(null);
    }
    const val = e.target.value.split(" ").join("");
    setCredentials((prev) => ({ ...prev, [key]: val }));
  };

  return {
    isSignIn,
    credentials,
    error: { passwordError, emailError },
    handleSignInUp,
    handleForgot,
    switchMode,
    handleChange,
  };
};
