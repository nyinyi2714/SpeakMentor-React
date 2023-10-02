import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuthenticate from "../../hooks/useAutheticate";
import useValidateInput from "../../hooks/useValidateInput";
import Boxicons from "boxicons";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const { login } = useAuthenticate();
  const { validateEmail, validatePassword } = useValidateInput();
  const navigate = useNavigate();


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if(isEmailValid) return;
    validateEmail(email, setIsEmailValid);
  }, [email]);

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
    if(e.target.id === "email") validateEmail(email, setIsEmailValid);
    else validatePassword(password, setIsPasswordValid);
  };  

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if(isPasswordValid) return;
    validatePassword(password, setIsPasswordValid);
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();
    if(validateEmail(email, setIsEmailValid) 
    || validatePassword(password, setIsPasswordValid)) {
      login(email, password);
    }
  };

  return(
    <div className="login">
      <div className="login__left-side">
      <Link to="/" className="login__home-url">
        <box-icon name="arrow-back" size="16px" color="#5d5d5d" />
        <span>Home</span>
      </Link>

        <form className="login__form" onSubmit={handleLogin}> 
          <div className="login__form--heading">
            <h1>Hello!</h1>
            <h2>Log into your account</h2>
          </div>
          <div 
            className={`login__input-wrapper ${!isEmailValid && "invalid"}`}
          >
            <span className="login__email" onClick={activateLabel}>Email</span>
            <input 
              id="email" 
              className="login__input" 
              type="text" 
              onChange={handleEmail} 
              value={email} 
              onFocus={activateLabel} 
              onBlur={deactivateLabel} 
              autoComplete="off" 
            />
          </div>
          <div 
            className={`login__input-wrapper ${!isPasswordValid && "invalid"}`}
          >
            <span className="login__password" onClick={activateLabel}>Password</span>
            <input 
              className="login__input" 
              type="password" 
              onChange={handlePassword} 
              value={password} 
              onFocus={activateLabel} 
              onBlur={deactivateLabel} 
            />
          </div>
          <button 
            type="submit" 
            onClick={handleLogin} 
            className="btn login__btn"
          >
            Login
          </button>
        </form>

        <div className="login__register-invite">
          <div>Don't have an account?</div>
          <Link to="/register" className="link">Register</Link>
        </div>
      </div>

      <div className="login__image">
      </div>
    </div>
  );
}

export default Login;