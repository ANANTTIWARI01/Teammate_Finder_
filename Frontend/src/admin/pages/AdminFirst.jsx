import React from 'react'
import Header from "../../admin/component/Header"
import Footer from '../../admin/component/Footer'
import { Outlet } from 'react-router-dom'
function AdminFirst() {
  return (<>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AdminFirst