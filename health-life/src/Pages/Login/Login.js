import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import { FaFacebookSquare } from "react-icons/fa"
import {AiFillEyeInvisible} from "react-icons/ai"
import {FaMehRollingEyes} from "react-icons/fa"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../../Redux/UserSlice';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import app from '../../Firebase/FirebaseConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { FacebookAuthProvider } from "firebase/auth";
import Cookies from 'universal-cookie';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const dispatch = useDispatch()
  let location = useLocation();
  let navigate = useNavigate();
  let { from } = location.state || { from: { pathname: `/ ` } };
  const [error, seterror] = useState({})
  const handleData = (e) => {
    const name = e.target.name
    setUser({ ...user, [name]: e.target.value })

  }
  const[type,setType] = useState('password')

  const submit = (e) => {                                       //submit Main Data
    axios.post("http://localhost:5000/user/login", user)
      .then((res) => {
        if (res.data.message === true) {
          seterror('')
          const cookies = new Cookies()
          const token = cookies.set("authToken", res.data.data)
          dispatch(LOGIN({
            userToken: res.data.data,
            success: true
          }))
          window.location = from.pathname
        }

      })
      .catch((res) => {
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
        seterror(userError)
      })

  }  //end

//google Auth

  const google = (e) => {
    e.preventDefault();
    e.preventDefault()
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        
        // // The signed-in user info.
        const { email, uid, accessToken } = result.user;
        const sineInUser = {

          email: email,
          password: uid
        }

        axios.post("http://localhost:5000/user/login", sineInUser)
          .then((res) => {
            var userError = {}
            if (res.status == 200) {
              const cookies = new Cookies()
              const token = cookies.set("authToken", res.data.data)
              dispatch(LOGIN({
                userToken: res.data.data,
                success: true
              }))
              window.location = from.pathname
            } else {
              toast.error(res.data.errorMessage, {
                position: toast.POSITION.TOP_CENTER,
                className: 'toast-message '
              });
              userError['userError'] = res.data.errorMessage
            }
            //     setError(userError)

          }).catch((res)=>{
            var userError = {}
            toast.error(res.response.data.errorMessage, {
              position: toast.POSITION.TOP_CENTER,
            });
            userError['userError'] = res.data.errorMessage
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
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0 lg:block hidden" data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0" data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" >
            <form >
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block p-3  font-medium text-xl leading-tight uppercase rounded-full shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out mx-1" onClick={(e) => google(e)}>
                  <FcGoogle className='text-2xl' />
                </button>
                {/* <button type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" className="inline-block p-3  font-medium text-xl leading-tight uppercase rounded-full shadow-md  hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out mx-1" onClick={(e) => facebook(e)}>
                  <FaFacebookSquare className='text-2xl' />
                </button> */}

              </div>
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>
              {/* Email input */}
              <div className="mb-6">
                <input type="text" name='email' className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${error.email ? 'border-red-600' : 'focus:border-blue-600'} `} id="exampleFormControlInput2" placeholder="Email address" onChange={(e) => handleData(e)} />
                <span className='text-red-600 text-base'>{error.email}</span>
              </div>
              {/* Password input */}
              <div className="mb-6">
                <div className='form-control' >
                <input type={type} name='password' className={` mb-2 block  w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${!error.password ? 'focus:border-blue-600' : 'border-red-600'}`} id="exampleFormControlInput3" placeholder="Password" onChange={(e) => handleData(e)}
                
                />
                {/* <AiFillEyeInvisible className=' text-xl    absolute'/> */}
                </div>
              

                <span className='text-red-600 text-base'>{error.password}</span>
              </div>
              {/* <div className="flex justify-between items-center mb-6"> */}
              {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" id="exampleCheck2" />
                    <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2">Remember me</label>
                  </div> */}
              <div  className="text-gray-800 mb-4 "><Link to={"/newPassword"}>Forgot password?</Link></div>
              {/* </div> */}
              <div className="text-center lg:text-left">

                <button type="button" className="inline-block mb-2 px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={(e) => submit(e)}>
                  Login
                </button>

                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link to={"/register"} className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</Link>
                  
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer className={' mb-7'} />

    </div>
  )
}

export default Login