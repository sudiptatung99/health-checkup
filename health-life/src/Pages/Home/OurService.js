import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserToken } from '../../Redux/UserSlice';

const OurService = () => {
    const token = useSelector(selectUserToken)
    const [user, setUser] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5000/appointData/getAppoint", {
            headers: {
                authentication: token
            }
        })
            .then((res) => {
                setUser(res.data.data)
            })
            .catch((res) => {
                console.log(res);
            })
    }, [token]);
   
    return (
        <div className=' justify-start'>

            {user.map((data) => (
                <div className=' px-5 inline-block mt-3 '>
                    <div class="w-11/12 lg:w-72 rounded overflow-hidden shadow-lg border border-slate-500 justify-start  text-start" style={{ margin: '0 auto' }}>

                        <div className=' justify-start '>
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">{data.appointName}</div>
                                <p class="text-gray-700 text-base">
                                    {data.description.slice(0,80)}...
                                </p>
                            </div>
                           
                        </div>
                    </div>

                </div>
            ))
           } 
        </div>
    )
}

export default OurService