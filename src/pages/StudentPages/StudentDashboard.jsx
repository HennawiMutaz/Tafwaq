import React, {useEffect, useState} from 'react'
import Card from '../../components/Card'
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
} from 'firebase/firestore';
import { db } from '../../fbConfig';


function StudentDashboard(props) {

    const [lectures, setLecture] = useState([]);
    const [loaded, setLoaded] = useState(false)
    let list = [];

    useEffect( async () => {
        try {
        const q = query(collection(db, "lectures"), where("classroomID", "==", props?.info?.classroomID), orderBy("createdAt", "desc"));
        const lectureSnapshot = await getDocs(q);
        lectureSnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            list.push(doc.data());
            setLecture(list);
        });
        } catch (err) {
            console.log(err);
        } finally {
            setLoaded(true);
        }
        console.log(list);

        return () => {
            
        }
    }, [])

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
                            {lectures.map((elem, index) => {
                                        return (
                                        <Card key={elem + index} user={props?.info} lectures={elem} src={`images/${elem.subjectName}.png`} des={elem.description} subjectName={elem.subjectNameAr} topic={elem.title} date={elem.createdAt.toDate().toLocaleDateString('ar-EG')} />    
                                        );
                                    })}
                           
                            <div style={{display: lectures.length==0 && loaded? null : "none"}} className="container">
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
