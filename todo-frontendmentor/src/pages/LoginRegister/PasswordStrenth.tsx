import React from "react";
import styled from "styled-components";

import { CheckedIcon, UncheckedIcon } from "assets/Icons";
import { usePasswordStrengh } from "hooks/usePasswordStrengh";

const UnorderList = styled.ul`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 460px) {
    flex-direction: row;
    align-items: center;
  }
`;

const LineItem = styled.li<{ isValid: boolean; showError: boolean }>`
  color: ${({ isValid, theme, showError }) =>
    isValid ? "lightgreen" : showError ? "red" : theme.fontColor};
  display: flex;
  align-items: center;
  margin-right: 7px;
`;

const StyledUncheckedIcon = styled(UncheckedIcon)`
  stroke: ${({ theme }) => theme.fontColor};
  fill: ${({ theme }) => theme.fontColor};
`;

const CheckIconIndicator: React.FC<{
  isValid: boolean;
  showError: boolean;
}> = ({ isValid, showError }) => {
  const style = showError ? { stroke: "red", fill: "red" } : {};
  return isValid ? (
    <CheckedIcon style={{ fill: "lightgreen", stroke: "lightgreen" }} />
  ) : (
    <StyledUncheckedIcon style={style} />
  );
};

export const PasswordStrenth: React.FC<{
  password: string;
  showError: boolean;
}> = ({ password, showError }) => {
  const {
    hasAtLeast6Chars,
    atLeastOneUpperCase,
    atLeastOneSpecialChar,
  } = usePasswordStrengh(password);

  return (
    <UnorderList>
      <LineItem showError={showError} isValid={hasAtLeast6Chars}>
        <CheckIconIndicator showError={showError} isValid={hasAtLeast6Chars} />6
        chars
      </LineItem>
      <LineItem showError={showError} isValid={atLeastOneUpperCase}>
        <CheckIconIndicator
          showError={showError}
          isValid={atLeastOneUpperCase}
        />
        1 uppercase letter
      </LineItem>
      <LineItem showError={showError} isValid={atLeastOneSpecialChar}>
        <CheckIconIndicator
          showError={showError}
          isValid={atLeastOneSpecialChar}
        />
        1 symbol
      </LineItem>
    </UnorderList>
  );
};
