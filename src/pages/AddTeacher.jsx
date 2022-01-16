import React, { useRef, useState } from 'react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Modal from '../components/Modal';
import ModalInfo from '../components/ModalInfo';
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
  getDocs,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../fbConfig';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut} from 'firebase/auth';




function AddTeacher() {

    
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

    
    let config = {
        apiKey: "AIzaSyAZU9mr36OLEC5rM-5WcWcGKueAFu5fTb4",
        authDomain: "tfwaq-36acd.firebaseapp.com",
        projectId: "tfwaq-36acd",
        storageBucket: "tfwaq-36acd.appspot.com",
        messagingSenderId: "353022946163",
        appId: "1:353022946163:web:509cb82e1c8b2fa21b7306"
    };
    let secondaryApp = initializeApp(config, "Secondary");
    const auth = getAuth(secondaryApp);

    const lastName = useRef();
    const midName = useRef();
    const firstName = useRef();
    const birthdate = useRef();
    const subject = useRef();
    const gender = useRef();
    const firstNameEn = useRef();
    const midNameEn = useRef();
    const lastNameEn = useRef();
    const nationalNumber = useRef();
    //Modal
    const [modalMessage, setModalMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function handleAddTeacher(e) {
        e.preventDefault();
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
        console.log(subject.current.value);
        
        if (flag || gender.current.value == "true" || !birthdate.current.value || subject.current.value == "true") {
            alert("الرجاء إدخال المعلومات بشكل صحيح");
        }
        else {
        setIsLoading(true);

        // 
        const fn = firstNameEn.current.value.trim().toLowerCase();
        const mn = midNameEn.current.value.trim().toLowerCase();
        const ln = lastNameEn.current.value.trim().toLowerCase();
        let username = fn.slice(0,2) + mn.slice(0,2) + ln + birthdate.current.value.slice(0,4);
        let email = username + "@tafwaq.edu.jo";
        

            try {
                let temp = [];
                const q = query(collection(db, "users"), where("type","!=","admin"));
  
              const querySnapshot = await getDocs(q);
              querySnapshot.forEach((doc) => {
                  let e = doc.data().email;
                  console.log(e);
                  if (e.includes(username)) {
                      console.log(doc.id, " => ", doc.data());
                      temp.push(e);
                  }
              });       
              const count = temp.length;
              console.log(count);
              if (count >= 1) {
                console.log("already in use...adding count");
                email = username + count + "@tafwaq.edu.jo";
              }
             } catch (error) {
                 console.log(error);
             }
             
             console.log(email);
        

        let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let passwordLength = 8;
        let password = "";

        for (let i = 0; i <= passwordLength; i++) {
            let randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
           }
        
        console.log(password);

        createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
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
                    subjectAr: subjectMap[subject.current.value],
                    gender: gender.current.value,
                    email: email,
                    classroomsIDs: [],
                    uid: user.uid,
                    //
                    type: "teacher",
                    createdAt: serverTimestamp(),
                    nationalNumber: nationalNumber.current.value.trim(),
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
        
        signOut(auth);
    }
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
                                    <button className="button" href="" onClick={handleAddTeacher}>
                                    <span className="mx-1"> حفظ </span>
                                    <div style={{display: isLoading ? null : "none"}} class="spinner-border spinner-border-sm" role="status"></div>
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
                                    <div className="form-field col-lg-3 ">
                                        <label className="label" htmlFor="lastName">الرقم الوطني </label> <br />
                                        <input autoComplete="off" ref={nationalNumber} id="nationalNumber" className="input-text js-input" type="text" required />
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
    )
}

export default AddTeacher
