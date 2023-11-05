import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAdminToken } from '../../Redux/Useslice'

const User = () => {
    const [users, setUsers] = useState([])
    const [search,setSearech] = useState([])
    const admin = useSelector(selectAdminToken)
    useEffect(() => {
        axios.get("http://localhost:5000/user/alluser",{
            headers:{
                authentication: admin
            }
        })
            .then((res) => {
                setUsers(res.data);
                setSearech(res.data);
            })
            .catch((res)=>{

            })
    }, [])
    const submit = () => {

    }
    const searchHandaler= (e)=>{
        if(e.target.value==""){
            setSearech(users)
            
        }else{
           const filterData= users.filter(data=>data.email.toLowerCase().includes(e.target.value.toLowerCase())||data.firstName.toLowerCase().includes(e.target.value.toLowerCase()))
           setSearech(filterData)
        }
        // setvalues(e.target.value)
        
       }
    var i=0;
    return (
        <div>
            <div className="card">

                <div className="card-header">

                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            <form action="simple-results.html" onSubmit={submit}>
                                <div className="input-group">
                                    <input type="search" className="form-control form-control-lg" placeholder="search by username or email id" onChange={searchHandaler} />
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
                                <th >Email</th>
                                <th >Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                search.map((data)=>(

                              
                                <tr>
                                <td>{i=i+1}</td>
                                <td>{data.firstName} {data.lastName}</td>
                                <td>{data.email} </td>
                                <td>
                                    <div>
                                        <Link to={`/${data._id}`} ><span className="badge bg-warning px-3 py-2 text-base mt-2 " style={{ cursor: "pointer" }}>View</span></Link>


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

export default User