import React from 'react'

function ContactSchoolPage() {
    return (
        <div>
            <h1 className="bg-warning text-center p-5 ">
            هناك مشكلة في حسابك ، يرجى الاتصال بإدارة المدرسة
            <h3 className='bg-warning text-center p-3'>Tel: (02) 720 9000</h3>
            <a style={{textDecoration: 'none'}} href="/login" className='bg-warning text-center p-3'>العودة إلى صفحة الدخول</a>
            
            </h1>
            <img className='rounded mx-auto d-block' src="images/Contact-Admin.svg" alt="#" />
        </div>
    )
}

export default ContactSchoolPage
