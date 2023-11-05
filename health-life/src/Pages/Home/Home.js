import React, { useEffect } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { IoIosHourglass } from 'react-icons/io'
import { MdHourglassDisabled } from 'react-icons/md'
import Doctor from './Doctor'
import jwt from 'jwt-decode';
import { useSelector } from 'react-redux'
import { selectUserToken } from '../../Redux/UserSlice'
import OurService from './OurService'
import Footer from '../../Common/Footer'
import { Link } from 'react-router-dom'

const Home = () => {

  // const token=useSelector(selectUserToken)


  return (
    <div className='w-full overflow-x-hidden overflow-y-hidden'>
      <div className=' w-11/12' style={{ margin: "0 auto" }}>
        <div className='flex md:flex-row flex-col-reverse justify-around mx-3'>
          <div className='lg:w-2/4 w-full lg:mt-10 mt-2' data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine">
            <h2 className='text-center font-semibold text-xl text-cyan-600'>Keep Smile</h2>
            <hr className='border-b-4 border-l-neutral-900 ' />
            <p className='mt-2 font-serif'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora sed deleniti tenetur veniam modi consequatur. Eligendi assumenda porro nostrum, aut corporis a minus suscipit eos vero perferendis omnis quis illo?
              Tenetur harum beatae consectetur odio tempora vel, asperiores deleniti minima! Perspiciatis incidunt tenetur velit doloremque exercitationem ab nam officia quas distinctio id, voluptatem, labore aspernatur quibusdam vero dolores eligendi! Alias!
              Odit minima alias quasi rerum harum, quibusdam, magni totam, voluptatum saepe culpa consectetur. Nesciunt dicta impedit vero vitae dignissimos eligendi dolore tempora tempore cumque hic repudiandae, nulla ex. Modi, adipisci.
              Nostrum vero totam exercitationem quos mollitia labore nobis officiis iure dolores minus veniam, corporis maiores aliquam debitis fugit molestias! Eaque similique minima accusamus fugit doloribus. Quam cumque in dicta similique!.</p>
          </div>
          <div className='lg:w-2/5 w-full  mt-8' data-aos="fade-left"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine" >
            <div style={{ margin: "0 auto" }}>
              <img src="https://absolute-health.org/media/wysiwyg/Banner_content_Innovation_Check_up_3.jpg" alt="" className='lg:w-3/4 w-full rounded-lg' style={{ margin: "0 auto" }} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-7 mx-3 w-11/12' data-aos="fade-up"
        data-aos-duration="3000" style={{ margin: "0 auto" }}>
        <div className='lg:flex justify-around block lg:mt-16 mt-4'>
          <div className='lg:w-1/5 w-full bg-slate-600 rounded-lg  '>
            <div className='text-center py-7 cursor-pointer'>
              <IoIosHourglass className='text-2xl text-white' style={{ margin: "0 auto" }} />
              <p className=' text-white font-semibold text-xl'>Opening Hour <span className='text-amber-500'>10 AM</span></p>
            </div>
          </div>
          <div className='lg:w-1/5 w-full bg-slate-600 rounded-lg lg:my-0 my-4 '>
            <div className='text-center py-7 cursor-pointer'>
              <FaMapMarkedAlt className='text-2xl text-white' style={{ margin: "0 auto" }} />
              <p className=' text-white font-semibold text-xl '>Map</p>
            </div>
          </div>
          <div className='lg:w-1/5 w-full bg-slate-600 rounded-lg '>
            <div className='text-center py-7 cursor-pointer'>
              <MdHourglassDisabled className='text-2xl text-white' style={{ margin: "0 auto" }} />
              <p className='  text-white font-semibold text-xl'>Close Time <span className='text-amber-500'>4 PM</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className='mb-5 mx-3 mt-4 text-center  '>
        <div className='lg:flex block justify-between '>
          <div className=' lg:w-2/5 lg:mb-0 mb-3 w-11/12 lg:mt-20 mt-4' data-aos="fade-right"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="3000" >
            <img src="https://thumbs.dreamstime.com/b/male-doctor-portrait-isolated-white-background-56744085.jpg" alt="" className='text-center w-full h-4/5' />
          </div>
          <div className='lg:w-1/2 w-full mt-3' data-aos="fade-up"
            data-aos-anchor="#example-anchor"
            data-aos-offset="500"
            data-aos-duration="3000" >
            <p className=' text-3xl  font-bold text-neutral-900'>Our Service</p>
            <hr className='mt-2 border-b-4 border-l-neutral-900 w-1/3 mb-5  ' style={{ margin: "0 auto" }} />
            <OurService />
           <Link to={"/Appointment"}> <button class="bg-blue-500 py-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5 mb-3">
              More Service..
            </button></Link>

          </div>
        </div>
      </div>
      <div>
        <div>
          <div className='text-center mb-5'>
            <p className=' font-bold text-3xl text-neutral-900'>Our Doctors</p>
            <hr className='mt-2 border-b-4 border-l-neutral-900 w-1/3  ' style={{ margin: "0 auto" }} />
          </div>
          <div className='mt-4 mb-56 lg:w-3/4 w-11/12 lg:mx-6 mx-3' style={{ margin: "0 auto" }} data-aos="fade-up"
            data-aos-duration="3000">
            <Doctor />
          </div>

        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home;