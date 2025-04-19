import React from 'react'
import { ThemeButton, ThemeLogo } from '../components'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Logic to handle login
    navigate('/admin-panel/');
  }

  return (
    <div className="login min-h-screen flex items-center justify-center">
      <div className="absolute top-0 right-0 p-4">
        <ThemeButton />
      </div>

      <div className="card card-xl bg-base-300 shadow-sm w-full max-w-sm mx-auto">
        <div className="card-body">
          <ThemeLogo style={"w-48 mx-auto"} />
          <div className="text-xl mt-4 text-center font-bold mb-4">Admin Panel</div>
          <form
            className="form-control flex flex-col gap-2"
          >
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
            <div className="card-actions justify-end mt-3">
              <button onClick={handleLogin} type="button" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login