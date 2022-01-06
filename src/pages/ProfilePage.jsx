import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db, useAuth } from '../fbConfig';
import StudentSidebar from '../components/StudentSidebar';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import TeacherSidebar from '../components/TeacherSidebar';

function ProfilePage() {
    const currentUser = useAuth();
    const [info, setInfo] = useState(null);


    useEffect(() => {

        async function getUser() {
            try {
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    // console.log("Document data:", docSnap.data());
                    setInfo(docSnap.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error);
            }
        }

        return getUser();
    }, [currentUser])



  // render

  if (!info) {
    return (
      <div>

      </div>
    )
  }


    return (
        <div>
            <Header />
            {info?.type === "teacher" ? <TeacherSidebar /> : (info?.type === "student" ? <StudentSidebar /> : <SideBar />)}
            <div className="container-fluid">
                <div className="row mt-5">
                    {/* title header & add student btn */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

                            <h4 className="text-right">الملف الشخصي</h4>

                        </div>
                    </main>


                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <div className="col-10 mx-auto ">
                                {/* <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className=" d-flex flex-column align-items-center text-center p-3 py-5">
                                            <img className=" mt-5" width="150px" src="images/profile.png" />
                                            <span className="mt-2 font-weight-bold"> احمد مصطفى احمد علي </span>
                                            <span className="text-black-50">AMALI@TWAFAWOQ.EDU.JO</span>
                                        </div>
                                    </div> */}
                                <div className="row mt-2">
                                    <div className="col-md-4" >
                                        <label className="labels">الاسم الاول</label>
                                        <input value={info.firstNameAr} type="text" className="  form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-4" >
                                        <label className="labels">اسم الأب </label>
                                        <input value={info.midNameAr} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="labels">العائلة</label>
                                        <input value={info.lastNameAr} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12 ">
                                        <label className="labels">رقم الهاتف</label>
                                        <input value={""} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels mt-2">المادة</label>
                                        <input value={info.subjectAr} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels mt-2">المرحلة الدراسية المسؤول عنها</label>
                                        <input value={""} type="text" className="form-control mt-2" readOnly  />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="labels mt-2">مكان الدراسة</label>
                                        <input value={""} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-6">
                                        <label className="labels">البلد</label>
                                        <input value={""} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">المحافظة</label>
                                        <input value={""} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </main>
                </div>
            </div>
        </div >
    )
}

export default ProfilePage
