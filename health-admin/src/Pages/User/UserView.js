import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectAdminToken } from '../../Redux/Useslice'

const UserView = () => {
    const admin = useSelector(selectAdminToken)
    const [user, setUser] = useState([])
    const [image, setImage] = useState([])
    const [appoint, setAppoint] = useState([])
    const [specilist, setSpecilist] = useState([])
    const { id } = useParams();
    useEffect(() => {
        axios.post(`http://localhost:5000/userDetails/userallDetails/${id}`)
            .then((res) => {
                // setUser(res.data.userId);
                setAppoint(res.data)
                res.data.map((data) => {
                    setUser(data.userId)
                    setImage(data.userId.image[0])
                     setSpecilist(data.doctorId.specialist)
                })
                // res.data.userId.image.map((data) => {
                //     console.log(data);
                // })d
              
            }).catch((res) => {
                console.log(res);
            })

    }, [])

    return (
        <div>
           { appoint.length==0?
           <h1 className='text-center text-red-600 font-bold mt-10'>*No Appoint This user</h1>
           :
            <section className="content mt-4">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            {/* Profile Image */}
                            <div className="card card-primary card-outline">
                                {/* {user.map((data)=>( */}
                                <div className="card-body box-profile">
                                    <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle" src={image.url} alt="User profile picture" />
                                    </div>
                                    <h3 className="profile-username text-center">{user.firstName}</h3>


                                </div>
                                {/* //    )) } */}
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            {/* About Me Box */}

                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="card">

                                <div className="card-body">
                                    <div className="tab-content">
                                        <div className="active tab-pane" id="activity">
                                            {/* Post */}
                                            {appoint.map((data) => (
                                                <div className="post" key={data._id}>


                                                    <p>{data.name}</p>


                                                    <span className="description">{specilist.appointName} - {moment(data.date).format("MMMM Do YYYY Do dddd")},{data.time}</span>
                                                    <div>
                                                        <p>phone Number - <span>{data.number}</span></p>
                                                        <p>Address - <span>{data.address}</span></p>
                                                    </div>

                                                </div>
                                            ))}



                                        </div>




                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </section>
}
        </div>
    )
}

export default UserView