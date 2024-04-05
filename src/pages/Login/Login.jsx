import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthenticate, useValidateInput } from "../../hooks";
import "./Login.css";

const GREY = '#5d5d5d';
const DARK_BLUE = '#161e5f';

function Login() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [iconColors, setIconColors] = useState({
    email: GREY,
    password: GREY,
  });

  const { login } = useAuthenticate();
  const { validateEmail, validatePassword } = useValidateInput();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

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

  useEffect(() => {
    if(isEmailValid) return;
    validateEmail(email, setIsEmailValid);
  }, [email]);

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
      <div className="login__wrapper">
      <Link to="/" className="login__home-url">
        <box-icon name="arrow-back" size="16px" />
        <span>Home</span>
      </Link>

        <form className="login__form" onSubmit={handleLogin} id="login"> 
          <div className="login__form--heading">
            <h2>Welcome Back!</h2>
          </div>
          <div 
            className={`login__input-wrapper ${!isEmailValid && "invalid"}`}
          >
            <span className="login__email">Email</span>
            <box-icon name='envelope' color={iconColors.email} size="md" />
            <input 
              id="email" 
              className="login__input" 
              type="email" 
              onChange={handleEmail} 
              value={email} 
              autoComplete="off" 
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>
          <div 
            className={`login__input-wrapper ${!isPasswordValid && "invalid"}`}
          >
            <span className="login__password">Password</span>
            <box-icon name='lock' color={iconColors.password} size="md" />
            <input 
              className="login__input" 
              type="password" 
              onChange={handlePassword} 
              value={password} 
              id="password"
              required
              onFocus={changeIconColorsOnFocus}
              onBlur={changeIconColorsOnBlur}
            />
          </div>
          <button 
            type="submit" 
            onClick={handleLogin} 
            className="login__btn"
          >
            Login
          </button>
        </form>

        <div className="login__register-invite">
          <div>Don't have an account?</div>
          <Link to="/register" className="link">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;