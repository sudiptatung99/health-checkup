import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Appoint.css';
import AppointmentData from './AppointmentData';
import moment from 'moment/moment';


const Appointment = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div>
      <div className='flex justify-between mt-9' >
        <div className=' lg:w-2/3 w-full lg:mt-20 mt-2 lg:mx-20 mx-0' data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
          <Calendar onChange={onChange} value={value} />
        </div>
        <div className=" lg:block hidden " data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine">
          <img src={process.env.PUBLIC_URL + "./image/undraw_medicine_b1ol.png"} alt="" className=' w-5/6 ' />
        </div>
      </div>
      <div className='lg:mt-2 mt-7'>
        <div className=' lg:shadow-lg shadow-none md:w-1/2 w-full border  border-slate-200' style={{ margin: "0 auto" }} data-aos="zoom-in">

          <h3 className=" text-center md:text-2xl text-sm font-bold md:p-3 p-0  "><span className=' text-amber-600'>{moment(value.toUTCString()).format('LLLL').split(" ")[0]} {moment(value.toUTCString()).format("LL")} </span></h3>
        </div>
      </div>
      <div className='w-full mt-10'  >
        <AppointmentData date={value.toUTCString()} />
      </div>
    </div>
  )
}

export default Appointment;