import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import Header from '../../components/Header';
import StudentSidebar from '../../components/StudentSidebar';
import $ from "jquery";
import { collection, addDoc, setDoc, doc, updateDoc, serverTimestamp, where, query, getDocs } from "firebase/firestore";
import { db } from '../../fbConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Paperwork() {


    const location = useLocation();
    const { lecture, user } = location.state;
    const [submission, setSubmission] = useState([]);
    let list = [];


    async function submitForm(e) {

        e.preventDefault();

       
        const submissionFile = document.getElementById("uploade");
        

        console.log(e.target);
        



        //* Create a root reference
        const storage = getStorage();


        const file = submissionFile.files[0];
        if (!file) {alert("الرجاء إضافة ملف"); return;} //! IF NO FILE PROVIDED
        e.target.classList.add('animate');

        const storageRef = ref(storage, `files/${lecture.classroomID}/${lecture.id}/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log(prog);
        },
            err => console.log(err),
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref);
                console.log(url);

                if (!submission.studentSubmission) {
                    const docRef = await addDoc(collection(db, "classrooms", lecture.classroomID, "submissions"), {

                        studentNameAr: user?.firstNameAr + " " + user?.midNameAr + " " + user?.lastNameAr,
                        studentID: user?.uid,
                        classroomID: lecture.classroomID,
                        lectureID: lecture.id,
                        lectureName: lecture.title,
                        studentSubmission: url,
                        teacherID: lecture.teacherID,
                        teacherName: lecture.teacherNameAr,
                        subjectID: lecture.subjectID,
                        subjectNameAr: lecture.subjectNameAr,
                        createdAt: serverTimestamp(),
                        fileName: file.name,
                        grade: "",
                    });
                    updateDoc(docRef, { id: docRef.id }, { merge: true });

                } else {
                    const subRef = doc(db, "classrooms", lecture.classroomID, "submissions", submission.id);
                    await updateDoc(subRef, { studentSubmission: url, updatedAt: serverTimestamp(), fileName: file.name }, {merge: true});
                    console.log("Updated");
                    console.log(submission.id);
                }

                document.location.reload(true);
            }
        );
        

    }


    useEffect(async () => {
        console.log(user);

        $("form").on("change", ".file-upload-field", function () {
            $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, ''));
        });

        try {

        const q = query(collection(db, "classrooms", lecture.classroomID, "submissions"), where("lectureID", "==", lecture.id), where("studentID", "==", user?.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            list.push(doc.data());
            setSubmission(list[0]);
        });
        console.log(list[0]);
        console.log(submission);
    } catch (err) {
        console.log(err);
    }



    }, [])



    return (
        <div className="dashboard">
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <StudentSidebar />
            <div className="container-fluid">
                <div className="row mt-5">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className=" container">
                            <section className="cards">
                                <article className="Sub-card">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-md-12 col-sm-12 center">
                                            <h1> {lecture.title} / ورقة عمل</h1>
                                            <h6>أ.{lecture.teacherNameAr}</h6>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                        <div className="container">
                            <a href={lecture.paperworkURL} className="download-btn"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg> تحميل ورقة العمل
                            </a>
                        </div>
                        <div className="container">
                            <form className="form">
                                <br />
                                <h1 style={{ textAlign: 'center' }}>تسليم ملف</h1>
                                <div className="file-upload-wrapper" data-text="اختر ملف">
                                    <input id="uploade" name="file-upload-field" type="file" className="file-upload-field" data-file />
                                </div>
                                <div className="wrapper container">
                                    <div id='load-btn' onClick={submitForm} className="block"><button className="button success">حفظ التغيرات</button></div>
                                </div>
                            </form>
                        </div>
                        <div style={{ textAlign: 'center', margin: '40px 0' }}>
                            <div className="submissionstatustable">
                                <h3>حالة التسليم</h3>
                                <div className="box py-3 boxaligncenter submissionsummarytable">
                                    <table className="generaltable">
                                        <tbody>
                                            <tr>
                                                <th style={{ padding: '10px' }} scope="row">حالة التسليم</th>
                                                <td style={{ padding: '0px 20px', backgroundColor: submission?.fileName ? '#1EAE98' : null, color: submission?.fileName ? '#FFF' : null }}>{submission?.fileName ? 'مسلمة للتقييم' : 'لا يوجد تسليم'}</td>
                                            </tr>
                                            <tr style={{display: submission?.fileName ? null : 'none'}}>
                                                <th style={{ padding: '10px' }} scope="row">آخر تعديل</th>
                                                <td>{submission?.updatedAt ? `${submission?.updatedAt?.toDate().toLocaleDateString('ar-EG') ?? ''} ` : `${submission?.createdAt?.toDate().toLocaleDateString('ar-EG') ?? ''}`}</td>
                                                <td style={{ paddingLeft: '70px' }}>{submission?.updatedAt ? ` ${submission?.updatedAt?.toDate().toLocaleTimeString('ar-EG') ?? ''}` : `${submission?.createdAt?.toDate().toLocaleTimeString('ar-EG') ?? ''}`}</td>
                                                <td><a style={{ color: 'green' }} href={submission?.studentSubmission}> {submission?.fileName} </a></td>
                                            </tr>
                                            <tr style={{display: submission?.grade ? null : 'none'}}>
                                                <th style={{ padding: '10px' }} scope="row">العلامة</th>
                                                <td style={{ padding: '0px 20px'}}>10 / {submission?.grade}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </div>

                    </main>
                </div>
            </div>
        </div>
    )
}

export default Paperwork
