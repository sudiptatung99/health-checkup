import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAdminToken } from '../../Redux/Useslice';

const Dasboard = () => {
    const token = useSelector(selectAdminToken)
    const [appoint, setappoint] = useState([])
    const [message, setmessage] = useState('')
    useEffect(() => {
        axios.get("http://localhost:5000/appointment/getTodayAppointment", {
            headers: {
                authentication: token
            }
        })
            .then((res) => {
                setappoint(res.data);
                setmessage('')
            })
            .catch((res) => {
                setmessage(res.response.data);
            })
    }, []);

    var i = 0;
    return (
        <>
            <div >
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">

                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid">
                        {/* Info boxes */}
                        <div className="row">
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box">
                                    <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Today Appointment</span>
                                        <span className="info-box-number">
                                            {appoint.length} member
                                        </span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                            
                            {/* /.col */}
                            {/* fix for small devices only */}
                            <div className="clearfix hidden-md-up" />
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-success elevation-1"><i className="fas fa-shopping-cart" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total Doctor</span>
                                        <span className="info-box-number">760</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                            <div className="col-12 col-sm-6 col-md-3">
                                <div className="info-box mb-3">
                                    <span className="info-box-icon bg-warning elevation-1"><i className="fas fa-users" /></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Total User</span>
                                        <span className="info-box-number">2,000</span>
                                    </div>
                                    {/* /.info-box-content */}
                                </div>
                                {/* /.info-box */}
                            </div>
                            {/* /.col */}
                        </div>
                        {/* /.row */}

                        {/* /.row */}
                        {/* Main row */}
                        <div className=" mt-10 text-center">
                            {
                                message ? <span className='font-bold text-red-600'>{message} !!</span> :

                                    <div className="col-md-8">


                                        {/* /.row */}
                                        {/* TABLE: LATEST ORDERS */}
                                        <div className="card">
                                            <div className="card-header border-transparent">
                                                <h3 className="card-title">Latest Appointment</h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-minus" />
                                                    </button>
                                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                                        <i className="fas fa-times" />
                                                    </button>
                                                </div>
                                            </div>
                                            {/* /.card-header */}
                                            <div className="card-body p-0">
                                                <div className="table-responsive">

                                                    <table className="table m-0">
                                                        <thead>
                                                            <tr>
                                                                <th> ID</th>
                                                                <th>Name</th>
                                                                <th>Phone Number</th>
                                                                <th>service Name</th>
                                                                <th>Time</th>
                                                                <th>Doctor Name</th>
                                                                <th>operation</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {

                                                                appoint.map((data) => (

                                                                    <tr key={data._id}>
                                                                        <td>{i += 1}</td>
                                                                        <td>{data.name}</td>
                                                                        <td>{data.number}</td>
                                                                        <td>{data.doctorId.specialist.appointName}</td>
                                                                        <td>{data.time}</td>
                                                                        <td>{data.doctorId.doctorName}</td>
                                                                        <td>
                                                                            <div>
                                                                                <span className="badge bg-success px-3 py-2 text-base mx-2 " style={{ cursor: "pointer" }}>Present</span>
                                                                                <span className="badge bg-danger px-3 py-2 text-base mt-2 " style={{ cursor: "pointer" }}>Absent</span>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }


                                                        </tbody>

                                                    </table>

                                                </div>
                                                {/* /.table-responsive */}
                                            </div>
                                            {/* /.card-body */}
                                            <div className="card-footer clearfix">
                                                <a href="javascript:void(0)" className="btn btn-sm btn-info float-left">Place New Order</a>
                                                <a href="javascript:void(0)" className="btn btn-sm btn-secondary float-right">View All Orders</a>
                                            </div>
                                            {/* /.card-footer */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                            }


                            {/* /.col */}
                        </div>
                        {/* /.row */}
                    </div>
                    {/*/. container-fluid */}
                </section>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}


        </>
    )
}

export default Dasboard