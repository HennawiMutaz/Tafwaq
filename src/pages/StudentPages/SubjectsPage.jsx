import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'
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
    getDoc,
} from 'firebase/firestore';
import { useAuth } from '../../fbConfig';
import { db } from '../../fbConfig';
import { Link } from 'react-router-dom';





function SubjectsPage() {




    let temp = [];
    const [list, setList] = useState([])
    const currentUser = useAuth();
    
    const [userData, setUserData] = useState()
    const [classroom, setClassroom] = useState()
    
    
    useEffect(async () => {
        try {
            
            const docRef = doc(db, 'users', currentUser?.uid);
            const docSnap = await getDoc(docRef);
            const data = docSnap.data();
            setUserData(data)
            const q = query(collection(db, "subjects"), where("classroomID", "==", data?.classroomID));
            
            const classroomRef = doc(db, 'classrooms', data?.classroomID);
            const classroomSnap = await getDoc(classroomRef);
            const data2 = classroomSnap.data();
            setClassroom(data2)
    
            const querySnapshot = await getDocs(q); //gets subjects
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                temp.push(doc.data());
            });
        } catch (error) {
            console.log(error);
        } finally {
            setList(temp);
            console.log(userData);
        }
    }, [currentUser])
    


    return (
        <div>

            <div className="dashboard">
                <link rel="stylesheet" href="/styles/studentpage.css" />
                <Header />
                <StudentSidebar />
                <div className="container-fluid">
                    <div className="row mt-3">
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                                <h1 className="h2">المواد</h1>
                                <div className="btn-toolbar mb-2 mb-md-0">
                                    <div className="alert d-flex justify-content-end" role="alert">

                                    </div>
                                </div>
                            </div>
                        </main>
                        {/* <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4"> */}
                        <div>

                            <div className="container-fluid">
                                <div className="row mt-5">
                                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                                        <div className="container">
                                            <div className="content-wrapper">
                                                <div className="row center-card">
                                                    {list.map((elem, index) => {
                                                        return (
                                                            <Link
                                                                key={elem+index}
                                                                to={"/student/subject/lectures"}
                                                                state={{
                                                                    classroom: classroom, 
                                                                    user: userData,
                                                                    subject: elem,
                                                                }}
                                                                className="data-card col-xl-3 col-sm-6" >
                                                                <h3> {elem.nameAr} </h3>
                                                                {/* <h4>٢٠٢١/٢/٢٣</h4> */}
                                                                <span className="link-text">
                                                                    <svg width={25} height={16} viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.8631 0.929124L24.2271 7.29308C24.6176 7.68361 24.6176 8.31677 24.2271 8.7073L17.8631 15.0713C17.4726 15.4618 16.8394 15.4618 16.4489 15.0713C16.0584 14.6807 16.0584 14.0476 16.4489 13.657L21.1058 9.00019H0.47998V7.00019H21.1058L16.4489 2.34334C16.0584 1.95281 16.0584 1.31965 16.4489 0.929124C16.8394 0.538599 17.4726 0.538599 17.8631 0.929124Z" fill="#1EAE98" />
                                                                    </svg>
                                                                    مشاهدة الصف
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





                        {/* </main> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubjectsPage
