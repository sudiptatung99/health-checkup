import React, { useEffect, useState } from 'react';
import './Appoint.css';
import moment from 'moment/moment';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../Redux/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowAppointment = ({ appointment }) => {
    const { _id, name, number, date, doctorId,time } = appointment
    const [data, setData] = useState({})
    const [appoint,setAppoint]=useState({})
    const userToken = useSelector(selectUserToken)


    useEffect(() => {

        if (doctorId) {
            setData(doctorId)
            setAppoint(doctorId.specialist)
        }

    }, [doctorId]);


    const edit = (e) => {
        e.preventDefault();

    }
    const del = (e) => {
        e.preventDefault();
        console.log(userToken);
        axios.delete(`http://localhost:5000/appointment/delete/${_id}`, {
            headers: {
                authentication:userToken
}
        })
            .then((res) => {
                if (res.status == 200) {
                    // message:"Successfully Deleted"
                    // window.location.reload()
                    toast.warning("Successfully Deleted", {
                        position: toast.POSITION.TOP_CENTER,
            
                      });
                      setTimeout(function(){
                        window.location.reload();
                     }, 2000);
                }

            })

    }

    return (
        <div className='mx-3 overflow-x-scroll scroll'>
            {name?
            <table className='lg:w-3/4 w-full ' style={{ margin: "0 auto" }}>
                <thead>
                    <tr className=''>
                        <th className='mx-2'>Name</th>
                        <th className='mx-2'>Phone Number</th>
                        <th className='mx-2'>Appointment Date</th>
                        <th className='mx-2'>Time</th>
                        <th className='mx-2'>Appointment Name</th>
                        
                        <th className='mx-2'>Doctor Name</th>
                        <th className='mx-2'>Operation</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='text-center'>
                        <td className='px-2'>{name}</td>
                        <td className='px-2'>{number}</td>
                        <td className='px-2'>{moment(date).format("DD-MM-YYYY")}</td>
                        <td className='px-2'>{time}</td>
                        <td className='px-5'>{appoint.appointName}</td>
                        <td className='px-5'>{data.doctorName}</td>
                        <td className='mx-2 flex border-none  justify-center' >
                            <p className=' mx-2 bg-red-500 p-1 rounded-lg cursor-pointer px-3 text-white my-2 flex' onClick={(e) => del(e)}><MdDelete className='mt-1' /><span className='mx-1' >Delete</span></p>
                        </td>
                    </tr>
                </tbody>



            </table>:""
}
            <ToastContainer className={'mt-14'}/>
        </div>
    )
}

export default ShowAppointment