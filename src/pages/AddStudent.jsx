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
    getDocs,
    where,
} from 'firebase/firestore';
import { db } from '../fbConfig';
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from 'firebase/auth';




function AddStudent() {


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
    const level = useRef();
    const gender = useRef();
    const firstNameEn = useRef();
    const midNameEn = useRef();
    const lastNameEn = useRef();
    const nationalNumber = useRef();

    //Modal
    const [modalMessage, setModalMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    async function handleAddStudent(e) {
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
        console.log(level.current.value);
        
        
        if (flag || gender.current.value == "true" || !birthdate.current.value || level.current.value == "true") {
            alert("الرجاء إدخال المعلومات بشكل صحيح");
        }      
        else if (nationalNumber.current.value.length !== 10 || !nationalNumber.current.value.match(/^[0-9]+$/)) {
            alert("الرقم الوطني يجب ان يتكون من 10 أرقام");
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
                password += chars.substring(randomNumber, randomNumber + 1);
            }

            console.log(password);

            createUserWithEmailAndPassword(auth, email, password).then(async (result) => {
                const user = result.user;

                if (user) {
                    let newUser = {
                        firstNameAr: firstName.current.value.trim(),
                        midNameAr: midName.current.value.trim(),
                        lastNameAr: lastName.current.value.trim(),
                        //
                        firstNameEn: firstNameEn.current.value.trim(),
                        midNameEn: midNameEn.current.value.trim(),
                        lastNameEn: lastNameEn.current.value.trim(),
                        //
                        birthdate: birthdate.current.value,
                        level: level.current.value,
                        gender: gender.current.value,
                        email: email,
                        uid: user.uid,
                        //
                        type: "student",
                        createdAt: serverTimestamp(),
                        nationalNumber: nationalNumber.current.value.trim(), 
                        classroomID: '',
                    };
                    await setDoc(doc(db, "users", user.uid), newUser);

                    setIsLoading(false);
                    // setModalMessage("تم إضافة الطالب بنجاح") ;
                    //add password to object for printing on screen
                    newUser["password"] = password;
                    console.log(newUser);
                    setModalMessage(newUser);
                } else {
                    setIsLoading(false);
                    setModalMessage("حدث خطأ");
                }

                //show modal
                document.getElementById("ModalBtn").click();
                //reset form
                document.getElementById("Reset").click();

                signOut(auth);
            });
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
                            <h1 className="h2">إضافة طالب</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <button className="button" href="" onClick={handleAddStudent}>
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
                                        <div className=" col-lg-3">
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

export default AddStudent
