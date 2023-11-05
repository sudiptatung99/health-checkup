import React, { useEffect, useState } from 'react'
import { GiCrossMark } from 'react-icons/gi';
import moment from 'moment/moment';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../Redux/UserSlice';
import ShowAppointment from './ShowAppointment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TimePicker from 'react-time-picker';
import ShowRating from '../Home/ShowRating'
const AppointmentData = ({ date }) => {
    const [data, setdata] = useState([])
    const [open, setOpen] = useState(false)
    const [error, seterror] = useState({})
    const [day, setDay] = useState({})
    const [dates, setDates] = useState('')
    const [time, settime] = useState(["10.30 AM", "11 AM", "11.30 AM", "12 AM", "12.30 PM", "1 PM", "1.30 PM", "2 PM", "2.30 PM", "3 PM", "3.30 PM"])
    const userToken = useSelector(selectUserToken)
    const [patient, setPatient] = useState({
        doctorId: "",
        name: "",
        number: "",
        date: "",
        time: "",
        address: ""

    })
    const [appoint, setAppoint] = useState({})

    useEffect(() => {
        if (userToken) {
            axios.get('http://localhost:5000/appointment/get', {
                headers: {
                    authentication: userToken
                }
            })
                .then((res) => {

                    if (res.status == 200) {

                        setAppoint(res.data);
                    }


                })

        }
    }, [userToken]);
    useEffect(() => {
        if (userToken) {
            axios.get("http://localhost:5000/doctor/doctor", {
                headers: {
                    authentication: userToken
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        setdata(res.data.data)

                    }
                })

        }


    }, [userToken]);

    const Appointment = (e, day, id) => {
        e.preventDefault();
        setPatient({ ...patient, doctorId: id })
        setOpen(!open);
        setDay({ day: day })
    }


    const handleData = (e) => {

        if (moment(date).format('YYYY-MM-DD') > e.target.value) {
            seterror({ errorDate: "Please Enter valid Date" })

        }
        if (moment(e.target.value).format("LLLL").split(",")[0] !== day.day.split(",")[0] && moment(e.target.value).format("LLLL").split(",")[0] !== day.day.split(",")[1]) {
            seterror({ errorDate: "Please Enter valid Day" })
        }
        else {
            seterror("")
            if (patient.time) {
                axios.get("http://localhost:5000/appointment/getAllAppointment", {
                    headers: {
                        authentication: userToken
                    }
                })
                    .then((res) => {
                        if (res.status === 200) {
                            var sms = false
                            for (let i = 0; i < res.data.length; i++) {
                                const data = res.data[i];
                                if (data.time === patient.time && moment(data.date).format('YYYY-MM-DD') === e.target.value && data.doctorId === patient.doctorId) {
                                    toast.error("Your Appointment slot already book", {
                                        position: toast.POSITION.TOP_CENTER,
            
                                    });
                                    setPatient({ ...patient, date: e.target.value })
                                    setDates(e.target.value)
                                    sms = true
                                }
                            }
                            if (sms === false) {
                                setPatient({ ...patient, date: e.target.value })
                                
                            }

                        }
                    })
            } else {
                setPatient({ ...patient, date: e.target.value })
                
            }

        }
    }

    const patientData = (e) => {
        const name = e.target.name;
        setPatient({ ...patient, [name]: e.target.value })
    }
    const timer = (e) => {
        setPatient({ ...patient, date: dates })
        if (patient.date) {
            axios.get("http://localhost:5000/appointment/getAllAppointment", {
                headers: {
                    authentication: userToken
                }
            })
                .then((res) => {
                    if (res.status == 200) {
                        var check = false
                        for (let i = 0; i < res.data.length; i++) {
                            const data = res.data[i];
                            if (data.time === e.target.value && moment(data.date).format('YYYY-MM-DD') === patient.date && data.doctorId === patient.doctorId) {
                                toast.error("Your Appointment slot already book", {
                                    position: toast.POSITION.TOP_CENTER,
        
                                });
                                
                                setPatient({ ...patient, time: e.target.value })
                                check = true
                            }
                        }
                        if (check === false) {
                            setPatient({ ...patient, time: e.target.value })
                            
                        }
                    }
                })
                .catch((res) => {
                    // console.log(res);
                })
        } else {
            setPatient({ ...patient, time: e.target.value })
            
        }
    }
    const submit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/appointment/new', patient, {
            headers: {
                authentication: userToken
            }
        })
            .then((res) => {
                const appointError = {}
                if (res.status == 203) {
                    if (!res.data.errorData) {
                        res.data.map(err => {

                            appointError[err.context.label] = err.message;


                        })
                    } else {
                        toast.error(res.data.errorData, {
                            position: toast.POSITION.TOP_CENTER,

                        });
                        appointError["errordata"] = res.data.errorData;
                    }
                    seterror(appointError)
                }
                if (res.status == 200) {
                    toast.success("Your Appointment is Created", {
                        position: toast.POSITION.TOP_CENTER,

                    });

                    setTimeout(function () {
                        window.location.reload();
                    }, 2500);
                }
            })
    }
    console.log(data);
    return (
        <div>
            {appoint ? <div className='w-full'>

                <ShowAppointment appointment={appoint} />
            </div> : ""}
            <div className='mt-10 text-center' >

                {data.map((item) => (

                    <div className='inline-block ' key={item._id} >
                        <div className=' shadow-2xl w-64 mb-4 mx-4 border  border-slate-200' >
                            <div className='text-left  p-2 ' style={{ margin: "0 auto" }}>
                                <div className='text-center'>
                                    <img src={item.specialist.appointImage} alt="" />
                                </div>
                                <div className=''>
                                    <h2 className='text-xl font-semibold text-center '>{item.specialist.appointName}</h2>
                                    <ShowRating rating={item.rating}/>
                                    <p className=' text-lg font-semibold'> <span className='text-xl font-semibold text-yellow-700'>Dr. {item.doctorName} </span></p>
                                  
                                    <p className=' text-xl  font-semibold  text-sky-700 hover:text-orange-400 cursor-pointer'>{item.days}</p>
                                </div>
                                <div className='text-center'>
                                    <button className=' bg-slate-500 text-white p-2 rounded-lg mt-2 mb-2 hover:bg-green-700 font-medium ' onClick={(e) => Appointment(e, item.days, item._id)}>Appointment</button>





                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>


            {open ? <div className='fixed top-0 h-screen w-full' style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "saturate(100%) blur(2px) " }} >

                <div className=' md:w-1/2 w-11/12 lg:h-3/5 h-3/4   text-center md:left-1/4 left-3 overflow-y-scroll  z-50 absolute bg-white mx-2' style={{ top: "15%" }} >
                    <button className=' float-right m-1 border border-slate-800 p-1 rounded-full ' onClick={() => {setOpen(false); window.location.reload();}}><GiCrossMark /></button>
                    <p className='mt-2 text-xl font-semibold'>Patient Details</p>
                    <hr className='text-slate-900 mt-2 mb-2' />
                    <div className='text-left mt-5'>
                        <div className="mb-6 mx-3">
                            <input type="text" name='name' className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none border-red-600':'focus:border-blue-600 ${error.name ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput2" placeholder="Patient Name" onChange={(e) => patientData(e)} />
                            <span className='text-red-600 text-base'>{error.name}</span>
                        </div>
                        <div className="mb-6 mx-3">
                            <input type="number" name='number' className={`number form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none border-red-600':'focus:border-blue-600 ${error.number ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput3" placeholder="Phone Number" onChange={(e) => patientData(e)} />
                            <span className='text-red-600 text-base'>{error.number}</span>
                        </div>
                        <div className="mb-6 mx-3">
                    
                            <input type="date" name='date' min={moment(date).format('YYYY-MM-DD')} className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${error.errorDate ? 'border-red-600' : 'focus:border-blue-600'} ${error.date ? 'border-red-600' : 'focus:border-blue-600'}`} id="exampleFormControlInput4" placeholder="Date" onChange={(e) => handleData(e)} />
                            <span className='text-red-600 text-base'>{error.errorDate}</span>
                            <span className='text-red-600 text-base'>{error.date}</span>

                        </div>
                        <div className='mb-6 mx-3'>

                            <select name="time" id="" className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${error.time ? 'border-red-600' : 'focus:border-blue-600'} ${error.date ? 'border-red-600' : 'focus:border-blue-600'}`} onChange={(e) => timer(e)}>
                                <option hidden >-- select time --</option>
                                {time.map(data => (
                                    <option value={data}>{data}</option>
                                ))
                                }
                            </select>
                            <span className='text-red-600 text-base'>{error.time}</span>
                        </div>
                        <div className="mb-6 mx-3">
                            <textarea name="address" id="" cols="30" rows="3" className={`form-control mb-2 block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none ${error.address ? 'border-red-600' : 'focus:border-blue-600'}`} placeholder='Patient Address' onChange={(e) => patientData(e)}></textarea>
                            <span className='text-red-600 text-base'>{error.address}</span>
                        </div>

                        <div className='text-center'>
                            <button className='  bg-slate-500 text-white p-2 rounded-lg mt-2 mb-4 hover:bg-green-700 font-medium ' onClick={(e) => submit(e)}>Book Now</button>
                        </div>
                        {/* {error.errordata ? <div className=' lg:bg-red-200 text-center mb-4 rounded-lg lg:w-3/5 w-full mx-2' style={{ margin: "0 auto" }}>
                            <p className='text-center text-red-700 lg:py-3 px-2 text-xl'>{error.errordata}</p>
                        </div> : ""} */}
                    </div>
                    <ToastContainer className={'mt-6'} />

                </div>


            </div> : ""}

            <ToastContainer className={'mt-14'} />

        </div>
    )
}

export default AppointmentData