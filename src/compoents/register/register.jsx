import React, { useState } from 'react';
import './register.css'
import axios from "axios";
import { Eye } from 'lucide-react';
import { EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// import bcrypt from 'bcrypt';
const Register = () => {
    const navigate=useNavigate()
  const [user, setUser] = useState({
    name:"",
    email:"",
    password:"",
    password_confirm:""
  })

  const [changePassword, setChangePassword] = useState(true);
  const changeIcon = changePassword === true ? false : true;


  const HandaleChange = e => {

    const { name, value } = e.target
    console.log(name, value)
    setUser({
      ...user,
      [name]: value
    })
  }

  const registers = async () => {
    const { name, email, password, password_confirm } = user
    if (name && email && password && (password === password_confirm)) { 
      try{
          const response=await axios.post("http://localhost:5858/api/users/register", {
            name:user.name,
            email:user.email,
            password:user.password,
            password_confirm:user.password_confirm
          },{withCredentials:true})
          console.log(response)
          toast.success('register successfully')
          navigate('/login')
      }
        catch (error) {
          alert('something went wrong')
          console.log(error);
        };
    } else {
      alert("invalid")
    }

    setUser({
      name:"",
      email:"",
      password:"",
      password_confirm:""
    })

  }

  return (
    <>
    <div className='Login-container'>
      <div className="register">
        <h1>Rgesister</h1>
        <hr></hr>
        {console.log("User", user)}
        <input type="text" className="input" name="name" value={user.name} placeholder="Enter your name" onChange={HandaleChange}></input>
        <input type="text" className="input" name="email" value={user.email} placeholder="Enter your Email" onChange={HandaleChange}></input>
        <input type={changePassword ? "password" : "text"} className="input" name="password" value={user.password} placeholder="Enter Your Password" onChange={HandaleChange}></input>
        <span className="icon1"
                 onClick={() => {
                    setChangePassword(changeIcon);
                 }}
              >
                 {changeIcon ? <Eye/> : <EyeOff/>}
              </span>
        <input type={changePassword ? "password" : "text"} className="input" name="password_confirm" value={user.password_confirm} placeholder="re-enter Password" onChange={HandaleChange}></input>
    
        <div  id="button1" onClick={registers}>register</div>
        <div className="">or</div>
        <a href="/login"><button id="button">Login</button></a>
      </div>
      </div>
    </>
  )
}

export default Register