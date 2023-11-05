import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc"
import { FaFacebookSquare } from "react-icons/fa"
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import jwt from 'jwt-decode';
import app from '../../Firebase/FirebaseConfig';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../Redux/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Sinein.css"
import Cookies from 'universal-cookie';

const Sinein = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })

  const [token, settoken] = useState({
    id: "",
    otp: "",
  })

  let location = useLocation();
  let { from } = location.state || { from: { pathname: `/ ` } };
  const dispatch = useDispatch()
  const [authtoken, setauthtoken] = useState({})
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [error, setError] = useState({})
  const [counter, setCounter] = useState();

  //For count Down
  var id;
  var count = 0;
  var liteleft = 120;
  const converSecond = (s) => {
    var min = Math.floor(s / 60)
    var second = s % 60
    if (second < 10) {
      return min + ":0" + second
    } else {
      return min + ":" + second
    }
  }
  var a = 0;
  const timer = () => {
    a = a + 1
    if (a === 121) {
      clearInterval(id)
    } else {
      count = count + 1
      setCounter(converSecond(liteleft - count))
    }
  }

  //Collect user Data 
  const handleData = (e) => {
    const name = e.target.name;
    setUser({ ...user, [name]: e.target.value })
  }


  //Submit Register data
  const submitData = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/user/register", user)
      .then((data) => {
        setError("")
        const { _id } = jwt(data.data.data.token)
        settoken({ ...token, id: _id })
        setauthtoken(data.data.data.token)
        setMessage({ send: data.data.data.message });
        toast.success(data.data.data.message, {
          position: toast.POSITION.TOP_CENTER,

        });
        id = setInterval(timer, 1000)
      })
      .catch((data) => {
        console.log(data);
        const userError = {}
        if (!data.response.data.errorMessage) {
          data.response.data.data.map((err) => (
            userError[err.context.label] = err.message
          ))

        }
        else {
          toast.error(data.response.data.errorMessage, {
            position: toast.POSITION.TOP_CENTER,

          });
        }
        setError(userError);

      })

  }


  const handleOtp = (e) => {
    const name = e.target.name;
    settoken({ ...token, [name]: e.target.value })
  }
  const submitOtp = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5000/user/verify/${token.id}`, token)
      .then((res) => {
        if (res.status == 203) {
          setMessage({ error: res.data })
        }
        if (res.status == 200) {
          setMessage({ send: res.data.message })
           const cookies = new Cookies()
        const token = cookies.set("authToken", authtoken)
        dispatch(LOGIN({
          userToken: authtoken,
          success: true
        }))
          // localStorage.setItem("auth_token", authtoken)
          window.location = '/'
        }
      })
      .catch((err) => console.log(err))
  }


  const resend = (e) => {
    id = setInterval(timer, 1000)
    e.preventDefault();
    axios.post(`http://localhost:5000/user/resend/${token.id}`, token)
      .then((res) => {
        if (res.status == 200)
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,

          });
      }).catch((res) => {

      })
  }


  //For google user

  const google = (e) => {
    e.preventDefault()
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // // The signed-in user info.
        const { displayName, email, uid, photoURL, emailVerified, accessToken } = result.user;
        const sineInUser = {
          firstName: displayName.split(" ")[0],
          lastName: displayName.split(" ")[1],
          email: email,
          accessToken: accessToken,
          verify: emailVerified,
          password: uid
        }
        axios.post("http://localhost:5000/user/googleRegister", sineInUser)
          .then((res) => {
            // var userError = {}
            if (res.status === 200) {
              const cookies = new Cookies()
              cookies.set("authToken", res.data.data.token)
              dispatch(LOGIN({
                userToken: res.data.data.token,
                success: true
              }))
              window.location = from.pathname
            }
          }).catch((res) => {
            toast.error(res.response.data.errorMessage, {
              position: toast.POSITION.TOP_CENTER,
            });
          })
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }



  // const facebook = (e) => {
  //   e.preventDefault()
  //   const provider = new FacebookAuthProvider();
  //   const auth = getAuth(app);
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const user = result.user;

  //       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  //       const credential = FacebookAuthProvider.credentialFromResult(result);
  //       const accessToken = credential.accessToken;

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = FacebookAuthProvider.credentialFromError(error);

  //       // ...
  //     });

  // }

  return (
    <div className=' mt-4 overflow-x-hidden'>
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 lg:block hidden " data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 w-full" data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine">
            <form className='mt-10'>
              <div className="mb-6">
                <input type="text" name='firstName' className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none mb-2 ${error.firstName ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput2" placeholder="First Name" onChange={(e) => handleData(e)} />
                <span className=' text-red-600 text-xl'>{error.firstName}</span>
              </div>
              <div className="mb-6">
                <input type="text" name='lastName' className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none mb-2 ${error.lastName ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput3" placeholder="Last Name" onChange={(e) => handleData(e)} />
                <span className=' text-red-600 text-xl'>{error.lastName}</span>
              </div>
              <div className="mb-6">
                <input type="text" name='email' className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none mb-2 ${error.email ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput4" placeholder="Email address" onChange={(e) => handleData(e)} />
                <span className=' text-red-600 text-xl'>{error.email}</span>
              </div>
              <div className="mb-6">
                <input type="password" name='password' className={`form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none mb-2 ${error.password ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput5" placeholder="Password" onChange={(e) => handleData(e)} />
                <span className=' text-red-600 text-xl'>{error.password}</span>
              </div>

              {/* <div className="flex justify-between items-center mb-6"> */}
              {/* <div className="form-group form-check">
                <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2" />
                <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
              </div> */}
              {/* <a href="#!" className="text-gray-800">Forgot password?</a> */}
              {/* </div> */}
              <div className="text-center lg:text-left">
                {!message ? <button type="button" className="inline-block mb-3 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => submitData(e)}>
                  Register
                </button> :
                  <>
                    <div className="mb-6 md:w-1/5 w-full ">
                      <input type="text" name='otp' className='form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none mb-2' id="exampleFormControlInput5" placeholder="OTP" onChange={(e) => handleOtp(e)} />
                      <div>{counter < 0 + ":" + 1 ? <p className='text-lg text-green-700 float-right mb-3 cursor-pointer' onClick={(e) => resend(e)}>Resend</p> :
                        <p className='text-green-800 text-lg float-right mb-3'>{counter}</p>

                      }</div>



                    </div>
                    <button type="button" className="inline-block  px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => submitOtp(e)}>
                      Verify Gmail
                    </button></>}

                {/* <p className='text-green-700 text-xl p-3'>{message.send}</p> */}
                <p className='text-red-700 text-xl p-3'>{message.error}</p>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">Or</p>
                </div>
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="text-lg mb-0 mr-4">Sign in with</p>
                  <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block p-3  font-medium text-xl leading-tight uppercase rounded-full shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out mx-1" onClick={(e) => google(e)}>
                    <FcGoogle className='text-2xl' />
                  </button>
                </div>
                <br />

                {/* <p className='text-red-600 text-xl'>{error.userError}</p> */}
              </div>
            </form>
          </div>
        </div>
      </div >
      <ToastContainer className={` mt-16`} />

    </div >
  )
}

export default Sinein