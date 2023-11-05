import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import './Login.css'
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, selectAdminToken } from '../../Redux/Useslice';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState({})
  const admin = useSelector(selectAdminToken)
  const dispatch = useDispatch()
  const handleData = (e) => {
    var name = e.target.name;
    setUser({ ...user, [name]: e.target.value })
  }

  const submit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/login", user,)
      .then((res) => {

        if (res.status == 200) {
          toast.success("Login Sucessfull", {
            position: toast.POSITION.TOP_CENTER,
          });
          const cookies = new Cookies();
          cookies.set('adminToken', res.data.data, { path: '/' });

          dispatch(LOGIN(res.data.data))
          // localStorage.setItem("adminToken", res.data.data)
          // window.location.reload();

        }
      }).catch((res) => {
        var userError = {}
        if (!res.response.data.errorMessage) {
          res.response.data.data.map((err) => (
            userError[err.context.label] = err.message
          ))
        } else {
          toast.error(res.response.data.errorMessage, {
            position: toast.POSITION.TOP_CENTER,

          });

          userError['userError'] = res.response.data.errorMessage
        }
        setErrors(userError)
        // seterror(userError)
      })
  }
  console.log(errors.email);
  return (
    <div className='bg-sky-500 w-full' style={{height:"100vh"}}>
      <br/>
      <br />
      <br />
        <div className='bg-white h-3/5 pt-4  rounded-3xl lg:w-1/2 w-full lg:left-1/4 left-0 ' style={{ margin: "0 auto" }}>

          <form id="quickForm " className='' onSubmit={submit}>
            <div className="card-header text-center shadow-md">
              <h3 className="font-serif text-xl cursor-pointer">Healthy<span className=' text-green-400 p-2'>Life</span></h3>
            </div>
            <div className="card-body pt-2">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" >Email address</label>
                <input type="email" name="email" value={user.email} className={`form-control mb-2  ${errors.email ? 'border-red-600' : 'focus:border-blue-600'} `} id="exampleInputEmail1" placeholder="Enter email" onChange={handleData} />
                <span className='text-red-600 text-base'>{errors.email}</span>
                {/* <input type="text" name='email' className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${error.email ? 'border-red-600' : 'focus:border-blue-600'} `} id="exampleFormControlInput2" placeholder="Email address" onChange={(e) => handleData(e)} />
              <span className='text-red-600 text-base'>{error.email}</span> */}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" name="password" value={user.password} className={`form-control mb-2  ${errors.password ? 'border-red-600' : 'focus:border-blue-600'} `} id="exampleInputPassword1" placeholder="Password" onChange={handleData} />
                <span className='text-red-600 text-base'>{errors.password}</span>
              </div>
            </div>
            <div className="card-footer">
              <button type='submit' className="btn btn-outline-secondary" >Submit</button>
            </div>
          </form>
          <ToastContainer />
        </div >
     
    </div >
  )
}

export default Login;