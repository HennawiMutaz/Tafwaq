import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import { query, where, collection, getDocs } from "firebase/firestore";
import { db } from '../../fbConfig';
import ClassroomCard from '../../components/ClassroomCard';
import TeacherAllClasses from './TeacherAllClasses';



function TeacherDashboard(props) {

   

    let temp = [];
    const [list, setList] = useState([])

    useEffect(async () => {
        try {
            const classroomsRef = collection(db, "classrooms");
            const q = query(classroomsRef, where('id', 'in', props.info?.classroomsIDs));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                temp.push(doc.data());
            });
        } catch (error) {
            console.log(error);
        } finally {
            setList(temp);
        }
    }, [])


    return (
        <div className="dashboard">
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <TeacherSidebar />
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
                                                        <ClassroomCard
                                                            key={elem.id || index}
                                                            classroom={elem}
                                                            user={props.info}
                                                        />
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
    )
}

export default TeacherDashboard
