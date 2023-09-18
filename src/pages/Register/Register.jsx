import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../hooks/useAutheticate";
import { useStateContext } from "../../StateContext";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = (e) => {
    e.preventDefault();
  };

  return(
    <form className="register" onSubmit={handleRegister}> 
      <h1>Welcome Back</h1>
      <input className="register__input" type="text" onChange={handleUsername} value={username} />
      <div>
        <span>Email</span>
        <input className="login__email" type="text" onChange={handleEmail} value={email} />
      </div>
      <div>
        <span>Password</span>
        <input className="login__password" type="password" onChange={handlePassword} value={password} />
      </div>
      <div>
        <span>Confirm Password</span>
        <input className="register__input" type="password" onChange={handleConfirmPassword} value={confirmPassword} />
      </div>
      
      <input className="register__btn" type="submit" name="Register" />
    </form>
  );
}

export default Register;