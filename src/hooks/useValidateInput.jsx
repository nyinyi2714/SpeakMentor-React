function validateInput() {

  const validateEmail = (email, setIsEmailValid) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const validatePassword = (password, setIsPasswordValid) => {
    const isValid = password.length > 0;
    setIsPasswordValid(isValid);
    return isValid;
  };

  return({
    validateEmail,
    validatePassword,
  });
}

export default validateInput;