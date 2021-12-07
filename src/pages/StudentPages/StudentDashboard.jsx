import React from 'react'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'

function StudentDashboard() {

    return (
        <div className="dashboard">
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <StudentSidebar />
            <div className="container-fluid">
                <div className="row mt-5">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">أحدث الدروس</h1>
                            <div className="btn-toolbar mb-2 mb-md-0"></div>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div>
                            {/* <div class="container-fluid"> */}
                            <a href="/student/class">
                                <div className="container">
                                    <section className="cards">
                                        <article className="card">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12"><img src="/images/arabic.png" alt="" /></div>
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12">
                                                    <h1>اللغة العربية</h1>
                                                    <h6> الممنوع من الصرف</h6>
                                                    <h6 className="card-des">
                                                        معنى الممنوع من الصرف ,
                                                        أسباب المنع ,
                                                        أمثلة
                                                    </h6>
                                                    <h6 className="text-muted">٢٠٢١/٢/٢٣</h6>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </a>
                            <a href>
                                <div className="container">
                                    <section className="cards">
                                        <article className="card">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12 "><img className="card-img" src="images/math.png" /></div>
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12">
                                                    <h1>الرياضيات </h1>
                                                    <h6> طرح الكسور والأعداد الكسرية</h6>
                                                    <h6 className="card-des">
                                                        الكسور ,
                                                        توحيد البسط والمقام ,
                                                        أمثلة
                                                    </h6>
                                                    <h6 className="text-muted">٢٠٢١/٢/٢٣</h6>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </a>
                            <a href>
                                <div className="container">
                                    <section className="cards">
                                        <article className="card">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12"><img className="card-img" src="/images/chemistry.png" alt="" /></div>
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12">
                                                    <h1>الكيمياء</h1>
                                                    <h6> المركبات العضوية</h6>
                                                    <h6 className="card-des">
                                                        تحليل المركبات ,
                                                        التأكسد والأختزال ,
                                                        أمثلة
                                                    </h6>
                                                    <h6 className="text-muted">٢٠٢١/٢/٢٢</h6>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </a>
                            <a href>
                                <div className="container">
                                    <section className="cards">
                                        <article className="card">
                                            <div className="row">
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12"><img className="card-img" src="/images/english.png" alt="" /></div>
                                                <div className="col-6 col-lg-6 col-md-12 col-sm-12">
                                                    <h1>اللغة الإنجليزية</h1>
                                                    <h6>المضارع المستمر</h6>
                                                    <h6 className="card-des">
                                                        الاستخدامات ,
                                                        القاعدة ,
                                                        أمثلة
                                                    </h6>
                                                    <h6 className="text-muted">٢٠٢١/٢/٢٣</h6>
                                                </div>
                                            </div>
                                        </article>
                                    </section>
                                </div>
                            </a>
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
