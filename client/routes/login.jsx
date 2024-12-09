import { useState } from "react";
import { login } from "../services";
import { useNavigate } from "react-router-dom";
import "../src/App.css";

function Login() {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    alert("You are already logged in");
    navigate("/home");
  }
  const [loginformData, setLoginformData] = useState({
    mobile: "",
    password: "",
  });
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.status === 200) {
      localStorage.setItem("token", res.token);
      alert("Login Successfull");
      navigate("/home");
    } else {
      console.log(res);
      alert("Login Failed");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          onChange={(e) =>
            setLoginformData({
              ...loginformData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginformData.email}
          name="email"
          placeholder="enter email"
        />
        <input
          type="password"
          onChange={(e) =>
            setLoginformData({
              ...loginformData,
              [e.target.name]: e.target.value,
            })
          }
          value={loginformData.password}
          name="password"
          placeholder="enter  password"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Login;
