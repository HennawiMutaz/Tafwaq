import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Account from '../pages/AdminPage'
import { logout, useAuth } from '../fbConfig'
import { db } from '../fbConfig'
import { getDoc, doc } from 'firebase/firestore'
import StudentList from '../pages/StudentList'
import NotFoundPage from '../pages/NotFoundPage'
import AddStudent from '../pages/AddStudent'
import TeacherList from '../pages/TeacherList'
import AddTeacher from '../pages/AddTeacher'
import ClassroomList from '../pages/ClassroomList'
import AddClassroom from '../pages/AddClassroom'
import StudentDashboard from '../pages/StudentPages/StudentDashboard'
import StudentActivity from '../pages/StudentPages/StudentActivity'
import AllClasses from '../pages//StudentPages/AllClasses'
import Paperwork from '../pages/StudentPages/Paperwork'
import StudentQuiz from '../pages/StudentPages/StudentQuiz'
import ChangePasswordPage from '../pages/ChangePasswordPage'
import CreateTest from '../pages/TeacherPages/CreateTest'
import AddMaterial from '../pages/TeacherPages/AddMaterial'
import TeacherDashboard from '../pages/TeacherPages/TeacherDashboard'
import TeacherAllClasses from '../pages/TeacherPages/TeacherAllClasses'
import ProfilePage from '../pages/ProfilePage'
import ListOfStudents from '../pages/TeacherPages/ListOfStudents'
import ListOfStudentGrades from '../pages/TeacherPages/ListOfStudentGrades'
import EditPage from '../pages/EditPage'
import EditClassroom from '../pages/EditClassroom'
import LecturePage from '../pages/TeacherPages/LecturePage'
import TeacherPaperwork from '../pages/TeacherPages/TeacherPaperwork'
import UpdateLecture from '../pages/TeacherPages/UpdateLecture'
import SubjectsPage from '../pages/StudentPages/SubjectsPage'
import SubjectLectures from '../pages/StudentPages/SubjectLectures'
import { getRedirectResult } from 'firebase/auth'
import ContactSchoolPage from '../pages/ContactSchoolPage'




function AppRouter() {

    //current user
    const auth = useAuth();
    const [allow, setAllow] = useState(true)



    // useEffect(async () => {
        
    //     console.log(auth?.uid)
    //     if (!auth) return;
    //     const docRef = doc(db, 'users', auth?.uid);
    //     const docSnap = await getDoc(docRef);
        
    //     if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //         console.log(docSnap.data().classroomsIDs);
    //         console.log(docSnap.data().classroomID);
    //         if ((!docSnap.data().classroomID && docSnap.data().type==="student") || (docSnap.data().classroomsIDs?.length === 0 && docSnap.data().type==="teacher")) {
    //             console.log(1);
    //             setAllow(false);
    //             // window.location.replace('/contact-page');
    //             // return;
    //         } else {
    //             console.log(2);
    //             setAllow(true);
    //         }
    //       } else {
    //         // doc.data() will be undefined in this case
    //         console.log(3);
    //         console.log("No such document!");
    //         setAllow(false);
    //         // window.location.replace('/contact-page');
    //       }
        
        


    //     return () => {
            
    //     }
    // }, [auth, allow])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/contact-page' element={<ContactSchoolPage />} />
                    
                    <Route exact path='/login' element={ auth ? <Navigate to="/account" replace={true} /> : <LoginPage />  } />
                    <Route exact path='/account' element={ !auth ? <Navigate to="/login" replace={true} /> : <Account /> } />
                    <Route exact path='/account/studentlist' element={ <StudentList /> } />
                    <Route exact path='/account/addstudent' element={ <AddStudent /> } />
                    <Route exact path='/account/teacherlist' element={ <TeacherList /> } />
                    <Route exact path='/account/addteacher' element={ <AddTeacher /> } />
                    <Route exact path='/account/classroomlist' element={ <ClassroomList /> } />
                    <Route exact path='/account/addclassroom' element={ <AddClassroom /> } />
                    <Route exact path='/account/edit-user' element={ <EditPage /> } />
                    <Route exact path='/account/edit-classroom' element={ <EditClassroom /> } />

                    <Route exact path='/student' element={ <StudentDashboard /> } />
                    <Route exact path='/account/class' element={ <StudentActivity /> } />
                    <Route exact path='/account/all-classes' element={ <AllClasses /> } />
                    <Route exact path='/student/paperwork' element={ <Paperwork /> } />
                    <Route exact path='/student/subjects' element={ <SubjectsPage /> } />
                    <Route exact path='/student/subject/lectures' element={ <SubjectLectures /> } />
                    <Route exact path='/student/quiz' element={ <StudentQuiz /> } />

                    <Route exact path='/teacher' element={ <TeacherDashboard /> } /> {/* صفوف */}
                    <Route exact path='/teacher/add-material' element={ <AddMaterial /> } />
                    <Route exact path='/teacher/paperwork' element={ <TeacherPaperwork /> } />
                    <Route exact path='/teacher/create-test' element={ <CreateTest /> } />
                    <Route exact path='/teacher/student-list' element={ <ListOfStudents /> } />
                    <Route exact path='/teacher/update-lecture' element={ <UpdateLecture /> } />
                    <Route exact path='/teacher/student-gradelist' element={ <ListOfStudentGrades /> } />
                    <Route exact path='/teacher/all-classes' element={ <TeacherAllClasses /> } /> {/* الحصص */}
                    <Route exact path='/teacher/all-classes/class' element={ <LecturePage /> } /> {/* حصة وحدة */}
                    



                    <Route exact path='/account/user-info' element={ <ProfilePage /> } />
                    <Route exact path='/change-password' element={ <ChangePasswordPage /> } />
                    
                    <Route  path="*" element={ <NotFoundPage/> } />
                </Routes>
            </BrowserRouter> 
        </>
    )
}

export default AppRouter
