import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Account from '../pages/AdminPage'
import { GetUser, useAuth } from '../fbConfig'
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




function AppRouter() {

    //current user
    const auth = useAuth();
    
    const user = GetUser(auth);
        
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact path='/' element={<HomePage />} />
                    <Route exact path='/login' element={ auth ? <Navigate to="/account" replace={true} /> : <LoginPage />  } />
                    <Route exact path='/account' element={ !auth ? <Navigate to="/login" replace={true} /> : <Account /> } />
                    <Route exact path='/account/studentlist' element={ <StudentList /> } />
                    <Route exact path='/account/addstudent' element={ <AddStudent /> } />
                    <Route exact path='/account/teacherlist' element={ <TeacherList /> } />
                    <Route exact path='/account/addteacher' element={ <AddTeacher /> } />
                    <Route exact path='/account/classroomlist' element={ <ClassroomList /> } />
                    <Route exact path='/account/addclassroom' element={ <AddClassroom /> } />

                    <Route exact path='/student' element={ <StudentDashboard /> } />
                    <Route exact path='/student/class' element={ <StudentActivity /> } />
                    <Route exact path='/student/all-classes' element={ <AllClasses /> } />
                    <Route exact path='/student/paperwork' element={ <Paperwork /> } />
                    <Route exact path='/student/quiz' element={ <StudentQuiz /> } />

                    <Route  path="*" element={ <NotFoundPage/> } />
                </Routes>
            </BrowserRouter> 
        </>
    )
}

export default AppRouter
