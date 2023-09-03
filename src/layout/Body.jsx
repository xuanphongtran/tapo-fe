import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Login'
import Signin from '../components/Signin'
import MainBody from '../components/MainBody'
import ForgotPassword from '../components/ForgotPassword'
import axios from 'axios'
import api from '../API/api'
export default function Body() {
  const checking = () => {
    if(sessionStorage.getItem('AccountID') == null){
      console.log('null sessionStorage')
      return false
    }else{
      axios.get(api.getAccountWithId,{
        withCredentials: true
      })
      .then(res => {
        if (res.data == null) {
          console.log('id not found') 
          return false
        }else{
          console.log('id found') 
          return true
        }
      })
    }
  }
  const CheckHome = () => {
    if (checking() === false) return <Navigate to="/login"/>
    return <MainBody/>
  }
  const CheckLog = () => {
    if (checking() === false) return <Login/>
    return <Navigate to="/"/>
  }
  const CheckSign = () => {
    if (checking() === false) return <Signin/>
    return <Navigate to="/"/>
  }
  return (
    <Routes>
      <Route path="/*" element={<CheckHome/>}/>
      <Route path="/login" element={<CheckLog/>} />
      <Route path="/signin" element={<CheckSign/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
    </Routes>
  )
}
