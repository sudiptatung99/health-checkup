import React, { useEffect } from 'react';
import "./Home.css"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { useState } from 'react';
import ShowRating from './ShowRating';

const Doctor = () => {
  const [doctor, setDoctor] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/doctor/doctor")
      .then((res) => {
        setDoctor(res.data.data)
      })
      .catch((res) => {
        console.log(res);
      })
  }, []);

  return (
    <div className='lg:py-10 py:4 '>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        breakpoints={{
          320: { slidesPerView: 1 },
          480: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 50 },
        }}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {
          doctor.map(user => (
            <SwiperSlide key={user._id}>
              <div className=' shadow-2xl mb-11 w-11/12 '>

                <img src={user.doctorImage} alt="" className='h-64 w-11/12' style={{ margin: '0 auto' }} />
                <div className='w-full pt-3 mx-2 ' >

                  <ShowRating rating={user.rating} />
                  <h6 className=' py-2 font-bold '>Dr. {user.doctorName}</h6>
                </div>

              </div>

            </SwiperSlide>
          ))
        }


      </Swiper>

    </div>
  )
}

export default Doctor