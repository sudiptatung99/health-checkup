import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineAlignLeft } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, LOGOUT, selectUserFirstName, selectUserId, selectUserImage, selectUserRole, selectUserToken, selectUserVerify, USER } from '../Redux/UserSlice';
import axios from 'axios';
import Cookies from 'universal-cookie';


const Header = () => {
    const dispatch = useDispatch()
    const cookie = new Cookies()
    const user = cookie.get("authToken")
 
    const navigate = useNavigate()
    const [token, settoken] = useState('')
    const [open, setopen] = useState(false)
    const [logout, setLogout] = useState(false)
    const [profile, setProfile] = useState({
        firstName: "",
        images: ""
    })
    const image = useSelector(selectUserImage)
    const name = useSelector(selectUserFirstName)
    let account = useRef(null)
    let toggle = useRef(null)
    useEffect(() => {
        document.addEventListener("mousedown", (event) => {
            if (!toggle.current.contains(event.target)) {
                setopen(false)
            }
        })

        document.addEventListener("mousedown", (event) => {
            if (!account.current.contains(event.target)) {
                setLogout(false)
            }
        })


    }, [])
    const handle = () => {
        setLogout(!logout)
    }
const bar=()=>{
    setLogout(false)
}

    useEffect(() => {
        setProfile({ ...profile, images: image,firstName:name })
    }, [image,name]);

    const sessionOut = (e) => {
        cookie.remove("authToken")
        e.preventDefault()
        dispatch(LOGOUT())
        window.location = '/login'
    }

    const nav = <>
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"appointment"}>Appointment</Link></li>
        {user ? <>
            <li><Link to={"myappointment"}>My Appointment</Link></li>
        </> : ""
        }
        <li><Link to={"about"}>About</Link></li>
        <li><Link to={"contract"}>Contract us</Link></li>
    </>

    return (
        <div className=' shadow-lg sticky top-0 bg-white z-50 '>
            <div className='flex justify-between lg:mx-16 mx-4 py-5'>

                <div className='flex'>
                    <AiOutlineAlignLeft className=' text-xl mt-1 mx-1 lg:hidden flex cursor-pointer' onClick={() => setopen(!open)} />
                    <Link to={"/"}><h3 className="font-serif text-xl cursor-pointer">Healthy<span className=' text-blue-400 p-2'>Life</span></h3></Link>
                </div>


                <ul className=' list-none lg:flex hidden gap-10 cursor-pointer font-semibold '>
                    {nav}
                </ul>
                <ul className={` fixed top-0 z-50 bg-white w-2/3 h-screen shadow-2xl lg:hidden gap-5 flex flex-col mt-4 text-xl  duration-500 ${open ? 'left-0' : 'left-[-100%]'} `} ref={toggle}>
                    <div className='flex justify-between'>
                        <h3 className="font-serif text-xl mx-3">Healthy<span className=' text-green-400 p-2'>Life</span></h3>
                        <BsXLg className='mt-1 mx-3 text-2xl ' onClick={() => setopen(false)} />
                    </div>
                    <hr className='border-b-4 border-l-neutral-900 ' />
                    <ul className='gap-5 flex flex-col mx-3' onClick={() => setopen(false)}>
                        <Link to={"/profile"}><li>My profile</li></Link>
                        {nav}
                    </ul>
                    <div className=' mt-auto w-100'>
                        <hr className='border-b-4 border-l-neutral-900 ' />
                        <li className='mt-4 mb-8 mx-3' onClick={(e) => sessionOut(e)}>Log Out</li>
                    </div>
                </ul>

                <div >{!user ?
                    <Link to={"/login"}><ul className=' list-none font-semibold cursor-pointer flex'>
                        <li className='text-2xl mx-2'><FaUserCircle /></li>
                        <li>Log In</li>
                    </ul>
                    </Link> :
                    <div >
                        <ul className='flex'  >
                            <li className='w-10 h-10 lg:mx-2 mx-0 '>
                                {profile.images ?
                                    <Link to={'/profile'}> <img className='w-full h-full  rounded-full' src={profile.images} alt="" /></Link> :
                                    <img src={process.env.PUBLIC_URL+'./image/pp.jpg'} alt="" className='w-full h-full  rounded-full' />
                                }
                            </li>
                            <li className={`cursor-pointer lg:flex hidden  font-medium leading-7`} onClick={handle}><span className=" flex">{profile.firstName}<AiOutlineArrowDown className="mt-1 lg:flex hidden" /></span></li>
                        </ul>
                        {logout ? <div className=' absolute bg-white h-20 w-40 right-4 mt-5 border lg:block hidden rounded-b-lg' ref={account} >
                            <Link to={'/profile'} ><p className=' text-center font-semibold mt-1 cursor-pointer'onClick={bar}>My Profile</p></Link>
                            <p className=' text-center font-semibold mt-2 cursor-pointer' onClick={(e) => sessionOut(e)}> Log Out</p>
                        </div> : ""}
                    </div>
                }
                </div>
            </div>
        </div>
    )
}
{/* <img src="" alt={profile.firstName.slice(0,1)} className='w-full h-full rounded-full' /> */ }
export default Header