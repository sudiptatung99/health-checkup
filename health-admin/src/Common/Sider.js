import React from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineMedicalServices } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import {FaUserAlt } from "react-icons/fa";
import {FaUserTie} from "react-icons/fa";
const Sider = () => {
  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4" >
        {/* Brand Logo */}
        <p className="brand-link">

          <span className="brand-text font-weight-light"><h3 className="font-serif text-xl cursor-pointer">Healthy<span className=' text-green-400 p-2'>Life</span></h3></span>
        </p>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="https://www.slazzer.com/static/images/home-page/individual-image-upload.jpg" className="img-circle elevation-2 mt-2" alt="User Image" />
            </div>
            <div className="info">
              <p  className="d-block h5">Sudipta</p>
            </div>
          </div>
          {/* SidebarSearch Form */}

          {/* Sidebar Menu */}
          <nav className="mt-2" >
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Dashboard

                  </p>
                </Link>

              </li>
              <li className="nav-item">
                <Link to={"/user"} className="nav-link flex">
                <FaUserAlt className='nav-icon mt-1  text-lg'/>
                  <p>
                    User
                  </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/addappointment"} className="nav-link flex">
                  <MdOutlineMedicalServices className='nav-icon mx-1 text-xl'/>
                  <p className='mt-1'>Service</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/viewappointment"} className="nav-link flex">
                <MdOutlinePreview className='nav-icon mx-1 text-xl'/>
                  <p className='mt-1'>View Appointment</p>
                </Link>

              </li>
              <li className="nav-item">
                <Link to={"/doctor"} className="nav-link flex">
                <FaUserTie className='nav-icon text-lg'/>
                  <p>
                    Add New Doctor

                  </p>
                </Link>

              </li>
              <li className="nav-item">
                <Link to={"/contractus"} className="nav-link">
                  <i className="nav-icon fas fa-edit" />
                  <p>
                    Contract Us

                  </p>
                </Link>

              </li>

            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>

    </>
  )
}

export default Sider