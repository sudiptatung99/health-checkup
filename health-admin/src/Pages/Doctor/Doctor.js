import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAdminToken } from '../../Redux/Useslice'

const Doctor = () => {
    const [doctor,setDoctor] = useState([])
    const submit=(e)=>{
        e.preventDefault()

    }
    const [values,setvalues] = useState('')
    const [search,setSearech] = useState([])
    const admin = useSelector(selectAdminToken)
    useEffect(() => {
      
        axios.get("http://localhost:5000/doctor/doctor",{
            headers:{
                authentication: admin
            }
        })
          
        .then((res)=>{
           if(res.status===200){
            
            setDoctor(res.data.data);
            setSearech(res.data.data)
            
           }
        })
        .catch((res)=>{
            
        })
       
    }, []);

   const searchHandaler=(e)=>{
    
    if(e.target.value==""){
        setSearech(doctor)
        
    }else{
       const filterData= doctor.filter(data=>data.doctorName.toLowerCase().includes(e.target.value.toLowerCase()))
       setSearech(filterData)
    }
    setvalues(e.target.value)
    
   }
   

  var i=0
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    <Link to={"/adddoctor"}><button className='my-5 justify-center'><span className="badge bg-primary px-3 py-3 text-base">Add new Doctor</span></button></Link>
                </div>
                <div className="card-header">
                    
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <form action="simple-results.html" onSubmit={submit}>
                                <div className="input-group">
                                    <input type="search" className="form-control form-control-lg" placeholder="Search By Doctor Name" onChange={searchHandaler} />
                                   
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
                                <th>Doctor Name</th>
                                <th>Doctor Image</th>
                                <th>Mobile Number</th>
                                <th >Specialist</th>
                                <th >Time</th>
                                <th >Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                           {
                            
                           search.map((data)=>(
                            
                           <tr key={data._id}>
                            
                                <td>{i+=1}</td>
                                <td>{data.doctorName}</td>
                                <td>
                                    <img src={data.doctorImage} alt="" className=" w-14 h-14" />
                                </td>
                                <td>{data.mobileNumber}</td>
                                <td>{data.specialist.appointName}</td>
                                <td>{data.days}</td>
                                <td>
                                    <div>
                                        <span className="badge bg-success px-3 py-2 text-base mx-2 " style={{ cursor: "pointer" }}>Edit</span>
                                        <span className="badge bg-danger px-3 py-2 text-base mt-2 " style={{ cursor: "pointer" }}>Delete</span>
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
        </div>
    )
}

export default Doctor