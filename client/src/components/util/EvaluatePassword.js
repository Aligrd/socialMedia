const doesContainNumber = (str) => {
  const numbers = [...Array(10).keys()];
  let doesHaveNumber = false;
  for (let i = 0; i < numbers.length; i++) {
    if (str.includes(String(numbers[i]))) {
      doesHaveNumber = true;
    }
  }
  return doesHaveNumber;
};

const doesContainSpecialCharacter = (str) => {
  return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
};
const doesHaveUpperCase = (str) => {
  return !(str.toLowerCase() === str);
};

const EvaluatePassword = (password) => {
  const isLength = password.length >= 8;

  const doesHaveNumber = password;
  // password need to contain number atelast 1
  // password need to cotnain special character atleat 1
  // password need to contain lowe case carachers atleat 1

  return {
    doesHaveUpperCase: doesHaveUpperCase(password),
    doesHaveNumber: doesContainNumber(password),
    doesHaveSpecialCharacter: doesContainSpecialCharacter(password),
    doesHaveEnoughLength: isLength,
  };
};

export default EvaluatePassword;
