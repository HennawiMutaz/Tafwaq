import React from 'react'

function SideBar() {
    return (
        <div>
                <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
      <div className="position-sticky pt-3">
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/account">
            <i className="fas fa-home"></i>
              الرئيسية
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/account/studentlist">
            <i className="fas fa-user-friends"></i>
              قائمة الطلاب
            </a>
          </li>
          
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
          <span>التقارير المحفوظة</span>
          <a className="link-secondary" href="#" aria-label="إضافة تقرير جديد">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              الشهر الحالي
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              الربع الأخير
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span data-feather="file-text"></span>
              التفاعل الإجتماعي
            </a>
          </li>
          
        </ul>
      </div>
    </nav>

        </div>
    )
}

export default SideBar
