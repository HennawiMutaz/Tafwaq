import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
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
} from 'firebase/firestore';
import { db } from '../fbConfig';



function AddStudent() {

    const navigate = useNavigate();
    const lastName = useRef();
    const midName = useRef();
    const firstName = useRef();
    const birthdate = useRef();
    const level = useRef();
    const gender = useRef();
    const firstNameEn = useRef();
    const midNameEn = useRef();
    const lastNameEn = useRef();


    function handleAddStudent(e) {
        e.preventDefault();
        console.log(firstName.current.value);
        console.log(midName.current.value);
        console.log(lastName.current.value);
        console.log(firstNameEn.current.value);
        console.log(midNameEn.current.value);
        console.log(lastNameEn.current.value);
        console.log(birthdate.current.value);
        console.log(level.current.value);
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
            let user = result.user;
            
            if (user) {
                const userCollectionRef = collection(db, 'users');
                
                const newUser = {
                            uid: user.uid, //auth uid
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
                            //
                            type: "student",
                            createdAt: serverTimestamp(),
                          };
                    
                          // Add to firebase
                          const docRef = await addDoc(userCollectionRef, newUser);
                          console.log(docRef.id);
                          
            }
        });
    }


    return (
        <div>

            <Header />
            <SideBar />
            <div className="container-fluid">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">إضافة طالب</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <a className="btn btn-primary btn-lg" href="" onClick={handleAddStudent}>
                                        حفظ
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
                                    {/* GENDER & LEVEL */}
                                    <div className="row mt-5">
                                    <div className="form-field col-lg-3 ">
                                        <label className="label" htmlFor="date">تاريخ الميلاد</label> <br />
                                        <input ref={birthdate} id="date" className="input-text js-inputtop" type="date" required />
                                    </div>
                                        <div className=" col-lg-3">
                                            <label className="label">الصف</label>
                                            <select ref={level} dir="rtl" className="form-control form-select" required>
                                                <option disabled value> </option>
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
                                                <option disabled value> </option>
                                                <option value="male">ذكر</option>
                                                <option value="female">أنثى</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* END OF GENDER & LEVEL */}
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
