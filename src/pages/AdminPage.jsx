import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../fbConfig'
import { doc, getDoc } from 'firebase/firestore';
import Preloader from '../components/Preloader';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import StudentDashboard from './StudentPages/StudentDashboard';
import TeacherDashboard from './TeacherPages/TeacherDashboard';
import ContactSchoolPage from './ContactSchoolPage';

function Account() {
  // const user = auth.currentUser;
  const user = useAuth();
  const [info, setInfo] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [notExist, setNotExist] = useState(false);


  // Triggers at load
  useEffect(() => {
    async function getUser() {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          const admin = docSnap.data();
          setInfo(admin);
          setIsloading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setNotExist(true);
          setIsloading(false);
        }
      } catch (error) {
        console.log(error);
      }
    }

    return getUser();
  }, [user])

  if (isloading)
    return (
      <Preloader hide={!isloading ? { opacity: 0, zIndex: -1 } : null} />
    );

  if (!isloading && info?.type === "admin")
    return (
      <div>

        <Header />
        <SideBar />


        <div className="container-fluid">
          <div className="row">
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
              <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">الرئيسية</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                  <div className="alert d-flex justify-content-end" role="alert">
                    <h4 className="alert-heading fw-bolder"> مرحباً {info?.firstNameAr} </h4>
                  </div>
                </div>
              </div>

              
              <img src="/images/admin-dashboard.svg" className="my-4 w-100" id="myChart" width="900" height="380"></img>


            </main>
          </div>
        </div>
      </div>
    );
  
  if (!isloading && info?.type === "student" && info?.classroomID)
  return (
    <div>
     <StudentDashboard info={info} />
    </div>
  )
  if (!isloading && info?.type === "student" && info?.classroomID === '') {
    return (
    <div>
     <ContactSchoolPage />
    </div>
  )
  }

  if (!isloading && info?.type === "teacher" && info?.classroomsIDs.length !== 0)
  return (
    <div>
     <TeacherDashboard info={info} />
    </div>
  )
   if (!isloading && info?.type === "teacher" && info?.classroomsIDs.length === 0) {
    return (
    <div>
     <ContactSchoolPage />
    </div>
  )
  }
  if (notExist) {
    return (
      <div>
       <ContactSchoolPage />
      </div>
    )
  }

  
}

export default Account