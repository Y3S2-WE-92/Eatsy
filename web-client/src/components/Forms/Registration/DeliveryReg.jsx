import React from 'react'
import ThemeLogo from '../../Logos/ThemeLogo';
import { Link } from "react-router-dom";

function DeliveryReg() {
  return (
    <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
        <div className="card-body">
        <ThemeLogo style={"w-48 mx-auto"} />
          <div className="card-title text-lg mt-4">Become a Delivery Partner</div>
          <form
            className="form-control flex flex-col gap-2"
          >
            <input
              type="text"
              name="name" 
              placeholder="Name"
              className="input"
            />
            <input
              type="email"
              name="email" 
              placeholder="Email"
              className="input"
            />
            <input
              type="phone"
              name="phone"
              placeholder="Phone"
              className="input"
            />
            <input
              type="text"
              name="vehicle"
              placeholder="Vehicle No."
              className="input"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="input"
            />
            <input
              type="password" 
              name="password"  
              placeholder="Password"
              className="input"
            />
            <input
              type="password" 
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
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
                to="/auth/login"
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

export default DeliveryReg