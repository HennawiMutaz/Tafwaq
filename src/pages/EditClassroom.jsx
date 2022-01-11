import React, { useRef, useState, useEffect } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import TableEntry from '../components/TableEntry';
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
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import { db } from '../fbConfig';


function EditClassroom() {

    const location = useLocation();
    const { classroom } = location.state;

    let temp = [];
    let temp2 = [];
    const [teachers, setTeachers] = useState([]);
    const [list, setList] = useState([]);
    let stdCounter = 1, tCounter = 1;
    const [updated, setUpdated] = useState("");



    async function updateStudentClassroom(uid) {
        const Ref = doc(db, "users", uid);

        await updateDoc(Ref, {
            classroomID: classroom.id
        });
        setUpdated(classroom.id);

    }

    async function updateTeacherClassroom(uid) {
        try {
            const Ref = doc(db, "users", uid);

            await updateDoc(Ref, {
                classroomsIDs: arrayUnion(classroom.id)
            });
        } catch (error) {
            console.log(error);
        }
        setUpdated(classroom.id);

    }


    async function removeStudentClassroom(uid) {
        const Ref = doc(db, "users", uid);

        await updateDoc(Ref, {
            classroomID: ""
        });
        setUpdated(null);
        
    }

    async function removeTeacherClassroom(uid) {
        try {
            const Ref = doc(db, "users", uid);

            await updateDoc(Ref, {
                classroomsIDs: arrayRemove(classroom.id)
            });
        } catch (error) {
            console.log(error);
        }
        setUpdated(null);

    }
    

    

    useEffect(async () => {

        try {
            const q = query(collection(db, "users"), where("type", "==", "student"), where("level", "==", classroom.level));
            const teachersQuery = query(collection(db, "users"), where("type", "==", "teacher"));
            const teacherSnapshot = await getDocs(teachersQuery);
            teacherSnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                temp2.push(doc.data());
            });
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                temp.push(doc.data());
            });
        } catch (error) {
            console.log(error);
        } finally {
            setTeachers(temp2);
            setList(temp);
            console.log("saved");
        }

       
        


        return () => {} ;
    }, [updated])

    return (
        <div>
            <Header />
            <SideBar />
            <div className="container-fluid">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2"> تعديل الصف </h1>
                        </div>
                    </main>

                    {/* Class Info */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <section>
                                <div className="col-10">
                                    <h1>اسم الصف: {classroom.name ?? ""}</h1>
                                </div>
                                {/* End of Class Info */}

                                {/* Teacher Table */}
                                <div className=" mt-5">
                                    <h2 className="mb-3"> المعلمين </h2>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">اسم المعلم</th>
                                                <th scope="col">المادة</th>
                                                <th scope="col">البريد الإلكتروني</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {teachers.map((elem, index) => {
                                                return (
                                                    <TableEntry teafun={updateTeacherClassroom}
                                                       
                                                        key={elem.id || index}
                                                        user={elem}
                                                        icon="fas fa-user-plus icon-hover" //TODO: if already in classroom, set icon to minus
                                                        counter={elem.type === "student" ? stdCounter++ : tCounter++}
                                                        classroomID= {classroom.id}
                                                        removeFun = {removeTeacherClassroom}
                                                        iconClass={elem.classroomsIDs.includes(classroom.id) ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover"}
                                                    />
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* End of Teacher Table */}
                                {/* Student Table */}
                                <div className=" mt-5">
                                    <h2 className="mb-3"> الطلاب </h2>
                                    <table className="table table-striped table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">اسم الطالب</th>
                                                <th scope="col">الصف</th>
                                                <th scope="col">البريد الإلكتروني</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list.map((elem, index) => {
                                                return (
                                                    <TableEntry 
                                                        stdfun={updateStudentClassroom}
                                                        key={elem.id || index}
                                                        user={elem}
                                                        icon="fas fa-user-plus icon-hover" //TODO: if already in classroom, set icon to minus
                                                        counter={elem.type === "student" ? stdCounter++ : tCounter++}
                                                        classroomID= {classroom.id}
                                                        removeFun = {removeStudentClassroom}
                                                        iconClass={elem.classroomID == classroom.id ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover"}
                                                    />
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                                {/* End of Student Table */}
                            </section>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default EditClassroom
