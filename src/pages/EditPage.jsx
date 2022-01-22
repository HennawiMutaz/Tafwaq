import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { useLocation } from 'react-router';
import {
    collection,
    addDoc,
    where,
    getDocs,
    updateDoc,
    doc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    query,
    orderBy,
    setDoc,
} from 'firebase/firestore';
import { auth, db } from '../fbConfig';
import { deleteUser } from 'firebase/auth';

function EditPage() {
    const subjectMap = {
        science: "علوم",
        math: "رياضيات",
        english: "اللغة انجليزية",
        arabic: "اللغة العربية",
        chemistry: "الكيمياء",
        physics: "الفيزياء",
        history: "تاريخ",
        geography: "جغرافيا",
        patriotism: "وطنية",
        geology: "علوم الأرض",
        biology: "العلوم الحياتية",
        history_of_jordan: "تاريخ الأردن",
        computer_science: "علوم الحاسوب",
        islamics: "علوم إسلامية",
    }

    const location = useLocation();
    const { user } = location.state;

    const lastName = useRef();
    const midName = useRef();
    const firstName = useRef();
    const birthdate = useRef();
    const level = useRef();
    const gender = useRef();
    const firstNameEn = useRef();
    const midNameEn = useRef();
    const lastNameEn = useRef();
    const nationalNumber = useRef();
    const subject = useRef();

    useEffect(() => {
        
        firstName.current.value = user.firstNameAr;
        midName.current.value = user.midNameAr;
        lastName.current.value = user.lastNameAr;
        firstNameEn.current.value = user.firstNameEn
        midNameEn.current.value = user.midNameEn;
        lastNameEn.current.value = user.lastNameEn;
        birthdate.current.value = user.birthdate;
        nationalNumber.current.value = user.nationalNumber;
        gender.current.value = user.gender;
        if (user.type === "teacher") 
        subject.current.value = user.subject;
        else
        level.current.value = user.level;


        return () => {
            
        }
    }, [])


    const [isLoading, setIsLoading] = useState(false);


    function handleEditUser(e) {
        e.preventDefault();
        //* Validation
        const isEmpty = str => !str.trim().length;
        let flag = false;
        const inputs = document.querySelectorAll('input[type="text"]');
        var inputList = Array.prototype.slice.call(inputs);
        inputList.shift();
        inputList.forEach(elem => {
            if(isEmpty(elem.value)) {flag = true; console.log(elem);}
        });
        console.log(flag);
        console.log(gender.current.value )
        console.log( !birthdate.current.value )  //if empty => output: true
        console.log(level.current.value);
        
        
        if (flag || gender.current.value == "true" || !birthdate.current.value) {
            alert("الرجاء إدخال المعلومات بشكل صحيح");
        }
        else if (flag || (user.type === "student" && level.current.value == "true")) {
            
        }
        else if (nationalNumber.current.value.length !== 10 || !nationalNumber.current.value.match(/^[0-9]+$/)) {
            alert("الرقم الوطني يجب ان يتكون من 10 أرقام");
        }

        //* If info is valid
        else {
            let updatedData = {
                firstNameAr: firstName.current.value.trim(),
                midNameAr: midName.current.value.trim(),
                lastNameAr: lastName.current.value.trim(),
                //
                firstNameEn: firstNameEn.current.value.trim(),
                midNameEn: midNameEn.current.value.trim(),
                lastNameEn: lastNameEn.current.value.trim(),
                //
                birthdate: birthdate.current.value,
                gender: gender.current.value,
                email: user.email,
                uid: user.uid,
                //
                type: user.type,
                createdAt: user.createdAt,
                lastUpdated: serverTimestamp(),
                nationalNumber: nationalNumber.current.value.trim(), 
            };
            if (user.type === "teacher") { 
                updatedData.subject = subject.current.value;
                updatedData.subjectAr = subjectMap[subject.current.value];
                updatedData.classroomsIDs = user.classroomsIDs;
            }
            else {
                updatedData.level = level.current.value;
            }
            setIsLoading(true);
            updateDoc(doc(db, "users", user.uid), updatedData)
            .then( () => {
                setIsLoading(false)
                alert("تم تعديل المعلومات بنجاح");
            })

        }

    }

    async function handleDeleteUser() {
        if(window.confirm("هل أنت متأكد من حذف المستخدم كلياً ؟") == true) {
           

            //delete from firestore
            deleteDoc(doc(db, "users", user.uid))
            .then(() => console.log("deleted user from firestore"))
            .catch((error) => console.log(error))

                const q = query(collection(db, "classrooms", user.classroomID, "submissions"), where("studentID", "==", user.uid));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    deleteDoc(doc.ref)
                    .then(console.log("removed"))
                    .catch(err => console.log(err))
                });

            alert("تم حذف المستخدم بنجاح");
            window.history.go(-1);
        }
    }



    return (
        <div>
            <Header />
            <SideBar />
            <div className="container-fluid no-print">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">تعديل معلومات المستخدم</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <button className="button"  onClick={handleEditUser}>
                                        <span className="mx-1"> حفظ </span>
                                        <div style={{ display: isLoading ? null : "none" }} className="spinner-border spinner-border-sm" role="status"></div>
                                    </button>
                                </div>
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <button className="button-delete" onClick={handleDeleteUser}>
                                        <span className="mx-1"> حذف </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* end of title header */}
                    {/* form*/}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <section className="get-in-touch">
                                <form className="contact-form row">
                                    <input id="Reset" type="reset" hidden />
                                    <div className="row">
                                        <div className="form-field col-lg-3">
                                            <label className="label" htmlFor="firstName">الاسم الاول</label> <br />
                                            <input autoComplete="off" ref={firstName} id="firstName" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="midName">اسم الأب</label> <br />
                                            <input autoComplete="off" ref={midName} id="midName" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="lastName">اسم العائلة</label> <br />
                                            <input autoComplete="off" ref={lastName} id="lastName" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="lastName">الرقم الوطني </label> <br />
                                            <input autoComplete="off" ref={nationalNumber} id="nationalNumber" className="input-text js-input" type="text" required />
                                        </div>

                                    </div>
                                    {/* ENGLISH NAME */}
                                    <div className="row mt-5">
                                        <div className="form-field col-lg-3">
                                            <label className="label" htmlFor="firstNameEn">الاسم الاول بالانجليزي</label> <br />
                                            <input ref={firstNameEn} autoComplete="off" id="firstNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="midNameEn"> اسم الأب بالانجليزي </label> <br />
                                            <input ref={midNameEn} autoComplete="off" id="midNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="lastNameEn"> اسم العائلة بالانجليزي </label> <br />
                                            <input ref={lastNameEn} autoComplete="off" id="lastNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                    </div>
                                    {/* END OF ENGLISH NAME */}
                                    {/* GENDER & LEVEL & BIRTHDATE */}
                                    <div className="row mt-5">
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="date">تاريخ الميلاد</label> <br />
                                            <input ref={birthdate} id="date" className="input-text js-inputtop" type="date" required />
                                        </div>
                                        <div className=" col-lg-3" style={{display: user.type === "student" ? null : "none"}}>
                                            <label className="label">الصف</label>
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
                                        <div className=" col-lg-3" style={{display: user.type === "teacher" ? null : "none"}}>
                                            <label className="label">المادة</label>
                                            <select ref={subject} dir="rtl" className="form-control form-select" required>
                                                <option value selected> </option>
                                                <option value="science" >علوم</option>
                                                <option value="math">رياضيات</option>
                                                <option value="english">اللغة الانجليزية</option>
                                                <option value="arabic">اللغة العربية</option>
                                                <option value="chemistry">الكيمياء</option>
                                                <option value="physics">الفيزياء</option>
                                                <option value="history">تاريخ</option>
                                                <option value="geography">جغرافيا</option>
                                                <option value="patriotism">وطنية</option>
                                                <option value="geology">علوم الأرض</option>
                                                <option value="biology">العلوم الحياتية </option>
                                                <option value="history_of_jordan">تاريخ الأردن</option>
                                                <option value="computer_science">علوم الحاسوب  </option>
                                                <option value="islamics">علوم إسلامية  </option>
                                            </select>
                                        </div>
                                        <div className=" col-lg-3">
                                            <label className="label">الجنس</label>
                                            <select ref={gender} dir="rtl" className="form-control form-select" required>
                                                <option value selected> </option>
                                                <option value="male">ذكر</option>
                                                <option value="female">أنثى</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* END OF GENDER & LEVEL & BIRTHDATE */}
                                </form>
                            </section>
                        </div>
                    </main>
                    {/* end of form */}
                </div>
            </div>
        </div>
    );
}

export default EditPage
