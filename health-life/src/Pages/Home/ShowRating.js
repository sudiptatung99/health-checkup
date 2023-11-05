import React, { useState } from 'react'
import { AiOutlineStar } from "react-icons/ai";
import {AiFillStar} from "react-icons/ai";
import {FaStarHalfAlt} from "react-icons/fa"
const ShowRating = ({rating}) => {
    const [number,setNumber]=useState(rating)
  return (
    <div className='flex'>
        {
        [0,1,2,3,4].map((i) =>
        number>=i+1?
        (
          <AiFillStar className='text-2xl text-yellow-600' style={{ cursor:"pointer" }} />
        )
        :number>=i+0.5?(<FaStarHalfAlt className=' text-yellow-600' style={{ cursor:"pointer",fontSize:'21px' }}/>)
          :(
            <AiOutlineStar className='text-2xl text-yellow-600' style={{ cursor:"pointer" }}  />
        ))
        // )
      }
    </div>
  )
}

export default ShowRating