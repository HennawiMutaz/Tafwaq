import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../fbConfig'
import { doc, getDoc } from 'firebase/firestore';
import Preloader from '../components/Preloader';
import SideBar from '../components/SideBar';
import Header from '../components/Header';

function Account() {
  // const user = auth.currentUser;
  const user = useAuth();
  const [info, setInfo] = useState(null);
  const [isloading, setIsloading] = useState(true);
 

    // Triggers at load
    useEffect(() => {
     async function getUser () {
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
         }
        } catch (error) {
         console.log(error);
        }
    }    

    return getUser();
    }, [user])
    


  return (
    <div>
    <Preloader hide={!isloading ? {opacity:0, zIndex:-1} : null} />
   
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

      {/* TODO: INSERT IMAGE HERE */}
      <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> 

      <h2>عنوان القسم</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">عنوان</th>
              <th scope="col">عنوان</th>
              <th scope="col">عنوان</th>
              <th scope="col">عنوان</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>بيانات</td>
              <td>عشوائية</td>
              <td>تثري</td>
              <td>الجدول</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>تثري</td>
              <td>مبهة</td>
              <td>تصميم</td>
              <td>تنسيق</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>عشوائية</td>
              <td>غنية</td>
              <td>قيمة</td>
              <td>مفيدة</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>معلومات</td>
              <td>تثري</td>
              <td>توضيحية</td>
              <td>عشوائية</td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>الجدول</td>
              <td>بيانات</td>
              <td>تنسيق</td>
              <td>قيمة</td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>قيمة</td>
              <td>مبهة</td>
              <td>الجدول</td>
              <td>تثري</td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>قيمة</td>
              <td>توضيحية</td>
              <td>غنية</td>
              <td>عشوائية</td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>تثري</td>
              <td>مفيدة</td>
              <td>معلومات</td>
              <td>مبهة</td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>بيانات</td>
              <td>عشوائية</td>
              <td>تثري</td>
              <td>الجدول</td>
            </tr>
            <tr>
              <td>1,009</td>
              <td>تثري</td>
              <td>مبهة</td>
              <td>تصميم</td>
              <td>تنسيق</td>
            </tr>
            <tr>
              <td>1,010</td>
              <td>عشوائية</td>
              <td>غنية</td>
              <td>قيمة</td>
              <td>مفيدة</td>
            </tr>
            <tr>
              <td>1,011</td>
              <td>معلومات</td>
              <td>تثري</td>
              <td>توضيحية</td>
              <td>عشوائية</td>
            </tr>
            <tr>
              <td>1,012</td>
              <td>الجدول</td>
              <td>تثري</td>
              <td>تنسيق</td>
              <td>قيمة</td>
            </tr>
            <tr>
              <td>1,013</td>
              <td>قيمة</td>
              <td>مبهة</td>
              <td>الجدول</td>
              <td>تصميم</td>
            </tr>
            <tr>
              <td>1,014</td>
              <td>قيمة</td>
              <td>توضيحية</td>
              <td>غنية</td>
              <td>عشوائية</td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>بيانات</td>
              <td>مفيدة</td>
              <td>معلومات</td>
              <td>الجدول</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>
      </div>
  )
}

export default Account