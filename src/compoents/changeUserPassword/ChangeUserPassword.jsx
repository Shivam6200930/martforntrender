import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ChangeUserPassword.css';

function ChangeUserPassword() {
  const Navigate = useNavigate();
  const [changePassword, setChangePassword] = useState(true);
  const changeIcon = changePassword === true ? false : true;
  const [user, setUser] = useState({
    password: "",
    confirm_password: "" 
  });

  const HandaleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const change_Password = async () => {
    try {
      const response = await axios.post(
        "https://new-backend-s80n.onrender.com/api/users/changepassword",
        {
          password: user.password,
          password_confirm: user.confirm_password
        },
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Successful update password");
      Navigate('/');
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
    }
    setUser({
      password: "",
      confirm_password: "" 
    });
  };
 
  return (
    <>
      <div className="Change-container">
        <div className="change-password">
          <input
            type={changePassword ? "password" : "text"}
            className="input"
            name="password"
            value={user.password}
            placeholder="Enter Your Password"
            onChange={HandaleChange}
          ></input>
          <span
            className="icon"
            onClick={() => {
              setChangePassword(changeIcon);
            }}
          >
            {changeIcon ? <Eye /> : <EyeOff />}
          </span>
          <input
            type={changePassword ? "password" : "text"}
            className="input"
            name="confirm_password"
            value={user.confirm_password}
            placeholder="Enter Your confirm Password"
            onChange={HandaleChange}
          ></input>
          <div className="but">
            <button className="button" onClick={change_Password}>
              Change Password
            </button>
            <button type="button" onClick={() => Navigate('/')}>Homepage</button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default ChangeUserPassword;
