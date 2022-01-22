import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'
import { useLocation } from 'react-router';
import {
    collection,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    where,
    setDoc,
    getDocs,
    orderBy,
} from 'firebase/firestore';
import { db } from '../../fbConfig';
import { Link } from 'react-router-dom';

function AllClasses() {
    const location = useLocation();
    const { lecture } = location.state;
    let lecs = [];
    const [lectures, setLectures] = useState([]);

    useEffect(async () => {

        const q = query(collection(db, "lectures"), where("subjectID", "==", lecture.subjectID), where("classroomID", "==", lecture.classroomID));
        const lectureSnapshot = await getDocs(q);
        lectureSnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            lecs.push(doc.data());
        });
        setLectures(lecs);


        return () => {

        }
    }, [])


    return (
        <div>
            <Header />
            <StudentSidebar />
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <div className="container-fluid">
                <div className="row mt-5">
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                            <h1 className="h2">الحصص</h1>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="container">
                            <div className="content-wrapper">
                                <div className="row center-card">
                                    {lectures.map((elem, index) => {
                                        return (
                                            <Link
                                                to="/account/class"
                                                state={{
                                                    lecture: elem,
                                                }}
                                                key={elem.title || index} className="data-card col-xl-3 col-sm-6">
                                                <h3> {elem.title} </h3>
                                                <h4>{elem.createdAt.toDate().toLocaleDateString('ar-EG')}</h4>
                                                <span className="link-text">
                                                    <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                                    </svg>
                                                    مشاهدة الدرس
                                                </span>
                                            </Link>
                                        );
                                    })}

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

export default AllClasses
