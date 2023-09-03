import React, { useState, useRef } from 'react'
import axios from 'axios'
import api from '../API/api'
export default function Signin() {
  const [account, setAccount] = useState(
    { email: '', password: '', username: '' }
  )
  const email = useRef()
  const password = useRef()
  const username = useRef()
  const signinButton = useRef()
  const SigninFunction = () => {
    signinButton.current.disabled = true
    if(username.current.value === '') {
      alert("Nickname cannot be blank")
      signinButton.current.disabled = false
      return
    }
    axios.post(api.getAccountWithEmailAndPassword, {
        email: account.email,
        password: account.password
    },{
      headers: {
          withCredentials: true
      }
    }).then(res => {
      if(res.data === null){
        axios.post(api.createAnAccount, {
          email: account.email,
          password: account.password,
          username: username.current.value
        },{
          headers: {
              withCredentials: true
          }
        }).then(res => {
          if(res.data === null){
            alert("Failed to create new account, please try again")
            signinButton.current.disabled = false
            return
          }
          alert("Successfully created new account")
          sessionStorage.setItem("AccountID", res.data._id)
          window.location.reload()
        })
      }else{
        signinButton.current.disabled = false
        alert("Failed to create new account, duplicated email address")
        return
      }
    })
  }
  const nextForm = () => {
    let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if(!emailRegex.test(email.current.value)){
      alert("Not a valid email, please try again")
      return
    }
    
    if(!passwordRegex.test(password.current.value)){
      alert("Not a valid password, it need at least 8 characters, contains one number and one letter")
      return
    }

    setAccount({
      email: email.current.value,
      password: password.current.value,
      username: '',
    })
  }
  function Page1(){
    return (
      <>
        <div className="col-12 row m-0 mb-4 p-0">
            <input ref={email} className="form-control col-12 m-auto mb-2" type="text" placeholder="Email@domain.com"/>
            <input ref={password} className="form-control col-12 m-auto mb-2" type="password" placeholder="Password (at least 8 characters, contains one number and one letter)"/>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
          <div className="col-10 m-0"></div>
          <div className="col-2 p-0 m-0">
            <button onClick={nextForm} className="text-primary fw-bold" style={{border:'none', background:'none'}}>Next</button>
          </div>
        </div>
      </>
    )
  }
  function Page2(){
    return(
      <>
        <div className="col-12 row m-0 mb-4 p-0">
            <div className="text-start col-12 m-auto mb-1 text-secondary fw-bold">Login information</div>
            <input disabled value={account.email} className="form-control col-12 m-auto mb-2" type="text" placeholder="Email"/>
            <input disabled value={account.password} className="form-control col-12 m-auto mb-2" type="password" placeholder="Password"/>
        </div>
        <div className="col-12 row m-0 mb-4 p-0">
            <div className="text-start col-12 m-auto mb-1 text-secondary fw-bold">Details information</div>
            <input ref={username} className="form-control col-12 m-auto mb-2" type="text" placeholder="Nickname (The name will be displayed to everyone)"/>
        </div>
        <div className="col-6 row me-auto mb-4 p-0">
          <button onClick={() => setAccount(
            { email: '', password: '', username: '' }
          )} className="btn btn-danger fw-bold">Comeback</button>
        </div>
        <div className="col-6 row ms-auto mb-4 p-0">
          <button ref={signinButton} onClick={SigninFunction} className="btn btn-success fw-bold">Signin new account</button>
        </div>
      </>
    )
  }
  return (
    <div className="Signin w-50 m-auto center" style={{height: '100vh'}}>
      <div className="row m-0 p-0">
        <div className="col-12 row m-0 mb-4 p-0">
          <b className="col m-auto center" style={{fontSize:'30px'}}>SiriBlogger</b>
        </div>
        {account.email === ""? <Page1/>:<Page2/>}
      </div>
    </div>
  )
}
