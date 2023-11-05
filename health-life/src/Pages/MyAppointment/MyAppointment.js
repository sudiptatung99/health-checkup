import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../Redux/UserSlice';
import { TiTick } from "react-icons/ti";
import {AiOutlineWarning } from "react-icons/ai";
import moment from 'moment/moment';
import Ratings from '../Ratings';
import ShowRating from '../Home/ShowRating';
const MyAppointment = () => {
    const token = useSelector(selectUserToken)
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/appointment/getOneUseAppointment", {
            headers: {
                authentication: token
            }
        })
            .then((res) => {
                setData(res.data);
            })
    }, [token]);
    return (
        <>
        {!data.length?
        <div className=' w-full mb-5' >
            <img src={process.env.PUBLIC_URL + "./image/image.png"} alt="" className='w-1/3 ' style={{ margin:"0 auto" }}/>
            <p className=' text-3xl text-center text-slate-400'>Please Book Your Appointment</p>
        </div>
        :
        <>
            {data.map((data) => (
                <div className=" w-full  lg:flex mt-10 mb-10  ">

                    <div className='w-11/12' style={{ margin: "0 auto" }}>
                        <div className=" border border-gray-400  bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between ">
                            <div>

                                <div className="text-white font-bold text-xl mb-2 bg-sky-700 p-3">{data.doctorId.specialist.appointName}</div>
                                {
                                    data.present?<Ratings doctor={data.doctorId} rating={data.doctorId.rating} />:<ShowRating rating={data.doctorId.rating}/>
                                }
                                
                               
                            </div>
                            <div className='mb-4'>
                            <p className="text-gray-700 text-xl font-semibold"><span className=' text-orange-700'>Name - </span>{data.name}</p>
                            <p className="text-gray-700 text-xl font-semibold"><span className=' text-orange-700'>Address - </span> {data.address}</p>
                            <p className="text-gray-700 text-xl font-semibold"><span className=' text-orange-700'>Date - </span> {moment(data.date).format('YYYY-MM-DD')}</p>
                            <p className="text-gray-700 text-xl font-semibold"><span className=' text-orange-700'>Time - </span>{data.time}</p>
                            </div>
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-full border border-slate-800 mr-4" src={data.doctorId.doctorImage} alt="Avatar of Jonathan Reinink" />
                                <div className="text-sm">
                                    <p className="text-sky-700 font-semibold leading-none text-lg">Dr. {data.doctorId.doctorName}</p>

                                </div>
                            </div>
                            <div>
                                {data.absent?
                                <div>
                                <p className=' float-right text-red-600 flex border border-red-600 p-2'><AiOutlineWarning className=' font-bold text-3xl '/><span className='mt-1 font-bold'>Sorry,Cancel Your Appointment</span></p>
                               </div>:
                                <>
                              {data.present? <p className=' float-right text-green-600 flex border border-green-600 p-2'><TiTick className=' font-bold text-3xl '/><span className='mt-1 font-bold'>Thanks For Coming</span> </p> 
                              :
                              <button class="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4 float-right">
                              Booking
                         </button>
                              }
                              </>
                               
                                }
                            </div>
                        </div>
                    </div>

                </div>
            ))
            }
            </>
            }
        </>

    )
}

export default MyAppointment