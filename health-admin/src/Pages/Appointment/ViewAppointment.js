import axios from 'axios';
import moment from 'moment/moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { selectAdminToken } from '../../Redux/Useslice';
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
const ViewAppointment = () => {
  const admin = useSelector(selectAdminToken)
  const [appoint, setAppoint] = useState([])
  const [search, setSerach] = useState([])
  useEffect(() => {
    axios.get("http://localhost:5000/appointment/getAllAppointment", {
      headers: {
        authentication: admin
      }
    }).then((res) => {
 
      setAppoint(res.data);
      setSerach(res.data)
    })
  }, []);
  const submit = (e) => {
    e.preventDefault()
  }
  const searchHandaler = (e) => {
    console.log(e.target.value);
    if (e.target.value == "") {
      setSerach(appoint)
    } else {
      
      //   const filterData = appoint.map(data =>data.number)
      //   console.log(filterData);
      // setSerach(filterData)
      // }else{
        const filterData= appoint.filter(data=>data.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setSerach(filterData)
     }
    //  setvalues(e.target.value)

    
  }
  var i=0;
  return (

    <div>
      <div className="card mt-5">

        <div className="card-header">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form action="simple-results.html" onSubmit={submit}>
                <div className="input-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Search By user name" onChange={searchHandaler} />

                </div>
              </form>
            </div>
          </div>
          <div className="card-tools">

          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body p-0  overflow-x-scroll scroll">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: 10 }}>No.</th>
                <th>User Name</th>
                <th>Use Number</th>
                <th >User Address</th>
                <th >Appoint Name</th>
                <th >Doctor</th>
                <th >Time and Date</th>
                <th >Status</th>
                
              </tr>
            </thead>
            <tbody>
              {
                search.map(data => (
                  <tr>
                    <td>{i=i+1}</td>
                    <td>{data.name}</td>
                    <td>{data.number}</td>
                    <td>{data.address}</td>
                    <td>{data.doctorId.specialist.appointName}</td>
                    <td>{data.doctorId.doctorName}</td>
                    <td>{moment(data.date).format('MMMM Do YYYY , dddd')}</td>
                    <td>
                      {
                        !data.present ?
                          <h4 className=' text-red-600 text-base'><ImCross /></h4>
                          : <h4 className=' text-green-500 text-xl'><TiTick /></h4>
                      }
                    </td>
                    
                  </tr>
                ))
              }



            </tbody>
          </table>
        </div>
        {/* /.card-body */}
      </div>
    </div>


  )
}

export default ViewAppointment