import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Aos from 'aos';
import Header from './Common/Header';
import About from './Pages/About/About';
import Appointment from './Pages/Appointment/Appointment';
import Contract from './Pages/Contract/Contract';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Sinein from './Pages/Sinein/Sinein';
import { useEffect } from 'react';
import ProtectRoute from './ProtectRoute';
import Profile from './Pages/Profile/Profile';
import Footer from './Common/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE, LOGIN, LOGOUT, NAME, PROFILE, selectUserToken } from './Redux/UserSlice';
import { useState } from 'react';
import MyAppointment from './Pages/MyAppointment/MyAppointment';
import Cookies from 'universal-cookie';
import ForgetPassword from './Pages/Login/ForgetPassword';
function App() {
  const [active, setActive] = useState('')
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const userToken = useSelector(selectUserToken)
  const token = cookies.get("authToken")
  useEffect(() => {
    Aos.init({
      duration: 1000
    });
  }, []);
  useEffect(() => {
    // axios.get("http://localhost:5000/protect", {
    //   headers: {
    //     authentication: token
    //   }
    // }).then((res) => {
    //   if (res.status === 200) {
    //     dispatch(LOGIN({
    //       userToken: token,
    //       success: true
    //     }))
    //   }
    // })
    //   .catch((res) => {
    //     console.log(res);
    //     if (res.response.status == 400) {
    //       cookies.remove("authToken")
    //       dispatch(LOGOUT())
    //     }
    //   })
    const data = async () => {
      const userData = await axios.get("http://localhost:5000/user/getUser", {
        headers: {
          authentication: token
        }
      }).then((res) => {
        if (res.status === 200) {
          dispatch(LOGIN({
            userToken: token,
            success: true
          }))
          
          dispatch(NAME({
            firstName: res.data.firstName,
            success: true
          }))
          dispatch(IMAGE({
            image: res.data.image[0].url,
            success: true
          }))

        }
      })
        .catch((res) => {
          if (res.response.status === 400) {
            cookies.remove("authToken")
            dispatch(LOGOUT())
          }
        })
      return userData;
    }
    data();

  }, [token])


  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path='/' element={ <Home/>} />
          <Route path='/appointment' element={<ProtectRoute children={<Appointment />} user={token} />} />
          <Route path='/myappointment' element={<ProtectRoute children={<MyAppointment />} user={token} />} />
          <Route path='/profile' element={<ProtectRoute children={<Profile />} user={token} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contract' element={<ProtectRoute children={<Contract />} user={token} />} />
          <Route path='/newPassword' element={<ForgetPassword/>} />
          
          <Route path='/login' element={userToken?<Home/> : <Login />} />

          <Route path='/register' element={ userToken?<Home/>:<Sinein />} />

        </Routes>

      </BrowserRouter>


      

    </div>
  );
}

export default App;
