import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthenticate from "../../hooks/useAutheticate";
import useValidateInput from "../../hooks/useValidateInput";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

  const navigate = useNavigate();

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
    if(isEmailValid) return;
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

  const activateLabel = (e) => {
    if(e.target.tagName === "SPAN") {
      e.target.classList.add("active");
      e.target.nextSibling.focus();
    } else {
      e.target.previousSibling.classList.add("active");
    }
  };

  const deactivateLabel = (e) => {
    if(e.target.value.length === 0) {
      e.target.previousSibling.classList.remove("active");
    }

    switch(e.target.id) {
      case "username":
        validateUsername(username, setIsUsernameValid);
      case "email":
        validateEmail(email, setIsEmailValid);
        break;
      case "password":
        validatePassword(password, setIsPasswordValid);
        break;
      case "confirm-password":
        validateConfirmPassword(confirmPassword, setIsConfirmPasswordValid);
        break;
    }
  };  

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return(
    <div className="register"> 
      <div className="register__left-side">
        <Link to="/" className="register__home-url">
          <box-icon name="arrow-back" size="16px" color="#5d5d5d" />
          Home
        </Link>
        
        <form className="register__form" onSubmit={handleRegister}>
          <h1>Create an account</h1>
          <div className={`register__input-wrapper ${!isUsernameValid && "invalid"}`}>
            <span className="register__username" onClick={activateLabel}>Username</span>
            <input 
              id="username" 
              type="text" 
              onChange={handleUsername} 
              value={username}
              onFocus={activateLabel}
              onBlur={deactivateLabel} 
              autoComplete="off" 
            />
          </div>
          <div className={`register__input-wrapper ${!isEmailValid && "invalid"}`}>
            <span className="register__email" onClick={activateLabel}>Email</span>
            <input 
              id="email" 
              type="text" 
              onChange={handleEmail} 
              value={email}
              onFocus={activateLabel}
              onBlur={deactivateLabel} 
              autoComplete="off" 
            />
          </div>
          <div className={`register__input-wrapper ${!isPasswordValid && "invalid"}`}>
            <span className="register__password" onClick={activateLabel}>Password</span>
            <input 
              id="password" 
              type="password" 
              onChange={handlePassword} 
              value={password} 
              onFocus={activateLabel}
              onBlur={deactivateLabel}
            />
          </div>
          <div className={`register__input-wrapper ${!isConfirmPasswordValid && "invalid"}`}>
            <span className="register__confirm-password" onClick={activateLabel}>Confirm Password</span>
            <input 
              id="confirm-password" 
              type="password" 
              onChange={handleConfirmPassword} 
              value={confirmPassword}
              onFocus={activateLabel}
              onBlur={deactivateLabel} 
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
      
      <div className="register__image"></div>

    </div>
  );
}

export default Register;