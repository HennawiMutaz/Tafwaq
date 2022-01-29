import React, { useEffect, useRef, useState } from 'react'
import Header from '../../components/Header';
import TeacherSidebar from '../../components/TeacherSidebar';
import { useLocation } from 'react-router';
import { query, where, getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../fbConfig';





function TeacherPaperwork() {


    const location = useLocation()
    const { classroom, lecture } = location.state
    const [list, setList] = useState([])
    const [list2, setList2] = useState([])
    const [noSubmissionList, setNoSubmissionList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [hover, setHover] = useState({backgroundColor: '#FFF', color: '#1a9986', borderColor: '#1a9986'});
    const [done, setDone] = useState(false);
    let temp = [];
    let temp2 = [];
    let counter = 1;
    const gradeValue = useRef();
    

    async function handleGrade(elem) {
        if (!gradeValue.current.value) { 
            alert ("يرجى إدخال العلامة")
            return;
        } else if (isNaN(gradeValue.current.value)) {
            alert ("يرجى إدخال أرقام فقط")
            return;
        } else if (gradeValue.current.value > 10 || gradeValue.current.value < 0 ) { //* Range of grade is from 0 to 10
            alert ("يرجى إدخال علامة بين الصفر و العشرة")
            return;
        }
        const Ref = doc(db, "classrooms", classroom.id, 'submissions', elem.id);

        await updateDoc(Ref, {
            grade: gradeValue.current.value
        }
        ,{merge: true});
        document.getElementsByTagName('input')[1].value = '';
        setEdit(false);
        setDone(Math.random());
    }

    useEffect(() => {
        async function getStudents() {
            try {
                const q = query(collection(db, "users"), where("classroomID", "==", classroom?.id));
                const subsQuery = query(collection(db, 'classrooms', classroom.id, 'submissions'), where("classroomID", "==", classroom.id), where("lectureID", "==", lecture.id));


                const querySnapshot = await getDocs(q);
                const subsQuerySnapshot = await getDocs(subsQuery);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
                subsQuerySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    temp2.push(doc.data());
                });
            } catch (error) {
                console.log(error);
            } finally {
                setList(temp);
                setList2(temp2);
                setNoSubmissionList(temp.filter(({ uid: id1 }) => !temp2.some(({ studentID: id2 }) => id2 === id1)));
                // console.log(temp.filter(({ uid: id1 }) => !temp2.some(({ studentID: id2 }) => id2 === id1)));
                console.log(noSubmissionList);
            }

        }
        return getStudents();
    }, [done])



    return (
        <div>
            <div>
                <Header />
                <TeacherSidebar />

                <div className="container-fluid">
                    <div className="row mt-5">
                        {/* title header & add student btn */}
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <h1 className="h2">تسليم الطلاب </h1>

                            </div>
                        </main>
                        {/* end of title header */}
                        {/* table */}
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                                <div className="col-10 mx-auto mt-5">
                                    <table className="table table-striped table-hover table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">اسم الطالب</th>
                                                <th scope="col">الدرس</th>
                                                <th scope="col">تسليم الطالب</th>
                                                <th scope="col">العلامة</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list2.map((elem, index) => {
                                                return (
                                                    <tr key={elem + index}>
                                                        <td>{counter++}</td>
                                                        <td>{elem.studentNameAr}</td>
                                                        <td>{elem.lectureName}</td>
                                                        <td>{elem.studentSubmission.length !== 0 ? <a href={elem.studentSubmission}>{elem.fileName}</a> : '-'}</td>
                                                        <td>
                                                            <div className='row' style={{display: edit ? null : 'none'}}>
                                                                <input dir='ltr' ref={gradeValue} type="text" className="form-control mx-3 col text-center" placeholder="أضف علامة" />
                                                                <button onClick={() => handleGrade(elem)} onMouseOver={() => setHover({backgroundColor: "#1a9986", color: '#FFF'})} onMouseOut={() => setHover({backgroundColor: '#FFF', color: '#1a9986', borderColor: '#1a9986'})} style={hover} className='col mx-3 btn'>حفط</button>
                                                                <button onClick={() => setEdit(false)} className='col mx-3 btn btn-outline-danger'>إلغاء</button>
                                                            </div>
                                                            <div style={{display: !edit ? null : 'none'}}>
                                                                 <p style={{display: 'inline-block'}}> 10 / {!elem.grade ? 'لم يتم التقييم' : elem.grade } </p> 
                                                                <i onClick={() => setEdit(!edit)}  className="fas fa-edit icon-hover ms-3"></i>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                            {noSubmissionList.map((elem, index) => {
                                                return (
                                                    <tr key={elem + index}>
                                                        <td>{counter++}</td>
                                                        <td>{elem.firstNameAr} {elem.midNameAr} {elem.lastNameAr}</td>
                                                        <td>{lecture.title}</td>
                                                        <td>لا يوجد تسليم</td>
                                                        <td></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main>
                        {/* end of table */}


                    </div>
                </div>
            </div>

        </div>
    )
}

export default TeacherPaperwork
