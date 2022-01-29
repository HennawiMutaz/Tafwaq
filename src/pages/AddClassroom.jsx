import React, { useRef, useState, useEffect } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import TableEntry from '../components/TableEntry';
import ModalInfo from '../components/ModalInfo';
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

   


    let stdCounter = 1, tCounter = 1;


    const [classroomName, setClassroomName] = useState("")
    const level = useRef();
    const sectionNumber = useRef();
    const classroomRef = doc(collection(db, 'classrooms'));
    const [modalMessage, setModalMessage] = useState("");
    let temp = [];
    let temp2 = [];
    const [teachers, setTeachers] = useState([]);
    const [list, setList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [completed, setIsCompleted] = useState(false);
    const [id, setId] = useState("")
    const [saved, setSaved] = useState(false);
    const [updated, setUpdated] = useState("");




    async function updateStudentClassroom(uid) {
        const Ref = doc(db, "users", uid);

        await updateDoc(Ref, {
            classroomID: id
        });
        setUpdated(id);

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
        setUpdated(id);

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
                classroomsIDs: arrayRemove(id)
            });
        } catch (error) {
            console.log(error);
        }
        setUpdated(null);

    }


    useEffect(() => {
        function fun() {
            console.log("useEffect");
            const icons = document.querySelectorAll(".fa-user-plus");
            for (let i = 0; i < icons.length; i++) {
                const el = icons[i];
                el.addEventListener('click', function() {
                   if (el.classList.contains("fa-user-plus")) {
                      el.classList.replace("fa-user-plus","fa-user-minus");
                   } else {
                       el.classList.replace("fa-user-minus","fa-user-plus");
                   }
                })
            }
        }
           
        return fun;
    }, [saved])

    useEffect(async () => {
       
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
        }

       return ()=>{}
    }, [updated])




    async function handleAddClassroom(e) {
        e.preventDefault();
        setIsLoading(true);
        console.log(level.current.value, sectionNumber.current.value);
        if (level.current.value == "true" || sectionNumber.current.value =="true") {
            alert("الرجاء إدخال المعلومات بشكل صحيح");
            // document.getElementById("ModalInfoBtn").click();
            setIsLoading(false);
            return;
        }
        // Generate Classroom Name
        setClassroomName(`${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`);

        const newClassroom = {
            level: level.current.value,
            name: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            sectionNumber: sectionNumber.current.value,
            createdAt: serverTimestamp(),
            id: "",
        };
        
    const listOfSubjects = [
        {
            name: "math",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
            nameAr: "الرياضيات",
        },{
            name: "english",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
            nameAr: "اللغة الإنجليزية",
        },{
            name: "science",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
            nameAr: "علوم",
        }
        ,{
            name: "arabic",
            level: level.current.value,
            className: `${levelMap[level?.current?.value]}  (${sectionNumberMap[sectionNumber?.current?.value]})`,
            createdAt: serverTimestamp(),
            id: "",
            classroomID: "",
            nameAr: "اللغة العربية",
        }
      ]

 
        listOfSubjects.forEach(async (obj) => {
            var docRef = doc(collection(db, 'subjects')); //automatically generate unique id
            obj.classroomID = classroomRef.id;
            obj.id = docRef.id;
           await setDoc(docRef, obj);
          });


        newClassroom.id = classroomRef.id;
        setIsLoading(true);
        setId(newClassroom.id);
        await setDoc(classroomRef, newClassroom);
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

    async function checkSections() {
       
        document.getElementById('sectionDropdown').selectedIndex = -1;
        const options = document.getElementsByTagName("option");
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            element.style.display = "block";
            
        }

        const q = query(collection(db, "classrooms"), where("level", "==", level.current.value));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {            
            const d = document.querySelector(`[check="${doc.data().sectionNumber}"]`)
            d.style.display = "none";
        });
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
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <button style={{ display: saved ? "none" : null }} className="button" onClick={handleAddClassroom}>
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
                                        <select ref={level} dir="rtl" className="form-control form-select" required onChange={() => checkSections()}>
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
                                        <select id='sectionDropdown' ref={sectionNumber} dir="rtl" className="form-control form-select" required>
                                            <option disabled value selected> </option>
                                            <option check="1" value="1">أ</option>
                                            <option check="2" value="2">ب</option>
                                            <option check="3" value="3">ج</option>
                                            <option check="4" value="4">د</option>
                                            <option check="5" value="5">هـ</option>
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
                                                {teachers.map((elem, index) => {
                                                    return (
                                                        <TableEntry 
                                                            teafun={updateTeacherClassroom}
                                                            removeFun = {removeTeacherClassroom}
                                                            key={elem.id || index}
                                                            user={elem}
                                                            icon="fas fa-user-plus icon-hover" 
                                                            counter={elem.type === "student" ? stdCounter++ : tCounter++}
                                                            iconClass={elem.classroomsIDs.includes(id) ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover"}                                                        
                                                            classroomID={id}
                                                            />
                                                    );
                                                })}
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
                                                {list.map((elem, index) => {
                                                    return (
                                                        <TableEntry 
                                                            stdfun={updateStudentClassroom}
                                                            removeFun = {removeStudentClassroom}
                                                            key={elem.id || index}
                                                            user={elem}
                                                            icon="fas fa-user-plus icon-hover"
                                                            counter={elem.type === "student" ? stdCounter++ : tCounter++}
                                                            iconClass={elem.classroomID == id ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover"}                                                        
                                                            classroomID={id}
                                                            />
                                                    );
                                                })}
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
