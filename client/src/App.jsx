import { useState } from "react";
import { login, register } from "./services";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [loginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });
  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await register(formData);
    if (res.status === 200) {
      alert("Registration Successfull");
    } else {
      console.log(res);
      alert("Registration Failed");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.status === 200) {
      alert("Login Successfull");
    } else {
      console.log(res);
      alert("Login Failed");
    }
  };
  return (
    <>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.name}
          name="name"
          placeholder="enter name"
        />
        <input
          type="text"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.mobile}
          name="mobile"
          placeholder="enter  phone"
        />
        <input
          type="email"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.email}
          name="email"
          placeholder="enter email"
        />
        <input
          type="password"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          value={formData.password}
          name="password"
          placeholder="enter password"
        />
        <button type="submit">Submit</button>
      </form>
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

export default App;
