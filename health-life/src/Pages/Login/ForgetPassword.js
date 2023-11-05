import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "./Forget.css"
const ForgetPassword = () => {
    const [data, setData] = useState({
        email: ''
    })
    const [counter, setCounter] = useState();
    const [right, setRight] = useState(false)
    const [otp, setOtp] = useState({
        email: "",
        otp: ""
    })
    const [newpass, setNewPass] = useState({
        password: ''
    })
    const [rePass, setRePass] = useState({
        email: '',
        password: '',
        otp: ''
    })
    const [error, setError] = useState({
        error: ""
    })
    const handleEmail = (e) => {
        setData({ ...data, email: e.target.value })
        setOtp({ ...otp, email: e.target.value })
        setRePass({ ...rePass, email: e.target.value })
    }
    const [password, setPassword] = useState(false)
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


    const submit = () => {
        axios.post("http://localhost:5000/user/sendEmail", data)
            .then((res) => {
                setRight(true)
                id = setInterval(timer, 1000)
                toast.success("OTP send to your email", {
                    position: toast.POSITION.TOP_CENTER,
        
                  });
            })
            .catch((res) => {
                toast.error(res.response.data, {
                    position: toast.POSITION.TOP_CENTER,
        
                  });
            })
    }

    const handleOtp = (e) => {
        setOtp({ ...otp, otp: e.target.value })
        setRePass({...rePass,otp:e.target.value})
    }
    const resend = () => {
        id = setInterval(timer, 1000)
       axios.post(" http://localhost:5000/user/changePassword",data)
       .then((res)=>{
        toast.success(res.response.data, {
            position: toast.POSITION.TOP_CENTER,

          });
       })
       .catch((res)=>{
        
       })
    }
    const otpSubmit = (e) => {
        axios.post("http://localhost:5000/user/validOtp", otp)
            .then((res) => {

                if (res.status == 200) {

                    setPassword(true)

                }
            }).catch((res) => {
                toast.error(res.response.data, {
                    position: toast.POSITION.TOP_CENTER,
        
                  });

            })
    }
    const handlePassword = (e) => {
        setNewPass({ ...newpass, password: e.target.value })
    }
    const handleRePassword = (e) => {
        if (newpass.password === e.target.value) {
            setError('')
            setRePass({ ...rePass, password: e.target.value })
        } else {
            setError({ ...error, error: "Please Enter same password" })
            setRePass({...rePass,password:""})
        }

    }
    const submitPassword = () => {
        axios.post("http://localhost:5000/user/changePassword", rePass)
        .then((res)=>{
            toast.success("password successfully changes", {
                position: toast.POSITION.TOP_CENTER,
    
              });
              setTimeout(function(){
                window.location='/login'
             }, 2000);
              
        })
        .catch((res)=>{
            toast.error(res.response.data, {
                position: toast.POSITION.TOP_CENTER,
    
              });
            setTimeout(function(){
                window.location='/login'
             }, 2000);

        })
    }

    return (
        <div className='mt-20 w-full '>
            {password === false ?
                <div className='text-center'>
                    <div className='mb-6'>
                        <input type="email" className='form-control mb-2  w-1/2 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none  focus:border-blue-600 ' placeholder='Enter your email id' onChange={handleEmail} />
                    </div>
                    {right === false ?
                        <button className='inline-block mb-2 px-7 text-center py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={submit}>Send OTP</button>
                        :
                        <>
                            <div>
                                <input type="number" className='form-control mb-4 w-1/6 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none  focus:border-blue-600 ' placeholder='Enter OTP' onChange={handleOtp} />
                                <div>
                                    {counter < 0 + ":" + 1 ? <p className='text-lg text-green-700  mb-3 cursor-pointer' onClick={resend}>Resend</p> :
                                        <p className='text-green-800 text-lg left-4 mb-3'>{counter}</p>

                                    }
                                </div>
                            </div>

                            <button className='inline-block mb-2 px-7 text-center py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={otpSubmit}>Verify</button>
                        </>
                    }
                </div> :
                <div>
                    <div className='w-full ' >
                        <div className='w-1/2' style={{ margin: "0 auto" }}>
                            <div className='mb-6'>
                                <input type="text" className='form-control mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none  focus:border-blue-600 ' placeholder='Enter password' onChange={handlePassword} />
                            </div>
                            <div className='mb-3'>
                                <input type="password" className='form-control mb-2 w-full  px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none  focus:border-blue-600 ' placeholder='Re-Enter password ' onChange={handleRePassword} />
                                <div className='mb-2'>
                                    <span className='text-red-600 ' >{error.error}</span>
                                </div>
                            </div>
                            <button className='inline-block mb-2 px-7 text-center py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out' onClick={submitPassword}>send</button>
                        </div>
                    </div>
                </div>


            }
            <ToastContainer className={'mt-14'}/>
        </div>
    )
}

export default ForgetPassword