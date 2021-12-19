import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import { db } from '../../fbConfig'
import { query, where, getDocs, collection } from 'firebase/firestore';



function TeacherAllClasses(props) {
    const location = useLocation()
    const { classroom, user } = location.state
    const [subject, setSubject] = useState([])
    let list = [];
    useEffect( async() => {
        // console.log(classroom);
        // console.log(user);

        const q = query(collection(db, "subjects"), where("classroomID", "==", classroom.id), where("name", "==", user.subject));
        const Subjectsnapshot = await getDocs(q);
            Subjectsnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                list.push(doc.data());
                setSubject(list[0]);
                
            });
            console.log(list[0]);
            console.log(subject);

        // const q2 = query(collection(db, "lectures"), where("subjectID", "==", subject.id));
        
    }, [])



    return (
        <div>
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <TeacherSidebar />
            <div className="container-fluid">
                <div className="row mt-5">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                            <h1 className="h2">{classroom.name}</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <Link 
                                    to="/teacher/add-material"
                                    className="button"
                                    state={{user: user, subject: subject, classroom: classroom}}
                                    >
                                        <span className="mx-1"> إضافة حصة </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container">
                            <div className="content-wrapper">
                                <div className="row center-card">
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3> الممنوع من الصرف</h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3>الإعراب</h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3>المبني والمعرب </h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3> تصريفات الأسم</h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3> اسماء الإشارة</h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                    <a href="class.html" className="data-card col-xl-3 col-sm-6">
                                        <h3>المنادى </h3>
                                        <h4>٢٠٢١/٢/٢٣</h4>
                                        <span className="link-text">
                                            <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                            </svg>
                                            مشاهدة الصف
                                        </span>
                                    </a>
                                </div>
                                {/* partial */}
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default TeacherAllClasses
