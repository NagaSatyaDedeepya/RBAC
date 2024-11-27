import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/login", formData);
      setMessage(`Login successful. Token: ${response.data.token}`);
    } catch (error) {
      setMessage(error.response?.data?.error || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="Email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="Password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default LoginForm;
