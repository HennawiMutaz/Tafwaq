import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import { useLocation } from 'react-router'
import { collection, addDoc, serverTimestamp, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from '../../fbConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function AddMaterial() {

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);


  async function submitForm(e) {

    e.preventDefault();
    console.log(lectureTitle.current.value)
    console.log(lectureDesc.current.value);
    if (!lectureTitle.current.value || !lectureDesc.current.value) {
      alert("يرجى إدخال عنوان و وصف الحصة");
      return;
    }

    const allFiles = document.querySelectorAll('[data-file]');


    let newLecture = {
      classroomID: classroom.id,
      classroomName: classroom.name,
      classroomSectionNumber: classroom.sectionNumber,
      description: lectureDesc.current.value,
      link: "", //!empty until we check if youtube or file
      subjectID: subject.id,
      title: lectureTitle.current.value,
      createdAt: serverTimestamp(),
      teacherID: user.uid,
      teacherNameAr: user.firstNameAr + " " + user.lastNameAr,
      subjectName: subject.name,
      subjectNameAr: subject.nameAr,
      paperworkURL: "",
      contentTitle: contentTitle.current.value,
      contentURL: "",
      id: "",
    };
    console.log(lectureLink.current.value);
    console.log(allFiles[0].files.length);
   

    if (lectureLink.current.value != '' && !lectureLink.current.value.startsWith('https://www.youtube.com/watch?v=')) {
      alert("الرجاء إدخال رابط يوتوب صحيح");
      return;
    }

    if (allFiles[0].files.length != 0 || lectureLink.current.value != '') {
      
    
    
    setLoading(true);

    if (lectureLink.current.value != "") { //! if youtube link provided
      lectureLink.current.value = lectureLink.current.value.replace("watch?v=", "embed/");
    }
    newLecture.link = lectureLink.current.value;


    
    //* ADD TO FIRESTORE
    const docRef = await addDoc(collection(db, "lectures"), newLecture);
    console.log("Document written with ID: ", docRef.id);
    updateDoc(docRef, { id: docRef.id }, { merge: true });
     
    let numOfCompletedFiles = 0
    let numOfemptyFiles = 0;
    //* Create a root reference
    const storage = getStorage();
    for (let i = 0; i < allFiles.length; i++) {
      const file = allFiles[i].files[0];
      console.log(i);
      if (!file) { numOfemptyFiles++; continue;} //! IF NO FILE PROVIDED
      const storageRef = ref(storage, `files/${classroom.id}/${classroom.sectionNumber}/${subject.name}/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
        if (prog == 100) {
          numOfCompletedFiles++; //number of completed
        }
      },
        err => console.log(err),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(url);
          const flag = false;
          if (allFiles[i].id === "uploade-video" && document.getElementById("uploade-video").files.length != 0) {
            updateDoc(docRef, { link: url }, { merge: true });
            console.log("video url updated");
          }
          else if (allFiles[i].id === "uploade-paper1") {
            updateDoc(docRef, { paperworkURL: url }, { merge: true });
            console.log("paperwork url updated");
          }
          else if (allFiles[i].id === "uploade-paper2") {
            updateDoc(docRef, { contentURL: url }, { merge: true });
            console.log("contentURL url updated");
          }
          console.log(numOfCompletedFiles);
          if (numOfCompletedFiles == (allFiles.length - numOfemptyFiles)) {
            setDone(true);
            setLoading(false);
          }
          
        }
        );
      } //end of for loop

      if (numOfemptyFiles === 3) {
        setDone(true);
        setLoading(false);
        return;
      }
      

    } else {
      alert("الرجاء إدخال رابط الفيديو أو رفع  ملف الفيديو")
      return;
    }

  }


  const lectureTitle = useRef("");
  const lectureDesc = useRef("");
  const lectureLink = useRef("");
  const contentTitle = useRef("");

  const location = useLocation();
  const { classroom, user, subject } = location.state;



function clear(f) {
  if (f.target.getAttribute("data-bs-target") === "#collapseTwo") {
    lectureLink.current.value = "";
  } else {
    document.getElementById("uploade-video").value = '';
  }
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
          
            <div id='success' style={{ display: done ?  null :'none', textAlign: 'center', marginTop: '10px' }}> 
              <h3>تم إضافة الحصة بنجاح</h3>
              <button
                className="button"
                onClick={() => window.history.go(-1)}
              >
                العودة إلى الحصص
              </button>
            </div>
            <form id="regForm" onSubmit={submitForm} style={{ display: !done ?  null :'none'}}>
              <div className="">
                <p><input ref={lectureTitle} autoComplete='off' id="title" placeholder="العنوان ..." /></p>
                <p><input ref={lectureDesc} autoComplete='off' id="desc" placeholder="الوصف ..." /></p>
              </div>
              <br />
              <h3>محتويات الحصة</h3>
              <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button onClick={clear} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      رابط فيديو يوتوب
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <p>
                        <input ref={lectureLink} autoComplete='off' id="link" placeholder="https://www.youtube.com/watch?v" />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button onClick={clear} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      رفع فيديو من جهازك
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <input   id="uploade-video" type="file" accept="video/*" data-file="video" />
                      
                    </div>
                  </div>
                </div>

              </div>

              <div>
                <br />
                <h3>إضافة ورقة عمل</h3>
                <p>

                  <input  autoComplete='off' id="uploade-paper1" type="file"  data-file />
                  
                </p>
                <br />
                {/* //! */}
                <h3>إضافة ملفات أخرى </h3>
                <p>
                  <input ref={contentTitle} autoComplete='off' id="uploade-title2" type="text" placeholder="عنوان المحتوى ..." />
                  <br /> <br />
                  <input  autoComplete='off' id="uploade-paper2" type="file"  data-file />
                  
                </p>

              </div>
              <div style={{ overflow: 'auto' }}>
                <div style={{ float: 'right' }}>
                  <button disabled = {loading} className="button" type="submit" id="submit-btn" >
                  حفظ
                  <div style={{ display: loading ? null : "none", marginRight: "10px" }} className="spinner-border spinner-border-sm" role="status"></div>
                  </button>
                </div>
              </div>

            </form>


          </main>
        </div>
      </div>
    </div>
  )
}

export default AddMaterial
