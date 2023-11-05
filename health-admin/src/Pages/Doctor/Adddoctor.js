import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Doctor.css";
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Doctor.css"
import { selectAdminToken } from '../../Redux/Useslice';
import { useSelector } from 'react-redux';
import Loading from '../../Loading/Loading';
const Adddoctor = () => {
    const [doctor, setDoctor] = useState({
        doctorName: "",
        mobileNumber: '',
        specialist: '',
        days: '',
        doctorImage: ''


    })
    const [errorImage,setErrorImage] = useState(null)
    const [load,setLoad] = useState(null)
    const admin = useSelector(selectAdminToken)
    const [image, setImage] = useState()
    const [errors, setErrors] = useState({})
    const [day, setDay] = useState(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
    const [service, setService] = useState([])
    useEffect(() => {
        
        axios.get("http://localhost:5000/appointData/getAppoint",{
            headers:{
                authentication: admin
            }
        })
            .then((res) => {
                if (res.status === 200) {
                    setService(res.data.data);
                }
            })
            .catch((res)=>{
                console.log(res.response);
            })
    }, [])

    const fileupload = (e) => {
        const file = e.target.files[0];
        let fileSize = file.size;
        console.log(fileSize);
        if(fileSize>=512000){
            setErrorImage("big")
        }else{
            setImage(URL.createObjectURL(e.target.files[0]))
            setDoctor({ ...doctor, doctorImage: e.target.files[0] })
        }
        
    }

    const handledata = (e) => {
        const name = e.target.name;
        setDoctor({ ...doctor, [name]: e.target.value })
    }

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("doctorName", doctor.doctorName);
        formData.append("mobileNumber", doctor.mobileNumber);
        formData.append("specialist", doctor.specialist);
        formData.append("days", doctor.days);
        formData.append("doctorImage", doctor.doctorImage);
        setLoad("load")
        axios.post("http://localhost:5000/doctor/newDoctor", formData,{
            headers:{
                authentication: admin
            }
        })
            // for (const value of formData.values()) {
            //     console.log(value);
            // }
            .then((res) => {
                if (res.status == 200) {
                    setLoad(null)
                    toast.success("New Doctor Added successfully", {
                        position: toast.POSITION.TOP_CENTER,

                    });
                    setInterval(function () { window.location.reload() }, 2000);
                }
            })
            .catch((res) => {
                setLoad(null)
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

                setErrors(userError)
                // const name = error.details[0].path;
                // const message = error.details[0].message;
            })

    }
    var dropdown_syle = {
        searchBox: {

            border: "1px solid red",
        },
    };
  
    return (
        <div className="card card-primary mt-5 lg:mx-7  ">
                <div className="card-header text-center ">
                <p className=' font-weight-bold text-lg'>New Doctor</p>
            </div>
            {/* /.card-header */}
            {/* form start */}
            <form onSubmit={submit} >
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Doctor Name</label>
                        <input type="text" name='doctorName' className={`form-control ${errors.doctorName ? "border-red-600" : ""}`} id="exampleInputEmail1" placeholder="Enter Doctor Name" onChange={handledata} />
                        <span className=' text-red-600 text-lg py-2'>{errors.doctorName}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Mobile Number</label>
                        <input type="number" name='mobileNumber' className={`form-control ${errors.mobileNumber ? "border-red-600" : ""}`} id="exampleInputPassword1" placeholder="Doctor Mobile Number" onChange={handledata} />
                        <span className=' text-red-600 text-lg py-2'>{errors.mobileNumber}</span>
                    </div>
                   
                        <div className="form-group" >
                            <label htmlFor="exampleInputPassword1">Specialist</label>
                            <select id="cars" className={`form-control ${errors.specialist ? "border-red-600" : ""}`} name='specialist' onChange={handledata}>
                            <option hidden>-- Select Specialist  -- </option>
                            {service.map((data) => (
                                
                                <option value={data._id} key={data._id} >{data.appointName}</option>
                                ))
                                }
                            </select>
                            <span className=' text-red-600 text-lg py-2'>{errors.specialist}</span>
                        </div>
                    
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Days</label>
                        {/* <select data-placeholder="Begin typing a name to filter..." multiple className="form-control chosen-select" name="test">
                            <option value=""></option>
                            <option>American Black Bear</option>
                            <option>Asiatic Black Bear</option>
                            <option>Brown Bear</option>
                            <option>Giant Panda</option>
                            <option>Sloth Bear</option>
                            <option>Sun Bear</option>
                            <option>Polar Bear</option>
                            <option>Spectacled Bear</option>
                        </select> */}
                        {
                            errors.days ?


                                <Multiselect

                                    style={dropdown_syle}
                                    showArrow={true}
                                    avoidHighlightFirstOption={true}
                                    closeOnSelect={false}
                                    isObject={false}
                                    displayValue="select Day"
                                    selectionLimit={2}
                                    placeholder="select Day"
                                    onRemove={(e) => setDoctor({ ...doctor, days: e })}
                                    onSelect={(e) => setDoctor({ ...doctor, days: e })}
                                    // options={day}
                                    options={day}
                                /> :
                                <>
                                    <Multiselect
                                    showArrow={true}
                                        avoidHighlightFirstOption={true}
                                        closeOnSelect={false}
                                        isObject={false}
                                        displayValue="select Day"
                                        selectionLimit={2}
                                        placeholder="select Day"
                                        onRemove={(e) => setDoctor({ ...doctor, days: e })}
                                        onSelect={(e) => setDoctor({ ...doctor, days: e })}
                                        // options={day}
                                        options={day}
                                    />
                                </>
                        }
                        <span className=' text-red-600 text-lg py-2'>{errors.days}</span>

                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputFile">Doctor Image</label>
                        <div className="input-group">
                            <div className="custom-file">
                                <input type="file"   accept="image/png, image/gif, image/jpeg" name='doctorImage' onChange={fileupload} />

                            </div>


                        </div>
                       { errorImage==null?
                       <>
                        {image ?
                            <img src={image} alt="" className=' w-24 h-24' /> : ""
                        }
                        </>:
                        <span className=' text-red-600 mt-2'>Please Upload less than 500KB</span>
                        
                        }
                    </div>
                    {/* { images?<div className="form-group">
                        <img src={images} alt="" className=' h-20 w-20'/>
                      </div>:""} */}

                </div>
                {/* /.card-body */}
                <div className="card-footer">
                    <button className="btn btn-outline-primary" onClick={submit} >Add Doctor</button>
                    {/* <Link to={"/doctor"}><button className="btn btn-outline-success mx-2" >Go to Doctor</button></Link> */}
                </div>
            </form>
            <ToastContainer className={`mt-6`} />
        </div>
    )
}

export default Adddoctor