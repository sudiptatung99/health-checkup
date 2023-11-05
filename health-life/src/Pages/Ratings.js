import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { AiOutlineStar } from "react-icons/ai";
import {AiFillStar} from "react-icons/ai";
import { useSelector } from 'react-redux';
import { selectUserToken } from '../Redux/UserSlice';
import {FaStarHalfAlt} from "react-icons/fa"
const Ratings = ({doctor,rating}) => {
  const [number,setNumber]=useState(rating)
  const token = useSelector(selectUserToken)
  const ratingData=(i)=>{
    setNumber(i+1)
    axios.post("http://localhost:5000/rating/rating",{data:i+1,doctorId:doctor._id},{
      headers: {
        authentication: token
    }
    })
    .then((res)=>{
      console.log(res.data);
      window.location.reload()
    })
    .catch((res)=>{
      console.log(res);
    })
    
  }
  return (
    <div className='flex'>
      {
        [0,1,2,3,4].map((i) =>
        number>=i+1?
        (
          <AiFillStar className='text-2xl text-yellow-600' style={{ cursor:"pointer" }} onClick={()=>ratingData(i)}/>
           
        
          )
          :number>=i+0.5?(<FaStarHalfAlt className=' text-yellow-600' style={{ cursor:"pointer",fontSize:'21px' }} onClick={()=>ratingData(i)}/>)
          :(
            <AiOutlineStar className='text-2xl text-yellow-600' style={{ cursor:"pointer" }} onClick={()=>ratingData(i)} />
        ))
        // )
      }
      {/* <AiOutlineStar/> */}
    </div>
  )
}

export default Ratings