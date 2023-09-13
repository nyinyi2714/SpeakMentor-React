import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      setIsEmailValid(false); 
    } else {
      setIsEmailValid(true);
    }
  };

  useEffect(() => {
    if(isEmailValid) return;
    validateEmail();
  }, [email]);

  const activateLabel = (e) => {
    e.target.previousSibling.classList.add("active");
  };

  const deactivateLabel = (e) => {
    if(e.target.value.length === 0) {
      e.target.previousSibling.classList.remove("active");
    }
    if(e.target.id === "email") validateEmail();
    else validatePassword();
  };  

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validatePassword = () => {
    setIsPasswordValid(password.length > 0);
  };

  useEffect(() => {
    if(isPasswordValid) return;
    validatePassword();
  }, [password]);

  const handleLogin = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    // TODO: sign in
  };

  return(
    <div className="login">
      <div className="login__left-side">
        <form className="login__form" onSubmit={handleLogin}> 
          <div className="login__form--heading">
            <h1>Hello!</h1>
            <h2>Log into your account</h2>
          </div>
          <div className={`login__input-wrapper ${!isEmailValid && "invalid"}`}>
            <span className="login__email">Email</span>
            <input id="email" className="login__input" type="text" onChange={handleEmail} value={email} onFocus={activateLabel} onBlur={deactivateLabel} autoComplete="off" />
          </div>
          <div className={`login__input-wrapper ${!isPasswordValid && "invalid"}`}>
            <span className="login__password">Password</span>
            <input className="login__input" type="password" onChange={handlePassword} value={password} onFocus={activateLabel} onBlur={deactivateLabel} />
          </div>
          <button type="submit" className="btn login__btn">Login</button>
        </form>
        <div>Don't have an account? Register <Link to="/register" className="link">Here</Link></div>
      </div>

      <div className="login__image">
        Welcome
      </div>
    </div>
  );
}

export default Login;