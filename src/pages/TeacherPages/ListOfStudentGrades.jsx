import React, { useEffect, useState } from 'react'
import { db } from '../../fbConfig';
import { query, where, getDocs, collection } from 'firebase/firestore';
import TableEntry from '../../components/TableEntry';
import Header from '../../components/Header';
import StudentSidebar from '../../components/StudentSidebar';
import SideBar from '../../components/SideBar';
import TeacherSidebar from '../../components/TeacherSidebar';
import { useLocation } from 'react-router'



function ListOfStudentGrades() {

    const location = useLocation()
    const { user, classroom, subject } = location.state
    const [list, setList] = useState([])
    const [list2, setList2] = useState([])
    let temp = [];
    let temp2 = [];
    let counter = 1;

    useEffect(() => {
        async function getStudents() {
            try {
                // const q = query(collection(db, "users"), where("classroomID", "==", classroom?.id)); 
                const subsQuery = query(collection(db, 'classrooms', classroom.id, 'submissions'), where("classroomID", "==", classroom.id), where("subjectID", "==", subject.id));


                // const querySnapshot = await getDocs(q);
                // querySnapshot.forEach((doc) => {
                //     // console.log(doc.id, " => ", doc.data());
                //     temp.push(doc.data());
                // });
                const subsQuerySnapshot = await getDocs(subsQuery);
                subsQuerySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.ref);
                    temp2.push(doc.data());
                });
            } catch (error) {
                console.log(error);
            } finally {
                setList2(temp2);
                // setList(temp.filter(({ uid: id1 }) => !temp2.some(({ studentID: id2 }) => id2 === id1)));
            }

        }
        return getStudents();
    }, [])



    return (
        <div>
            <Header />
            <TeacherSidebar />



            <div className="container-fluid">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">العلامات </h1>

                        </div>
                    </main>
                    {/* end of title header */}
                    {/* table */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <div className="col-10 mx-auto mt-5">
                                <table className="table table-striped table-hover table-bordered" style={{display: list2.length === 0 ? 'none' : null}}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">اسم الطالب</th>
                                            <th scope="col">الدرس</th>
                                            <th scope="col">تسليم الطالب</th>
                                            <th scope="col">العلامة</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list2.map((elem, index) => {
                                            return (
                                                <tr key={elem + index}>
                                                    <td>{counter++}</td>
                                                    <td>{elem.studentNameAr}</td>
                                                    <td>{elem.lectureName}</td>
                                                    <td>{elem.studentSubmission.length != 0 ? <a href={elem.studentSubmission}>{elem.fileName}</a> : '-'}</td>
                                                    <td>{elem.grade === '' ? "-" : '10 / ' + elem.grade}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div style={{ display: list2.length == 0 ? null : "none", textAlign: 'center'}} className="container">
                                            <section className="cards">
                                                <article className="no-card">
                                                    <div className="row">
                                                        <div className="col-6 col-lg-12">
                                                            <img src="/images/box.png" width={200} height={200} />
                                                        </div>
                                                        <div className="col-6 col-lg-12 emp-header">
                                                            <h2>لا يوجد واجبات جديدة</h2>
                                                        </div>
                                                    </div>
                                                </article>
                                            </section>
                                        </div>
                            </div>
                        </div>
                    </main>
                    {/* end of table */}


                </div>
                
            </div>
            
        </div>
    )
}

export default ListOfStudentGrades
