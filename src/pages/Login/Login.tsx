import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { continueAsGuest, login } from "./authSlice";
import { RootState } from "../../redux/store";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.login.isAuthenticated
  );
  const isGuest = useSelector((state: RootState) => state.login.isGuest);

  const handleLogin = () => {
    dispatch(login({ username, password }));
  };

  const handleContinueAsGuest = () => {
    dispatch(continueAsGuest());
  };

  useEffect(() => {
    if (isAuthenticated || isGuest) {
      navigate("/");
    }
  }, [isAuthenticated, isGuest, navigate]);

  return (
    <div className="login-container">
      <h1>Login</h1>
      <label htmlFor="username">username</label>
      <input
        type="text"
        placeholder="Enter Username... For dev Username: admin"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="password"
        placeholder="Enter Password... For dev Password: admin"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="login-btn">
        <button onClick={() => handleLogin()} style={{ flex: 1 }}>
          Login as ADMIN
        </button>
        <button onClick={handleContinueAsGuest} style={{ flex: 1 }}>
          Continue as GUEST
        </button>
      </div>
      <div className="login-note">
        <h4>NOTE!</h4>
        <h5>for development only!</h5>
        <h5> Username: admin Password: admin</h5>
      </div>
    </div>
  );
};

export default Login;
