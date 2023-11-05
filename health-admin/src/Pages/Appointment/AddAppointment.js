import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { selectAdminToken } from '../../Redux/Useslice'
import "./Appoint.css"
const AddAppointment = () => {
  const [service, setService] = useState([])
  const [search, setSearch] = useState([])
  const admin = useSelector(selectAdminToken)
  useEffect(() => {
    axios.get("http://localhost:5000/appointData/getAppoint", {
      headers: {
        authentication: admin
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setService(res.data.data);
          setSearch(res.data.data)
        }
      })
  }, [])
  const submit = (e) => {
    e.preventDefault()
  }
  const searchHandaler = (e) => {
    if (e.target.value == "") {
      setSearch(service)
    } else {
      const filterData = service.filter(data => data.appointName.toLowerCase().includes(e.target.value.toLowerCase()))
      setSearch(filterData)

    }

  }

  const deleteData = (e) => {
     axios.delete(`http://localhost:5000/appointData/deleteData/${e}`)
     .then((res)=>{
      toast.success(res.data, {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(function(){
        window.location.reload(1);
     }, 2000);
     }).catch((res)=>{
      toast.success("Some error occur", {
        position: toast.POSITION.TOP_CENTER,
      });
     })
  }





  var i = 0
  return (
    <div >
      {/* <div className="col-md-6"> */}

      <div className="card">
        <div className="card-header">
          <Link to={"/newappoint"}><button className='my-5 justify-center'><span className="badge bg-primary px-3 py-3 text-base">Add new service</span></button></Link>
        </div>
        <div className="card-header">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <form action="simple-results.html" onSubmit={submit}>
                <div className="input-group">
                  <input type="search" className="form-control form-control-lg" placeholder="Search By Service Name" onChange={searchHandaler} />

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
                <th>service Name</th>
                <th>service Image</th>
                <th >Operation</th>
              </tr>
            </thead>
            <tbody>
              {search.map((data) => (
                <tr key={data._id}>


                  <td>{i = i + 1}</td>
                  <td>{data.appointName}</td>
                  <td>
                    <img src={data.appointImage} alt="" className=" w-14 h-14" />
                  </td>
                  <td>
                    <div>

                      <span className="badge bg-danger px-3 py-2 text-base mt-2 " style={{ cursor: "pointer" }} onClick={()=>deleteData(data._id)}>Delete</span>
                    </div>
                  </td>


                </tr>
              ))
              }



            </tbody>
          </table>
        </div>
        {/* /.card-body */}
      </div>
      <ToastContainer />
    </div>

    // </div>
  )
}

export default AddAppointment