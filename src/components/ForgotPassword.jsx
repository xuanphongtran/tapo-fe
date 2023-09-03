import React, { useRef } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import api from "../API/api"
export default function Login() {
  const navigate = useNavigate()
  const email = useRef()
  const forgotPasswordButton = useRef()

  const ForgotPassword = async (event) => {
    event.preventDefault()
    forgotPasswordButton.current.disabled = true
    if (validate(email.current.value) === false) {
      alert("Please enter a valid email address!!")
      forgotPasswordButton.current.disabled = false
      return
    }
    const submitEmail = email.current.value
    const value = await axios.post(api.forgotPassword, {
      email: submitEmail,
    },{
      headers: {
          withCredentials: true
      }
    })

    if (value.data !== null) alert(value.data.message)
    else {
      alert(
        "Successfully recreated your new password, please check your email address!!"
      )
      navigate("/login")
    }
    forgotPasswordButton.current.disabled = false
  }

  //find a properly way to validate email pattern and return boolean function.
  // Source: https://stackoverflow.com/a/43692170 .
  const validate = (text) => {
    let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/
    if (reg.test(text) === false) return false
    return true
  }

  return (
    <form
      onSubmit={ForgotPassword}
      className="Login w-50 m-auto center"
      style={{ height: "100vh" }}>
      <div className="row m-0 p-0">
        <div className="col-12 row m-0 mb-4 p-0">
          <b className="col m-auto center" style={{ fontSize: "30px" }}>
            You lost your password? &nbsp;
            <FontAwesomeIcon icon="fa-solid fa-lock" />
          </b>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <input
            required
            ref={email}
            className="form-control col-8 m-auto mb-2"
            type="text"
            placeholder="Please input your Email to recover password!!"
          />
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <button
            ref={forgotPasswordButton}
            onClick={ForgotPassword}
            className="btn btn-success col-12 m-auto font-weight-bold">
            Get your password
          </button>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <Link to="/signin" className="col-12 m-auto text-primary text-end">
            Don't have any accounts? Signin a new one here!!
          </Link>
        </div>
      </div>
    </form>
  )
}
