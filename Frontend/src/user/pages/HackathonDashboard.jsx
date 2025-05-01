/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import HackDashApplication from '../component/HackDashApplication'

function HackathonDashboard() {
  const { hackathonName } = useParams()
  const [applicationFilled,setApplicationFilled] = useState(false)
  return (
    <>
    {applicationFilled?
    <div>hi</div>
    :
     <HackDashApplication hackathonName={hackathonName}/>
    }
    </>
  )
}

export default HackathonDashboard