import React, { useEffect, useRef } from 'react'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../fbConfig';
import $ from 'jquery'


function AddMaterial() {

  const lectureTitle = useRef("");
  const lectureDesc = useRef("");
  const lectureLink = useRef("");
  const linkTitle = useRef("");

  const location = useLocation();
  const { classroom, user, subject } = location.state;

  var currentTab = 0;

  useEffect(() => {

    // console.log(classroom);
    // console.log(user);
    // console.log("^^^^^^^^",subject);

    const title = $("#title");
    title.on("change", () => { $(this).className = '' });

    const desc = $("#desc");
    desc.on("change", () => { $(this).className = '' });

    const prevBtn = $("#prevBtn");
    prevBtn.on("click", () => { nextPrev(-1) });

    const nextBtn = $("#nextBtn");
    nextBtn.on("click", () => { nextPrev(1) });



    if (document.getElementById('regForm')) {
      showTab(currentTab);
    }
  }, [])

  // teacher



  function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");

    for (i = 0; i < y.length; i++) {

      if (y[i].value == "" && y[i].id != "uploade-title1" && y[i].id != "uploade-paper1" && y[i].id != "uploade-title2" && y[i].id != "uploade-paper2" && y[i].id != "uploade-title3" && y[i].id != "uploade-paper3") {

        y[i].className += " invalid";

        valid = false;
      }
    }

    if (valid) {
      document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
  }
  function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
  }
  function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
      document.getElementById("nextBtn").innerHTML = "حفظ";
    } else {
      document.getElementById("nextBtn").innerHTML = "التالي";
    }
    fixStepIndicator(n)

  }


  function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
      //* When Submitted

      document.getElementById("success").style.display = "block";
      document.getElementById("nextBtn").style.display = "none";
      document.getElementById("prevBtn").style.display = "none";

       
      lectureLink.current.value = lectureLink.current.value.replace("watch?v=", "embed/" );
    

      let newLecture = {
        classroomID: classroom.id,
        description: lectureDesc.current.value,
        link: lectureLink.current.value,
        subjectID: subject.id,
        title: lectureTitle.current.value,
        createdAt: serverTimestamp(),
        teacherID: user.uid,
        teacherNameAr: user.firstNameAr + " " + user.lastNameAr,
        subjectName: subject.name,
        subjectNameAr: subject.nameAr,
      };
      addDoc(collection(db, "lectures"), newLecture)
        .then(() => {
          console.log("success");
        })
        .catch(error => {
          console.log(error);
        })
      return false;
    }
    showTab(currentTab);
  }





  return (
    <div>
      <link rel="stylesheet" href="/styles/teacherpage.css" />
      <Header />
      <TeacherSidebar />

      <div className="container-fluid">
        <div className="row mt-3">
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
              <h1 className="h2">إضافة حصة جديدة</h1>
              <div className="btn-toolbar mb-2 mb-md-0">

              </div>
            </div>
          </main>
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div id='success' style={{ display: 'none', textAlign: 'center', marginTop: '10px' }}>
              <h3>تم إضافة الحصة بنجاح</h3>
              <Link
                to="/account"
                className="button"
              >
                العودة إلى الحصص
              </Link>
            </div>
            <form id="regForm" >
              <div className="tab">
                <p><input ref={lectureTitle} autoComplete='off' id="title" placeholder="العنوان ..." /></p>
                <p><input ref={lectureDesc} autoComplete='off' id="desc" placeholder="الوصف ..." /></p>
              </div>
              <div className="tab">محتويات الحصة :
                <p><input ref={lectureLink} autoComplete='off' id="link" placeholder="رابط الفيديو (منصة اليوتيوب)..." onInput="this.className = ''" /></p>
                <p> <input ref={linkTitle} autoComplete='off' id="uploade-title1" type="text" placeholder="عنوان المحتوى (۱) ..." />
                </p>
                <p>
                  إضافة المحتوى (۱)
                  <br />  <input id="uploade-paper1" type="file" onInput="this.className = ''" />
                </p>
              </div>
              <div className="tab">محتويات الحصة :
                <p> <input autoComplete='off' id="uploade-title2" type="text" placeholder="عنوان المحتوى (۲) ..." />
                </p>
                <p>
                  إضافة المحتوى (۲)
                  <br />  <input autoComplete='off' id="uploade-paper2" type="file" onInput="this.className = ''" />
                </p>
                <p> <input autoComplete='off' id="uploade-title3" type="text" placeholder="عنوان ورقة العمل  ..." />
                </p>
                <p>
                  إضافة ورقة عمل
                  <br />  <input autoComplete='off' id="uploade-paper3" type="file" onInput="this.className = ''" />
                </p>
              </div>
              <div style={{ overflow: 'auto' }}>
                <div style={{ float: 'right' }}>
                  <button className="prev-btn" type="button" id="prevBtn" >السابق</button>
                  <button className="next-btn" type="button" id="nextBtn" >التالي</button>
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <span className="step" />
                <span className="step" />
                <span className="step" />
              </div>
            </form>


          </main>
        </div>
      </div>
    </div>
  )
}

export default AddMaterial
