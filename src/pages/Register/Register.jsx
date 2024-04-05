import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthenticate, useValidateInput } from "../../hooks";
import "./Register.css";

const GREY = '#5d5d5d';
const DARK_BLUE = '#161e5f';

function Register() {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const [iconColors, setIconColors] = useState({
    username: GREY,
    email: GREY,
    password: GREY,
    confirmPassword: GREY,
  });

  const { register } = useAuthenticate();

  const { validateEmail, validatePassword } = useValidateInput();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const validateUsername = () => {
    const isValid = username.length > 1
    setIsUsernameValid(isValid);
    return isValid;
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (isEmailValid) return;
    validateEmail(email, setIsEmailValid);
  }, [email]);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validateConfirmPassword = () => {
    const isValid = password === confirmPassword;
    setIsPasswordValid(isValid);
    return isValid;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!runValidationFunctions) return;
    register(username, email, password);
  };

  const runValidationFunctions = () => {
    const isValidUsername = validateUsername();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    if (!isValidUsername || !isValidEmail || !isValidPassword || !isValidConfirmPassword) {
      return false;
    }

    return true;
  }

  const changeIconColorsOnFocus = (e) => {
    setIconColors(prev => ({
      ...prev,
      [e.target.id]: DARK_BLUE,
    }))
  }
  
  const changeIconColorsOnBlur = (e) => {
    const color = e.target.validity.valid ? DARK_BLUE : GREY;

    setIconColors(prev => ({
      ...prev,
      [e.target.id]: color,
    }))
  }

  return (
    <div className="register">
      <div className="register__wrapper">
        <Link to="/" className="register__home-url">
          <box-icon name="arrow-back" size="16px" />
          Home
        </Link>

        <form className="register__form" onSubmit={handleRegister}>
          <div className="login__form--heading">
            <h2>Register Here</h2>
          </div>

          <div className={`register__input-wrapper ${!isUsernameValid && "invalid"}`}>
            <span>Username</span>
            <box-icon name='user-circle' color={iconColors.username} size="md" />
            <input
              id="username"
              type="text"
              onChange={handleUsername}
              value={username}
              autoComplete="off"
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>
          <div className={`register__input-wrapper ${!isEmailValid && "invalid"}`}>
            <span>Email</span>
            <box-icon name='envelope' color={iconColors.email} size="md" />
            <input
              id="email"
              type="email"
              onChange={handleEmail}
              value={email}
              autoComplete="off"
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>
          <div className={`register__input-wrapper ${!isPasswordValid && "invalid"}`}>
            <span>Password</span>
            <box-icon name='lock' color={iconColors.password} size="md" />
            <input
              id="password"
              type="password"
              onChange={handlePassword}
              value={password}
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>
          <div className={`register__input-wrapper ${!isConfirmPasswordValid && "invalid"}`}>
            <span>Confirm Password</span>
            <box-icon name='lock' color={iconColors.confirmPassword} size="md" />
            <input
              id="confirmPassword"
              type="password"
              onChange={handleConfirmPassword}
              value={confirmPassword}
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>

          <button
            className="btn register__btn"
            type="submit"
          >
            Register
          </button>
        </form>

        <div className="register__login-invite">
          <div>Already have an account?</div>
          <Link to="/login" className="link">Login</Link>
        </div>
      </div>

    </div>
  );
}

export default Register;