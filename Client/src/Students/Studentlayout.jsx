import React from 'react'
import StudentDashboard from './Studentsdashboard'
import { Outlet } from 'react-router-dom'

const Studentlayout = () => {
  return (
    <>
   <StudentDashboard/>
   </>
  )
}

export default Studentlayout