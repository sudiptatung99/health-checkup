

import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAdminToken } from '../../Redux/Useslice';

const NewAppoint = () => {
    const [appointData, setappointData] = useState({
        Service: "",
        description: "",
        appointImage: []

    })
    const admin = useSelector(selectAdminToken)
    const [errors,seterrors] = useState({})
    const [images, setImage] = useState()
    // var schema = Joi.object().keys({
    //     Service: Joi.string().required(),
    //     description: Joi.string().required()
    //   });
    const handledata = (e) => {
        const name = e.target.name;

        setappointData({ ...appointData, [name]: e.target.value })
        // const result=schema.validate({[name]: e.target.value},{errors: { label: 'key', wrap: { label: false } } })
        // const {error} = result
        // if(error){
        //     const errorData = {};

        //       const name = error.details[0].path;
        //       const message = error.details[0].message;

        //       errorData[name] = message;

        //     seterrors(errorData);

        // }
    }

    const fileupload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setappointData({ ...appointData, appointImage: e.target.files[0] })


    }

    const submit = async (e) => {
        e.preventDefault()
        const { Service, description, appointImage } = appointData
        var data = new FormData();
        data.append('appointName', Service)
        data.append('description', description)
        data.append('appointImage', appointImage)
        axios.post("http://localhost:5000/appointData/appoint", data,{
            headers:{
                authentication: admin
            }
        })
            .then((res) => {
                if(res.status==200){
                    toast.success("New service Create successfully", {
                        position: toast.POSITION.TOP_CENTER,
          
                      });
                      setInterval(function() { window.location.reload() }, 2000);
                }
            })
            .catch((res) => {
                const userError = {};
               
                if (res.response.status === 400) {
                    
                    if (res.response.data.data === false) {
                        res.response.data.message.map((err) => {
                            userError[err.context.label] = err.message
                        })
                        
                        
                    } else {
                        userError['error'] = res.response.data
                        toast.error(res.response.data, {
                            position: toast.POSITION.TOP_CENTER,
              
                          });
                    }
                }
                
                seterrors(userError)
                // const name = error.details[0].path;
                // const message = error.details[0].message;
            })
        // console.log(res.response.data.message))
    }


    return (
        <div>
            <div className="card card-primary mt-5 lg:mx-7  ">
                <div className="card-header text-center ">
                    <p className=' font-weight-bold text-lg'>New Service</p>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form onSubmit={submit} >
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Service Name</label>
                            <input type="text" name='Service' className={`form-control ${errors.appointName ? "border-red-600": ""} `} id="exampleInputEmail1" placeholder="Enter service Name" onChange={handledata} />
                            <span className='mt-2 text-red-600'>{errors.appointName}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">description</label>
                            <input type="text" name='description' className={`form-control ${errors.description ? "border-red-600": ""}  `} id="exampleInputPassword1" placeholder="description" onChange={handledata} />
                            <span className='mt-2 text-red-600'>{errors.description}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputFile">Appoint Image</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" accept="image/png, image/gif, image/jpeg" onChange={fileupload} />

                                </div>


                            </div>
                        </div>
                        {images ? <div className="form-group">
                            <img src={images} alt="" className=' h-20 w-20' />
                        </div> : ""}

                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button className="btn btn-outline-primary" >Submit</button>
                        <Link to={"/addappointment"}><button className="btn btn-outline-warning mx-5 px-3" ><span className='flex'><IoMdArrowRoundBack className='mt-1'/>Back</span> </button></Link>
                    </div>
                </form>
            </div>
            <ToastContainer className={' mt-7'} />
        </div>
    )
}

export default NewAppoint