import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAutheticate";
import { useStateContext } from "../../StateContext";
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

  const { user } = useStateContext();
  const navigate = useNavigate();

  // Redirect to homepage if already logged in
  useEffect(() => {
    if(user) {
      navigate("/");
      return;
    }
  }, []);

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

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    return isValid;
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validatePassword = () => {
    const isValid = password.length > 0;
    setIsPasswordValid(isValid);
    return isValid;
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
  };

  return(
    <div className="register"> 
      <h1>Create an account</h1>
      <form className="register__form" onSubmit={handleRegister}>
        <div className={`register__input-wrapper ${!isUsernameValid && "invalid"}`}>
          <span className="register__username active">Username</span>
          <input type="text" onChange={handleUsername} value={username} />
        </div>
        <div className={`register__input-wrapper ${!isEmailValid && "invalid"}`}>
          <span className="register__email">Email</span>
          <input type="text" onChange={handleEmail} value={email} />
        </div>
        <div className={`register__input-wrapper ${!isPasswordValid && "invalid"}`}>
          <span className="register__password">Password</span>
          <input type="password" onChange={handlePassword} value={password} />
        </div>
        <div className={`register__input-wrapper ${!isConfirmPasswordValid && "invalid"}`}>
          <span className="register__confirm-password">Confirm Password</span>
          <input type="password" onChange={handleConfirmPassword} value={confirmPassword} />
        </div>
        
        <button 
          className="btn register__btn" 
          type="submit" 
        >
          Register
        </button>
      </form>
      
    </div>
  );
}

export default Register;