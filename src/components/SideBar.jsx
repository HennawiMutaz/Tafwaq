import React from 'react'

function SideBar() {
  const pathName = window.location.pathname;
  return (
    <div>
      <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
        <div className="position-sticky pt-3">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className={pathName === "/account" || pathName.includes("edit-user") ? "nav-link sidebar-active" : "nav-link"} aria-current="page" href="/account">
                <i className="fas fa-home"></i>
                الرئيسية
              </a>
            </li>
            <li className="nav-item">
              <a className={pathName === "/account/studentlist" || pathName === "/account/addstudent"  ? "nav-link sidebar-active" : "nav-link"} href="/account/studentlist">
                <i className="fas fa-user-friends"></i>
                قائمة الطلاب
              </a>
            </li>
            <li className="nav-item">
              <a className={pathName === "/account/teacherlist" || pathName === "/account/addteacher"  ? "nav-link sidebar-active" : "nav-link"} href="/account/teacherlist">
                <i className="fas fa-chalkboard-teacher"></i>
                قائمة المعلمين
              </a>
            </li>
            <li className="nav-item">
              <a className={pathName === "/account/classroomlist" || pathName === "/account/addclassroom" || pathName.includes("edit-classroom") ? "nav-link sidebar-active" : "nav-link"} href="/account/classroomlist">
                <i className="fas fa-chalkboard"></i>
                الصفوف
              </a>
            </li>
            <li className="nav-item">
              <a className={pathName === "/account/user-info" ? "nav-link sidebar-active" : "nav-link"} href="/account/user-info">
                <i className="fas fa-user"></i>
                الملف الشخصي
              </a>
            </li>
            <li className="nav-item">
              <a className={pathName === "/change-password" ? "nav-link sidebar-active" : "nav-link"} href="/change-password">
                <i className="fas fa-key"></i>
                تغيير كلمة السر
              </a>
            </li>
          </ul>


        </div>
      </nav>

    </div>
  )
}

export default SideBar
