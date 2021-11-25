import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
function TeacherList() {

    return (
        <div>       
        <Header />
        <SideBar /> 


        <div className="container-fluid">
            <div className="row mt-5">
                {/* title header & add teacher btn */}
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">قائمة المعلمين</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div className="alert d-flex justify-content-end" role="alert">
                                <a className="btn btn-primary btn-lg" href="/account/addteacher">
                                    <span> إضافة معلم </span>
                                    <i className="fas fa-user-plus" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                {/* end of title header */}
                {/* table */}
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col-10 mx-auto mt-5">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم المعلم</th>
                            <th scope="col">اسم الاب</th>
                            <th scope="col">التخصص</th>
                            <th scope="col">البريد الإلكتروني</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>محمد</td>
                            <td>احمد</td>
                            <td>رياضيات</td>
                            <td>test2@tafwaq.edu.jo</td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>خالد</td>
                            <td>محمد</td>
                            <td>علوم</td>
                            <td>test3@tafwaq.edu.jo</td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>رائد</td>
                            <td>كريم</td>
                            <td>عربي</td>
                            <td>test4@tafwaq.edu.jo</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                </main>
                {/* end of table */}
                
                
                </div>
            </div>
        </div>
    )
}

export default TeacherList
