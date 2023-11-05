import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { selectUserToken } from './Redux/UserSlice';

const ProtectRoute = ({ children, user }) => {
 const location = useLocation();
 
  return (
    <div>


      {
        user ? (
          children
        ) : (
          <Navigate
            to={"/login"}
            state={{ from: location }} />


        )
      }



    </div>
  )
}

export default ProtectRoute