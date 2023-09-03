import React, { useRef } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import api from "../API/api"
export default function Login() {
  const loginButton = useRef()
  const email = useRef()
  const password = useRef()
  const Login = () => {
    loginButton.current.disabled = true
    axios
      .post(api.getAccountWithEmailAndPassword, {
        email: email.current.value,
        password: password.current.value,
      },{
        headers: {
            withCredentials: true
        }
      })
      .then((res) => {
        if (res.data === null) {
          alert("Failed to login, please try again")
          loginButton.current.disabled = false
          return
        }
        alert("Login success!!")
        sessionStorage.setItem("AccountID", res.data._id)
        window.location.reload()
      })
  }
  return (
    <form
      onSubmit={Login}
      className="Login w-50 m-auto center"
      style={{ height: "100vh" }}>
      <div className="row m-0 p-0">
        <div className="col-12 row m-0 mb-4 p-0">
          <b className="col m-auto center" style={{ fontSize: "30px" }}>
            SiriBlogger
          </b>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <input
            required
            ref={email}
            className="form-control col-8 m-auto mb-2"
            type="text"
            placeholder="Email"
          />
          <input
            required
            ref={password}
            className="form-control col-8 m-auto mb-2"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <button
            ref={loginButton}
            onClick={Login}
            className="btn btn-success col-12 m-auto font-weight-bold">
            Login
          </button>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <Link
            to="/forgot-password"
            className="text-primary col-6 m-auto"
            style={{ textAlign: "left" }}>
            Forgot Password
          </Link>
          <Link
            to="/signin"
            className="col-6 m-auto text-primary"
            style={{ textAlign: "right" }}>
            Don't have any accounts? Signin a new one here!!
          </Link>
        </div>
      </div>
    </form>
  )
}
