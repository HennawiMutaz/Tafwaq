import React from 'react'
import { logout } from '../fbConfig'

async function handleLogout() {
    try {
      await logout();
      // navigate('/login', {replace: true}); //breaks
      window.location.replace('/login'); //works!
    } catch (error) {
      console.log("Error ... Couldn't Logout");
    }
  }

function ContactSchoolPage() {
    return (
        <div>
            <h1 className="bg-warning text-center p-5 ">
            هناك مشكلة في حسابك ، يرجى الاتصال بإدارة المدرسة
            <h3 className='bg-warning text-center p-3'>Tel: (02) 720 9000</h3>
            <a onClick={handleLogout} style={{textDecoration: 'none'}} href="" className='bg-warning text-center p-3'>العودة إلى صفحة الدخول</a>
            
            </h1>
            <img className='rounded mx-auto d-block' src="images/Contact-Admin.svg" alt="#" />
        </div>
    )
}

export default ContactSchoolPage
