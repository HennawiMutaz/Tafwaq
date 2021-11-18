import React from 'react'
import { logout } from '../fbConfig'
import { useNavigate } from 'react-router';
function Header() {

  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await logout();
      // navigate('/login', {replace: true}); //breaks
      window.location.replace('/login'); //works!
    } catch (error) {
      console.log("Error ... Couldn't Logout");
    }
  }

    return (
        <div className="pt-5">
                  
<header className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
  <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#"> تفوق </a>
  <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="عرض/إخفاء لوحة التنقل">
    <span className="navbar-toggler-icon"></span>
  </button>
  <input className="form-control form-control-dark w-100" type="text" placeholder="بحث" aria-label="بحث" />
  <div className="navbar-nav">
    <div className="nav-item text-nowrap">
      <a className="nav-link px-3" href="" onClick={handleLogout}>تسجيل الخروج</a>
    </div>
  </div>
</header>
        </div>
    )
}

export default Header
