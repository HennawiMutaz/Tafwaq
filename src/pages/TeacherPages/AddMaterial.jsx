import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../../fbConfig';
import $ from 'jquery'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function AddMaterial() {

  const [finished, setfinished] = useState(true);
  var paperworkURL = "";
  var contentURL = "";
  var content2URL = "";
  

  function uploadFile(e) {
    const file = e.target.files;
    console.log(e.target.id);
    console.log(file[0].name);
    var u;


    //* Create a root reference
    const storage = getStorage();

    if (!file) return;
    const storageRef = ref(storage, `files/${file[0].name}`);
   
    const uploadTask = uploadBytesResumable(storageRef, file[0]);

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(prog);
      setfinished(false);
      document.getElementById("prevBtn").disabled = true;
      document.getElementById("nextBtn").disabled = true;
    },
      err => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(url => {
            console.log(url);
            u = url;
            console.log(u);
            if (e.target.id === "uploade-video") {
              console.log("Asfooooor");
              content2URL = u;
              // content2URL = u;
              // console.log(content2URL);
            }
            else if (e.target.id === "uploade-paper") {
              console.log("Muttttaz");
              contentURL = u;
            }
            else if (e.target.id === "uploade-paper2") {
              console.log("malllllaaaaaaak");
              paperworkURL = u;
            }
          })
        document.getElementById("prevBtn").disabled = false;
        document.getElementById("nextBtn").disabled = false;
        
        setfinished(true);
      }
    );
  }

  const lectureTitle = useRef("");
  const lectureDesc = useRef("");
  const lectureLink = useRef("");
  const contentTitle = useRef("");
  const content2Title = useRef("");
  const paperworkTitle = useRef("");

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

      if (y[i].value == "" && y[i].id != "uploade-paper" && y[i].id != "uploade-title2" && y[i].id != "uploade-paper2" && y[i].id != "uploade-title3" && y[i].id != "uploade-paper3") {

        y[i].className += " invalid";

        valid = true;
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



      lectureLink.current.value = lectureLink.current.value.replace("watch?v=", "embed/");

      

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
        content2Title: content2Title.current.value,
        content2URL: content2URL,
        paperworkTitle: paperworkTitle.current.value,
        paperworkURL: paperworkURL,
        contentTitle: contentTitle.current.value,
        contentURL: contentURL,
        
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
                <p>
                  <input ref={lectureLink} autoComplete='off' id="link" placeholder="رابط الفيديو (منصة اليوتيوب)..." />
                </p>
                <p>
                 <input ref={content2Title}  autoComplete='off' id="uploade-title1" type="text" placeholder="عنوان المحتوى (۱) ..." />
                </p>
                <p>
                  رفع محتوى
                  <br />
                  <input id="uploade-video" type="file" onChange={(event) => uploadFile(event)} />
                  <div style={{ display: !finished ? null : "none" }} className="spinner-border spinner-border-sm" role="status"></div>
                </p>
              </div>
              <div className="tab">محتويات الحصة :
                <p> <input ref={contentTitle} autoComplete='off' id="uploade-title2" type="text" placeholder="عنوان المحتوى ..." />
                </p>
                <p>
                  إضافة المحتوى 
                  <br />  <input autoComplete='off' id="uploade-paper2" type="file" onChange={(event) => uploadFile(event)} />
                </p>
                <p> <input ref={paperworkTitle} autoComplete='off' id="uploade-title3" type="text" placeholder="عنوان ورقة العمل  ..." />
                </p>
                <p>
                  إضافة ورقة عمل
                  <br />  <input autoComplete='off' id="uploade-paper" type="file" onChange={(event) => uploadFile(event)} />
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
