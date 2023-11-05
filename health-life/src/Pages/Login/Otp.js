import React from 'react'

const Otp = () => {
   const handleotp=()=>{

    }
    return (
        <div className='mt-20 w-full '>

            <div className='text-center'>
                <div className='mb-6'>
                    <input type="email" className='form-control mb-2  w-1/2 px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white  focus:outline-none  focus:border-blue-600 ' placeholder='Enter your email id' onChange={handleotp} />
                </div>
            </div>
        </div>
    )
}

export default Otp