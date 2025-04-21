import React, {useState} from 'react'
import ThemeLogo from '../../Logos/ThemeLogo';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { userAPI } from '../../../services';
import { useToast } from '../../../utils/alert-utils/ToastUtil';


function RestaurantReg() {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerName: "",
    ownerContactNo: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.ownerName ||
      !formData.ownerContactNo ||
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
      const response = await axios.post(userAPI.RestaurantRegister, {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        ownerName: formData.ownerName,
        ownerContactNo: formData.ownerContactNo,
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        console.log("Sign up successful", response.data);
        toast.success("Sign up successful");
        navigate("/for-restaurant");
      }
    } catch (error) {
      console.error("Error signing up:", error);
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
          <div className="card-title text-lg mt-4">Register Your Restaurant</div>
          <form
            onSubmit={handleSubmit}
            className="form-control flex flex-col gap-2"
          >
            <input
              type="text"
              name="name" 
              placeholder="Name"
              className="input"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email" 
              placeholder="Email"
              className="input"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address" 
              placeholder="Address"
              className="input"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ownerName" 
              placeholder="Owner Name"
              className="input"
              value={formData.ownerName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ownerContactNo" 
              placeholder="Owner Contact No"
              className="input"
              value={formData.ownerContactNo}
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="password" 
              name="password"  
              placeholder="Password"
              className="input"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              value={formData.confirmPassword}
              onChange={handleChange}
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
                to="/for-restaurant"
                className="text-primary font-bold cursor-pointer"
              >
                Login
              </Link>
            </small>
          </div>
        </div>
      </div>
  )
}

export default RestaurantReg