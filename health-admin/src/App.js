import logo from './logo.svg';
import './App.css';
import Header from './Common/Header';
import Sider from './Common/Sider';
import Dasboard from './Pages/Dasboard/Dasboard';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ViewAppointment from './Pages/Appointment/ViewAppointment';
import AddAppointment from './Pages/Appointment/AddAppointment';
import Login from './Pages/Login/Login';
import User from './Pages/User/User';
import NewAppoint from './Pages/Appointment/NewAppoint';
import Doctor from './Pages/Doctor/Doctor';
import Adddoctor from './Pages/Doctor/Adddoctor';
import UserView from './Pages/User/UserView';
import About from './Pages/About/About';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN, selectAdminToken } from './Redux/Useslice';
import Cookies from 'universal-cookie';
import Contract from './Pages/Contract/Contract';

function App() {
  // const admin = localStorage.getItem("adminToken")
  const dispatch = useDispatch()
  const admin = useSelector(selectAdminToken)
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("adminToken")

    axios.get("http://localhost:5000/protect", {
      headers: {
        authentication: token
      }
    }).then((res) => {
      if (res.status == 200) {
        dispatch(LOGIN(token))

      }

    })
      .catch((res) => {
        if (res.response.status == 400) {
          cookies.remove("adminToken")

        }
      })

    //  console.log(admin);

  }, []);

  return (
    <div>
      {
        !admin ?
          <Login /> :
          <BrowserRouter>
            <Header />
            <Sider />
            <div className="content-wrapper">
              <Routes>
                <Route path='*' element={<Dasboard />} />
                <Route path='/' element={<Dasboard />} />
                <Route path='/viewappointment' element={<ViewAppointment />} />
                <Route path='/newappoint' element={<NewAppoint />} />
                <Route path='/doctor' element={<Doctor />} />
                <Route path='/adddoctor' element={<Adddoctor />} />
                <Route path='/addappointment' element={<AddAppointment />} />
                <Route path='/user' element={<User />} />
                <Route path='/:id' element={<UserView />} />
                <Route path='/contractus' element={<Contract />} />
                <Route path='/addappointment' element={<AddAppointment />} />

              </Routes>
            </div>
          </BrowserRouter>
      }

    </div>
  );
}

export default App;
