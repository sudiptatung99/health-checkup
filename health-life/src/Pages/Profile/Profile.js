import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RiEdit2Fill } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { selectUserToken } from '../../Redux/UserSlice';
import "./Profile.css"
const Profile = () => {
  const token = useSelector(selectUserToken)
  const [dist, setDist] = useState([
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Burdwan (Bardhaman)",
    "Cooch Behar",
    "Dakshin Dinajpur (South Dinajpur)",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Kalimpong",
    "Kolkata",
    "Malda",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Medinipur (West Medinipur)",
    "Purba Medinipur (East Medinipur)",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur (North Dinajpur)"
  ])
  const [user, setUser] = useState({
    image: ""
  })
  const [error, setError] = useState({})
  const [userData, setUserData] = useState({
    userImage: [],
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    district: "",
    pinCode: ""

  })
  useEffect(() => {
    axios.get("http://localhost:5000/user/getUser", {
      headers: {
        authentication: token
      }
    }).then((res) => {
      if (res.status == 200) {
        setUserData({ ...userData, firstName: res.data.firstName, lastName: res.data.lastName, email: res.data.email })
        setUser({ ...user, image: res.data.image[0].url })
      }
    })
      .catch((res) => {
        console.log(res);
      })

    axios.get('http://localhost:5000/profile/getprofile', {
      headers: {
        authentication: token
      }
    })
      .then((res) => {
        setUserData({...userData,firstName: res.data.userId.firstName, lastName: res.data.userId.lastName, email: res.data.userId.email,phoneNumber:res.data.phoneNumber,address:res.data.address,district:res.data.district,pinCode:res.data.pinCode})
      })
      .catch((res) => {
        console.log(res);
      })


  }, [token]);




  const [image, setImage] = useState()

  const handleData = (e) => {
    const name = e.target.name;
    setUserData({ ...userData, [name]: e.target.value })

  }
  const fileHandle = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
    if(e.target.files[0].size>=307200){
      toast.error('Select image size under 300kb', {
        position: toast.POSITION.TOP_CENTER,

      });
    }else{
       setUserData({ ...userData, userImage: e.target.files[0] })
    }
 

  }
  const handleEdit = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }
  const submit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", userData.firstName)
    formData.append("lastName", userData.lastName)
    formData.append("email", userData.email)
    formData.append("phoneNumber", userData.phoneNumber)
    formData.append("address", userData.address)
    formData.append("district", userData.district)
    formData.append("pinCode", userData.pinCode)
    formData.append("profile", userData.userImage)
    axios.post("http://localhost:5000/profile/user", formData, {
      headers: {
        authentication: token
      }
    })
      .then((res) => {
        if (res.status==200) {
          console.log(res.data);
          toast.success("Profile successfully updated", {
            position: toast.POSITION.TOP_CENTER,

          });
          setTimeout(function () {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((res) => {
        var userError = {}
        console.log();
        if (res.response.data.data === false) {
          res.response.data.message.map((err) => {
            userError[err.context.label] = err.message
          })
        } else {
          toast.error(res.data.errorMessage, {
            position: toast.POSITION.TOP_CENTER,

          });

          userError['userError'] = res.data.errorMessage
        }
        setError(userError)
      })
  }
  // console.log(userData);
  return (
    <div className="bg-gray-300 ">
      <div className="container mx-auto pb-20 pt-20 ">
        <div>
          <div className="bg-white relative shadow rounded-lg w-5/6 md:w-5/6  lg:w-4/6 xl:w-3/6 mx-auto  ">
            <div className="flex justify-center">
              <div className=" rounded-full mx-auto  -top-20 w-24 lg:w-32 h-24  lg:h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110">
                {image ?
                  <img src={image} alt="" className="rounded-full w-full h-full" />
                  :
                  <>
                    {user.image ?
                      <img src={user.image} alt='' className="rounded-full w-full h-full" /> :
                      <img src={process.env.PUBLIC_URL + './image/pp.jpg'} alt="" className="rounded-full w-full h-full" />
                    }
                  </>
                }
                <label for="file-input">
                  <RiEdit2Fill className=' z-10 text-3xl text-blue-400 float-right relative -top-8 left-2 ' style={{ cursor: "pointer" }} onClick={image} />
                </label>
                <input id="file-input" type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={fileHandle} />
              </div>
            </div>

            <div className="mt-5">
              <h1 className="font-bold text-center text-2xl text-gray-900">{userData.firstName} {userData.lastName}</h1>

              <div className="w-full">

                <div className="mt-5 w-full flex flex-col items-center overflow-hidden text-sm">

                  <form className=" w-11/12 mx-2 mb-3">
                    <div className='flex-row justify-between lg:flex'>
                      <div className={`items-center border-b ${error.firstName ? "border-red-600" : "border-blue-400 mb-3"} py-2 mb-3 lg:w-2/5`}>
                        <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={userData.firstName} name='firstName' placeholder="Enter your First Name" onChange={(e) => handleEdit(e)} />
                      </div>
                      <span className=' text-red-600 text-base'>{error.firstName}</span>
                      <div className={`items-center border-b ${error.lastName ? "border-red-600" : "border-blue-400 mb-3"} py-2 mb-3 lg:w-2/5`}>
                        <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={userData.lastName} name='lastName' placeholder="Enter your Last Name" onChange={(e) => handleEdit(e)} />
                      </div>
                    </div>
                    <span className=' text-red-600 text-base'>{error.lastName}</span>
                    <div className="items-center border-b border-blue-400 py-2 mb-3">
                      <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-2 px-2 leading-tight focus:outline-none" type="text" value={userData.email} name='email' placeholder="Enter your Email" />
                    </div>
                    <div className={`items-center border-b ${error.phoneNumber ? "border-red-600" : "border-blue-400 mb-3"} py-2`}>
                      <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" value={userData.phoneNumber} maxLength={10} name='phoneNumber' placeholder="Enter your phone Number" onChange={(e) => handleEdit(e)} />
                    </div>
                    <span className=' text-red-600 text-base'>{error.phoneNumber}</span>
                    <div className={`items-center border-b ${error.address ? "border-red-600" : "border-blue-400 mb-3"} py-2`}>
                      <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" value={userData.address} name='address' placeholder="Enter your Address" onChange={(e) => handleEdit(e)} />
                    </div>
                    <span className=' text-red-600 text-base'>{error.address}</span>
                    <div className={`items-center border-b ${error.district ? "border-red-600" : "border-blue-400 mb-3"} py-2`}>
                      <select name="district" id="" className=" text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"  onChange={(e) => handleEdit(e)} >
                        {
                          userData.district?
                          <option hidden>{userData.district}</option>:
                          <option hidden>-- Select District --</option>}
                        {
                          dist.map(data => (
                            <>
                              <option value={data}>{data}</option>
                            </>
                          ))
                        }
                      </select>

                    </div>
                    <span className=' text-red-600 text-base'>{error.district}</span>
                    <div className={`items-center border-b ${error.pinCode ? "border-red-600" : "border-blue-400 mb-3"} py-2`}>
                      <input className="text-lg appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" value={userData.pinCode} maxLength={6} placeholder="pin Code" name='pinCode' aria-label="Full name"onChange={(e) => handleEdit(e)} />
                    </div>
                    <span className=' text-red-600 text-base'>{error.pinCode}</span>
                  </form>
                  <button className=' float-right mb-8 hover:bg-blue-600 py-2 round rounded-lg mx-5 mt-3 text-xl border hover:text-white font-semibold border-blue-600 px-3 text-blue-600' style={{ cursor: "pointer" }} onClick={submit} >save Changes</button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer className={"mt-4"} />
        </div>
      </div>
    </div>


  )
}

export default Profile