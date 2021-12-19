import React, { useRef, useState } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import TableEntry from '../components/TableEntry';
import ModalInfo from '../components/ModalInfo';
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    where,
    setDoc,
    getDocs,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { db } from '../fbConfig';



function AddClassroom() {

    const levelMap = {
        1: "الأول",
        2: "الثاني",
        3: "الثالث",
        4: "الرابع",
        5: "الخامس",
        6: "السادس",
        7: "السابع",
        8: "الثامن",
        9: "التاسع",
        10: "العاشر",
        11: "الحادي عشر",
        12: "الثاني عشر",
    }

    const sectionNumberMap = {
        1: "أ",
        2: "ب",
        3: "ج",
        4: "د",
        5: "هـ",
    }

    // const btns = document.getElementsByClassName("fas fa-user-plus");
   
    // for(let i = 0; i < btns.length; i++) {
    //     btns[i].addEventListener('click', () => {
        
    //         if (btns[i].classList.contains("fa-user-plus")) {
    //             btns[i].classList.add("fa-user-minus");
    //             btns[i].classList.remove("fa-user-plus");
    //         } else {
    //             btns[i].classList.remove("fa-user-minus");
    //             btns[i].classList.add("fa-user-plus");
    //         }
    //     })
    // }
    




    async function updateStudentClassroom(uid) {
        const Ref = doc(db, "users", uid);

        await updateDoc(Ref, {
            classroomID: id
        });
    }

    async function updateTeacherClassroom(uid) {
        try {
            const Ref = doc(db, "users", uid);

            await updateDoc(Ref, {
                classroomsIDs: arrayUnion(id)
            });    
        } catch (error) {
            console.log(error);
        }
        
    }


    let stdCounter = 1, tCounter = 1;
    function createTable(elem) {
        let keyVal = Math.random();
        return (
            <TableEntry teafun={updateTeacherClassroom} stdfun={updateStudentClassroom} key={keyVal} user={elem} icon="fas fa-user-plus icon-hover" counter={elem.type === "student" ? stdCounter++ : tCounter++} />
        );
    }

    const [classroomName, setClassroomName] = useState("")
    const level = useRef();
    const sectionNumber = useRef();
    const classroomRef = doc(collection(db, 'classrooms'));
    const mathRef = doc(collection(db, 'subjects'));
    const englishRef = doc(collection(db, 'subjects'));
    const [modalMessage, setModalMessage] = useState("");
    let temp = [];
    let temp2 = [];
    const [teachers, setTeachers] = useState([]);
    const [list, setList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [completed, setIsCompleted] = useState(false);
    const [id, setId] = useState("")
    const [saved, setSaved] = useState(false);

    async function handleAddClassroom(e) {
        e.preventDefault();
        setIsLoading(true);
        console.log(level.current.value, sectionNumber.current.value);
        // if (level.current.value || sectionNumber.current.value) {
        //     setModalMessage("الرجاء إدخال المعلومات بشكل صحيح");
        //     document.getElementById("ModalInfoBtn").click();
        //     setIsLoading(false);
        //     return;
        // }
        // Generate Classroom Name
        setClassroomName(`${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`);

        const newClassroom = {
            level: level.current.value,
            name: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            sectionNumber: sectionNumber.current.value,
            createdAt: serverTimestamp(),
            id: "",
        };
        const math = {
            name: "math",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
        }
        const english = {
            name: "english",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
        }
        math.classroomID = classroomRef.id;
        english.classroomID = classroomRef.id;
        math.id = mathRef.id;
        english.id = englishRef.id;

        newClassroom.id = classroomRef.id;
        setIsLoading(true);
        setId(newClassroom.id);
        await setDoc(classroomRef, newClassroom);
        await setDoc(mathRef, math);
        await setDoc(englishRef, english);
        setIsLoading(false);
        setIsCompleted(true);

        try {
            const q = query(collection(db, "users"), where("type", "==", "student"), where("level", "==", level.current.value));
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
            setSaved(true);
        }



    }


    return (
        <div>
            <a id="ModalInfoBtn" data-bs-toggle="modal" data-bs-target="#ModalInfo"></a>
            <ModalInfo msg={modalMessage} />
            <Header />
            <SideBar />
            <div className="container-fluid no-print">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2"> {completed ? "إضافة الطلاب و المعلمين للصف" : "إضافة صف"} </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div  className="alert d-flex justify-content-end" role="alert">
                                    <button style={{display: saved ? "none" : null }} className="button" onClick={handleAddClassroom}>
                                        <span className="mx-1"> حفظ </span>
                                        <div style={{ display: isLoading ? null : "none" }} className="spinner-border spinner-border-sm" role="status"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* end of title header */}
                    {/* form*/}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <section>
                                <form className="contact-form row" style={{ display: !completed ? null : "none" }}>


                                    <div className=" col-lg-12 mb-4">
                                        <label className="label">المستوى الدراسي</label>
                                        <select ref={level} dir="rtl" className="form-control form-select" required>
                                            <option value selected> </option>
                                            <option value="1">الأول</option>
                                            <option value="2">الثاني</option>
                                            <option value="3">الثالث</option>
                                            <option value="4">الرابع</option>
                                            <option value="5">الخامس</option>
                                            <option value="6">السادس</option>
                                            <option value="7">السابع</option>
                                            <option value="8">الثامن</option>
                                            <option value="9">التاسع</option>
                                            <option value="10">العاشر</option>
                                            <option value="11">الحادي عشر</option>
                                            <option value="12">الثاني عشر</option>
                                        </select>
                                    </div>

                                    <div className=" col-lg-12">
                                        <label className="label">الشعبة</label>
                                        <select ref={sectionNumber} dir="rtl" className="form-control form-select" required>
                                            <option value selected> </option>
                                            <option value="1">أ</option>
                                            <option value="2">ب</option>
                                            <option value="3">ج</option>
                                            <option value="4">د</option>
                                            <option value="5">هـ</option>
                                        </select>
                                    </div>

                                </form>
                                {/* Display After Pressing Save Btn */}
                                <div style={{ display: completed ? null : "none" }} className="container-fluid row mt-5">
                                    {/* Class Info */}

                                    <div className="col-10">
                                        <h1>اسم الصف: {classroomName ?? ""}</h1>
                                    </div>
                                    {/* End of Class Info */}

                                    {/* Teacher Table */}
                                    <div className="col-10 mt-5">
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
                                                {teachers.map(createTable)}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* End of Teacher Table */}
                                    {/* Student Table */}
                                    <div className="col-10 mt-5">
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
                                                {list.map(createTable)}
                                            </tbody>
                                        </table>
                                    </div>
                                    {/* End of Student Table */}

                                </div>
                            </section>
                        </div>
                    </main>
                    {/* end of form */}
                </div>
            </div>
        </div>
    )
}

export default AddClassroom
