import React from 'react'

function StudentSidebar() {
    const pathName = window.location.pathname;
    return (
        <div>
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className={pathName === "/student" ? "nav-link active" : "nav-link"} aria-current="page" href="/account">
                                <i className="fas fa-home"></i>
                                الرئيسية
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={pathName === "" || pathName === "" ? "nav-link active" : "nav-link"} href="/account/studentlist">
                                <i class="fas fa-book"></i>
                                المواد
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={pathName === "" || pathName === "" ? "nav-link active" : "nav-link"} href="/account/teacherlist">
                                <i class="fas fa-user"></i>
                               الملف الشخصي
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={pathName === "" || pathName === "" ? "nav-link active" : "nav-link"} href="/account/classroomlist">
                                <i class="fas fa-key"></i>
                                تغيير كلمة السر
                            </a>
                        </li>

                    </ul>


                </div>
            </nav>

        </div>
    )
}

export default StudentSidebar
