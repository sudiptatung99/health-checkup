import React from 'react'

const Contract = () => {
  return (
    <div>
      <div className="font-mono ">
        {/* Container */}
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            {/* Row */}
            <div className="w-full xl:w-4/5 lg:w-11/12 flex lg:mt-10 mt-0">
              {/* Col */}
              <div className="w-full h-full bg-gray-400 hidden lg:block lg:w-3/5 bg-cover rounded-l-lg">
                <img src="https://www.felixhospital.com/sites/default/files/2022-03/health-checkup2.png" alt="" className='h-full w-full' />
              </div>
              {/* Col */}
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">Welcome To Healthy Life</h3>
                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                      Username
                    </label>
                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                      Phone Number
                    </label>
                    <input className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="Phone Number" type="text" placeholder="Phone Number" />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                      say your problem...
                    </label>
                    <textarea name="problem" id="" cols="30" rows="10" placeholder="problem..." className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" style={{ resize:'none' }}></textarea>
                  </div>

                  <div className="mb-6 text-center">
                    <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
                     Submit
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Contract