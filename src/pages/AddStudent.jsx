import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

function AddStudent() {

    const navigate = useNavigate();
    const lastName = useRef();
    const midName = useRef();
    const firstName = useRef();
    const birthdate = useRef();
    const level = useRef();
    const gender = useRef();


    function handleAddStudent(e) {
        e.preventDefault();
        // window.location.href = "";
    }


    return (
        <div>

            <Header />
            <SideBar />
            <div className="container-fluid">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2">إضافة طالب</h1>
                            <div class="btn-toolbar mb-2 mb-md-0">
                                <div className="alert d-flex justify-content-end" role="alert">
                                    <a className="btn btn-primary btn-lg" href="">
                                        حفظ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </main>
                    {/* end of title header */}
                    {/* form*/}
                    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                                            <label className="label" htmlFor="">الاسم الاول بالانجليزي</label> <br />
                                            <input autoComplete="off"  id="" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor=""> اسم الأب بالانجليزي </label> <br />
                                            <input autoComplete="off"  id="" className="input-text js-input" type="text" required />
                                        </div>
                                        <div className="form-field col-lg-3 ">
                                            <label className="label" htmlFor=""> اسم العائلة بالانجليزي </label> <br />
                                            <input autoComplete="off"  id="" className="input-text js-input" type="text" required />
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
                                            <select dir="rtl" className="form-control form-select" required>
                                                <option disabled selected value> </option>
                                                <option>الأول</option>
                                                <option>الثاني</option>
                                                <option>الثالث</option>
                                                <option>الرابع</option>
                                                <option>الخامس</option>
                                                <option>السادس</option>
                                                <option>السابع</option>
                                                <option>الثامن</option>
                                                <option>التاسع</option>
                                                <option>العاشر</option>
                                                <option>الحادي عشر</option>
                                                <option>الثاني عشر</option>
                                            </select>
                                        </div>
                                        <div className=" col-lg-3">
                                            <label className="label">الجنس</label>
                                            <select dir="rtl" className="form-control form-select" required>
                                                <option disabled selected value> </option>
                                                <option>ذكر</option>
                                                <option>أنثى</option>
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
