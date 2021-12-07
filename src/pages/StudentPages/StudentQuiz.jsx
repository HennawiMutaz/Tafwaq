import React from 'react'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'

function StudentQuiz() {
    return (
        <div>
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <StudentSidebar />
            <div className="container-fluid">
                <div className="row mt-5">
                    <main className="main col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className=" container">
                                <section className="cards">
                                    <article className="Sub-card">
                                        <div className="row">
                                            <div className="col-12 col-lg-12 col-md-12 col-sm-12 center">
                                                <h1> الممنوع من الصرف / اختبار</h1>
                                                <h6>أ.إياد محمد</h6>
                                            </div>
                                        </div>
                                    </article>
                                </section>
                            </div>
                            <form className="test">
                                <h3>السؤال الأول:
                                    كم عدد الاسئلة ؟
                                </h3>
                                <div className="radiobtn">
                                    <input type="radio" id="Q1-first" name="Q1" defaultValue="الاول" />
                                    <label htmlFor="Q1-first">الاول</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q1-second" name="Q1" defaultValue="الثاني" />
                                    <label htmlFor="Q1-second">الثاني</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q1-third" name="Q1" defaultValue="الثالث" />
                                    <label htmlFor="Q1-third">الثالث</label>
                                </div>
                                <hr />
                                <h3>السؤال الثاني:
                                    كم عدد الاسئلة ؟</h3>
                                <div className="radiobtn">
                                    <input type="radio" id="Q2-first" name="Q2" defaultValue="الاول" />
                                    <label htmlFor="Q2-first">الاول</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q2-second" name="Q2" defaultValue="الثاني" />
                                    <label htmlFor="Q2-second">الثاني</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q2-third" name="Q2" defaultValue="الثالث" />
                                    <label htmlFor="Q2-third">الثالث</label>
                                </div>
                                <hr />
                                <h3>السؤال الثالث:
                                    كم عدد الاسئلة ؟</h3>
                                <div className="radiobtn">
                                    <input type="radio" id="Q3-first" name="Q3" defaultValue="الاول" />
                                    <label htmlFor="Q3-first">الاول</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q3-second" name="Q3" defaultValue="الثاني" />
                                    <label htmlFor="Q3-second">الثاني</label>
                                </div>
                                <div className="radiobtn">
                                    <input type="radio" id="Q3-third" name="Q3" defaultValue="الثالث" />
                                    <label htmlFor="Q3-third">الثالث</label>
                                </div>
                                <div className="container">
                                    <a className="submit-btn" onclick="submit()"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-send-check" viewBox="0 0 16 16">
                                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
                                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                                    </svg> إرسال الإجابات
                                    </a>
                                </div>
                            </form>
                    </main>
                </div>
            </div>

        </div>
    )
}

export default StudentQuiz
