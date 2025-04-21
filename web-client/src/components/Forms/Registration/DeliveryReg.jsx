import React, { useState } from "react";
import ThemeLogo from "../../Logos/ThemeLogo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userAPI } from "../../../services";
import { useToast } from "../../../utils/alert-utils/ToastUtil";

function DeliveryReg() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    address: "",
    email: "",
    vehicle: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.telephone ||
      !formData.address ||
      !formData.email ||
      !formData.vehicle ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(userAPI.DeliveryRegister, {
        name: formData.name,
        telephone: formData.telephone,
        address: formData.address,
        email: formData.email,
        vehicleNumber: formData.vehicle,
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        toast.success("Registration successful");

        navigate("/for-delivery");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error("Username already exists");
      } else {
        toast.error("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
      <div className="card-body">
        <ThemeLogo style={"w-48 mx-auto"} />
        <div className="card-title text-lg mt-4">Become a Delivery Partner</div>
        <form
          onSubmit={handleSubmit}
          className="form-control flex flex-col gap-2"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="input"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="text"
            name="telephone"
            placeholder="Telephone"
            className="input"
            onChange={handleChange}
            value={formData.telephone}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="input"
            onChange={handleChange}
            value={formData.address}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="text"
            name="vehicle"
            placeholder="Vehicle No."
            className="input"
            onChange={handleChange}
            value={formData.vehicle}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="input"
            onChange={handleChange}
            value={formData.confirmPassword}
          />

          <div className="card-actions justify-end mt-3">
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <small>
            Already have an account?{" "}
            <Link
              to="/for-delivery"
              className="text-primary font-bold cursor-pointer"
            >
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}

export default DeliveryReg;
