import React from 'react'
import Card from '../../components/Card'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'

function StudentDashboard(props) {

    return (
        <div className="dashboard">
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <StudentSidebar />
            <div className="container-fluid">
                <div className="row mt-3">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                            <h1 className="h2">الرئيسية</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <h4 className="alert-heading fw-bolder"> مرحباً {props?.info?.firstNameAr + " " + props?.info?.lastNameAr} </h4>
                                </div>
                            </div>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div>
                            {/* <div class="container-fluid"> */}
                            <Card href="student/class" src="images/english.png" des="الاستخدامات, القاعدة, أمثلة" subjectName="اللغة الإنجليزية" topic="المضارع المستمر" date="٢٠٢١/٢/٢٣" />
                            <Card href="student/class" src="images/math.png" des="الكسور , توحيد البسط والمقام ,أمثلة" subjectName="الرياضيات" topic="طرح الكسور والأعداد الكسرية " date="٢٠٢١/٢/٢٣" />
                            <Card href="student/class" src="images/chemistry.png" des="تحليل المركبات ,التأكسد والأختزال ,أمثلة" subjectName="الكيمياء" topic="المركبات العضوية " date="٢٠٢١/٢/٢٣" />
                           
                            <div className="container">
                                <section className="cards">
                                    <article className="no-card">
                                        <div className="row">
                                            <div className="col-6 col-lg-12">
                                                <img src="/images/box.png" width={200} height={200} />
                                            </div>
                                            <div className="col-6 col-lg-12 emp-header">
                                                <h2>لا يوجد حصص جديدة</h2>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                            </div>
                        </div>





                    </main>
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard
