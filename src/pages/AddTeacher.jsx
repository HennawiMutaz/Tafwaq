import React, { useRef, useState } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Modal from '../components/Modal';
import { signup } from '../fbConfig';
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
  setDoc,
} from 'firebase/firestore';
import { db } from '../fbConfig';




function AddTeacher() {

    const lastName = useRef();
    const midName = useRef();
    const firstName = useRef();
    const birthdate = useRef();
    const subject = useRef();
    const gender = useRef();
    const firstNameEn = useRef();
    const midNameEn = useRef();
    const lastNameEn = useRef();
    //Modal
    const [modalMessage, setModalMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    function handleAddTeacher(e) {
        e.preventDefault();
        setIsLoading(true);
        console.log(firstName.current.value);
        console.log(midName.current.value);
        console.log(lastName.current.value);
        console.log(firstNameEn.current.value);
        console.log(midNameEn.current.value);
        console.log(lastNameEn.current.value);
        console.log(birthdate.current.value);
        console.log(subject.current.value);
        console.log(gender.current.value); 
        
        // 

        const email = firstNameEn.current.value.slice(0,2) + midNameEn.current.value.slice(0,2) + lastNameEn.current.value + birthdate.current.value.slice(0,4) + "@tafwaq.edu.jo";
        console.log(email);

        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 12;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
           }
        
        console.log(password);

        signup(email, password).then(async (result) => {
            const user = result.user;
            
            if (user) {
                const newUser = {
                    firstNameAr: firstName.current.value.trim(),
                    midNameAr: midName.current.value.trim(),
                    lastNameAr: lastName.current.value.trim(),
                    //
                    firstNameEn: firstNameEn.current.value.trim(),
                    midNameEn: midNameEn.current.value.trim(),
                    lastNameEn: lastNameEn.current.value.trim(),
                    //
                    birthdate: birthdate.current.value,
                    subject: subject.current.value,
                    gender: gender.current.value,
                    email: email,
                    //
                    type: "teacher",
                    createdAt: serverTimestamp(),
                };
                await setDoc(doc(db, "users", user.uid), newUser);

                setIsLoading(false);
                setModalMessage("تم إضافة المعلم بنجاح") ;
                newUser["password"] = password;
                console.log(newUser);
                setModalMessage(newUser) ;
            } else {
                setIsLoading(false);
                setModalMessage("حدث خطأ") ;
            }
            
            //show modal
            document.getElementById("ModalBtn").click();
            document.getElementById("Reset").click();
        });
        
    }


    return (
        <div>
            <a id="ModalBtn" data-bs-toggle="modal" data-bs-target="#Modal"></a>
            <Modal msg={modalMessage} /> 
            <Header />
            <SideBar />
            <div className="container-fluid no-print">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">إضافة معلم</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <a className="btn btn-primary btn-lg" href="" onClick={handleAddTeacher}>
                                    <span className="mx-1"> حفظ </span>
                                    <div style={{display: isLoading ? null : "none"}} class="spinner-border spinner-border-sm" role="status"></div>
                                    </a>
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
                                    <input id="Reset" type="reset" hidden/>
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
                                   
                                    </div>
                                    {/* ENGLISH NAME */}
                                    <div className="row mt-5">
                                        <div className="form-field col-lg-3">
                                            <label className="label" htmlFor="firstNameEn">الاسم الاول بالانجليزي</label> <br />
                                            <input ref={firstNameEn} autoComplete="off"  id="firstNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="midNameEn"> اسم الأب بالانجليزي </label> <br />
                                            <input ref={midNameEn} autoComplete="off"  id="midNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor="lastNameEn"> اسم العائلة بالانجليزي </label> <br />
                                            <input ref={lastNameEn} autoComplete="off"  id="lastNameEn" className="input-text js-input" type="text" required />
                                        </div>
                                    </div>
                                    {/* END OF ENGLISH NAME */}
                                    {/* GENDER & LEVEL & BIRTHDATE */}
                                    <div className="row mt-5">
                                    <div className="form-field col-lg-3 ">
                                        <label className="label" htmlFor="date">تاريخ الميلاد</label> <br />
                                        <input ref={birthdate} id="date" className="input-text js-inputtop" type="date" required />
                                    </div>
                                        <div className=" col-lg-3">
                                            <label className="label">المادة</label>
                                            <select ref={subject} dir="rtl" className="form-control form-select" required>
                                                <option value selected> </option>
                                                <option value="علوم" >علوم</option>
                                                <option value="رياضيات">رياضيات</option>
                                                <option value="اللغة انجليزية">اللغة انجليزية</option>
                                                <option value="اللغة العربية">اللغة العربية</option>
                                                <option value="الكيمياء">الكيمياء</option>
                                                <option value="الفيزياء">الفيزياء</option>
                                                <option value="تاريخ">تاريخ</option>
                                                <option value="جغرافيا">جغرافيا</option>
                                                <option value="وطنية">وطنية</option>
                                                <option value="علوم الأرض">علوم الأرض</option>
                                                <option value="العلوم الحياتية">العلوم الحياتية </option>
                                                <option value="تاريخ الأردن">تاريخ الأردن</option>
                                                <option value="علوم الحاسوب">علوم الحاسوب  </option>
                                                <option value="علوم إسلامية">علوم إسلامية  </option>
                                            </select>
                                        </div>
                                        <div className=" col-lg-3">
                                            <label className="label">الجنس</label>
                                            <select ref={gender} dir="rtl" className="form-control form-select" required>
                                                <option value selected> </option>
                                                <option value="ذكر">ذكر</option>
                                                <option value="أنثى">أنثى</option>
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
    )
}

export default AddTeacher
