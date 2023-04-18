import React from 'react'
import Background from "../../components/background/background"
import './dashboard.css'

function dashboard() {
  return (
    <div className='mainDashboardContainer'>
        <Background />
        <div className='dataFields'>
            <div className='dataQuery'>
              
            </div>
        </div>
    </div>
  )
}

export default dashboard