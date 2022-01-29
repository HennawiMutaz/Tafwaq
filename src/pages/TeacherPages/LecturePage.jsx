import React from 'react'
import Header from '../../components/Header'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import TeacherSidebar from '../../components/TeacherSidebar';
import { doc, deleteDoc, writeBatch, where, getDocs, collection, query } from "firebase/firestore";
import { db } from '../../fbConfig';


function LecturePage() {

    const location = useLocation();
    const { lecture, user, classroom, subject } = location.state;

    


    async function handleDeleteLecture() {
        if(window.confirm("هل أنت متأكد من حذف الحصة كلياً ؟") == true) {
            

            //delete from firestore
            deleteDoc(doc(db, "lectures", lecture.id))
            .then(() => console.log("deleted lecture from firestore"))
            .catch((error) => console.log(error))
            
            try {
                const q = query(collection(db, "classrooms", lecture?.classroomID, "submissions"), where("lectureID", "==", lecture?.id));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.ref);
                    deleteDoc(doc.ref)
                    .then(console.log("removed"))
                    .catch(err => console.log(err))
                });
            } catch (error) {
                console.log(error);
            } 
            

            alert("تم حذف الحصة بنجاح");
            window.history.go(-1);
        }
    }


    return (
        <div className="dashboard">
            <Header />
            <TeacherSidebar />
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <div className="container-fluid">
                <div className="row mt-5">
                    <main style={{display: user.type === "teacher" ? null : 'none'}} className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                            <Link
                             to="/teacher/update-lecture"
                             state={{lecture: lecture, classroom:classroom, subject: subject}}
                             style={{marginLeft: '40px'}} 
                             className='button'

                             >
                                        تعديل
                             </Link>
                            <button className='button-delete' onClick={handleDeleteLecture}>حذف</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container">
                            <section className="cards">
                                <article className="Sub-card">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-md-12 col-sm-12 center">
                                            <h1> {lecture?.title} </h1>
                                            <h6>أ. {lecture.teacherNameAr}</h6>
                                            <p> {lecture?.description}</p>
                                            <Link
                                                to="/teacher/all-classes"
                                                state={{
                                                    lecture: lecture,
                                                    classroom: classroom,
                                                    user: location.state.user
                                                }}
                                            >
                                                <button className="btn btn-outline-primary btn-lg override">
                                                    {lecture.subjectNameAr}
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                        <iframe className="center" width="420" height="315" src={lecture.link} frameBorder="0" allowFullScreen></iframe>
                        <div className="row">
                            <div className=" col-lg-7  col-md-12 col-sm-12">
                                <a href={lecture.contentURL} style={{ display: lecture.contentURL.length == 0 ? "none" : null }}>
                                    <h5 className="attch">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                        </svg>
                                        {lecture.contentTitle}
                                    </h5>
                                </a>
                                <Link 
                                    to="/teacher/paperwork" 
                                    state={{lecture: lecture, classroom: classroom}}
                                    style={{ display: lecture.paperworkURL.length == 0 ? "none" : null }}>
                                    <h5 className="attch">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                            <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                                            <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                                        </svg>
                                        ورقة عمل
                                    </h5>
                                </Link>
                                <a href="/teacher/create-test" >
                                    <h5 className="attch">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-question-square" viewBox="0 0 16 16">
                                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                                        </svg>
                                        الاختبار</h5>
                                </a>
                            </div>
                            <div className=" col-10 col-lg-4  col-md-12 col-sm-12 comments attch">
                                <h2 className="center">التعليقات</h2>
                                <div><img className="comment-img" src="/images/student.png" alt="" />
                                    <p className="comment-text "> <span className="comment-name"> (علي أحمد)</span>  لم أفهم ما المقصود  </p>
                                </div>
                                <div><img className="comment-img" src="/images/student.png" alt="" />
                                    <p className="comment-text"> <span className="comment-name"> (رولا عيسى)</span>  شرح ممتاز كالعادة</p>
                                </div>
                                <div><img className="comment-img" src="/images/student.png" alt="" />
                                    <p className="comment-text "> <span className="comment-name"> ( هبه وليد)</span>  هل يوجد مصادر أخرى ؟ </p>
                                </div>
                                <div className="d-flex flex-row add-comment-section mt-4 mb-4"><img className="img-fluid img-responsive rounded-circle mr-2" src="/images/student.png" width={38} />
                                    <input type="text" className="form-control mr-3" placeholder="أضف تعليق" />
                                    <button className="btn btn-md btn-outline-primary override" type="button">تعليق</button></div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default LecturePage
