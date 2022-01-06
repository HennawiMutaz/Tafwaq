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
    let temp = [];
    let counter = 1;

    useEffect(() => {
        async function getStudents() {
            try {
                const q = query(collection(db, "users"), where("classroomID", "==", classroom?.id)); //! where the grades of teacher subject are displayed only.

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
            } catch (error) {
                console.log(error);
            } finally {
                setList(temp);
            }
            
        }
        return getStudents();
    }, [])


    function createTable(elem) {
        let keyVal = Math.random();
        return (
            <TableEntry key={keyVal} user={elem} counter={counter++} />
        );
    }
    return (
        <div>       
        <Header />
        {user?.type === "teacher" ? <TeacherSidebar /> : (user?.type === "student" ? <StudentSidebar /> : <SideBar />)}



        <div className="container-fluid">
            <div className="row mt-5">
                {/* title header & add student btn */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">قائمة الطلاب</h1>
                        
                    </div>
                </main>
                {/* end of title header */}
                {/* table */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col-10 mx-auto mt-5">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم الطالب</th>
                            <th scope="col">الصف</th>
                            <th scope="col">البريد الإلكتروني</th>
                            <th scope="col">العلامة</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map(createTable)}
                        </tbody>
                        </table>
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
