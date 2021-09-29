const regUpper = new RegExp("(?=.*[A-Z])");
const specialChar = new RegExp("(?=.*[!@#$%^&*])");

export const usePasswordStrengh = (password: string) => {
  const hasAtLeast6Chars = password.length >= 6;
  const atLeastOneUpperCase = regUpper.test(password);

  const atLeastOneSpecialChar = specialChar.test(password);

  return { hasAtLeast6Chars, atLeastOneUpperCase, atLeastOneSpecialChar };
};
