import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    MobileNo: "",
    Address: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/user/registeruser", formData);
      setMessage(response.data);

      // Redirect to the login page after successful registration
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="FirstName" placeholder="First Name" onChange={handleChange} />
      <input name="LastName" placeholder="Last Name" onChange={handleChange} />
      <input name="Email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="Password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="MobileNo" placeholder="Mobile Number" onChange={handleChange} />
      <input name="Address" placeholder="Address" onChange={handleChange} />
      <button type="submit">Register</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
