import React from 'react'
import Header from './user/component/Header'
import { Outlet } from 'react-router-dom'
import Footer from './user/component/Footer'

function First() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default First