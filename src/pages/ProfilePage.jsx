import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { db, useAuth } from '../fbConfig';
import StudentSidebar from '../components/StudentSidebar';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import TeacherSidebar from '../components/TeacherSidebar';

function ProfilePage() {

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

    const genderMap = {
        male: "ذكر",
        female: "أنثى"
    };



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
                                        <label className="labels">الرقم الوطني</label>
                                        <input value={info.nationalNumber} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-12" style={{display: info.type !== "teacher" ? "none" : null}}>
                                        <label className="labels mt-2">المادة</label>
                                        <input value={info.subjectAr} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    
                                    <div className="col-md-12">
                                        <label className="labels mt-2">تاريخ الولادة</label>
                                        <input value={info.birthdate} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                </div>
                                <div className="row mt-3" >
                                    <div className="col-md-6" style={{display: info.type === "student" ? null : "none"}}>
                                        <label className="labels">الصف</label>
                                        <input value={levelMap[info.level]} type="text" className="form-control mt-2" readOnly />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="labels">الجنس</label>
                                        <input value={genderMap[info.gender]} type="text" className="form-control mt-2" readOnly />
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
