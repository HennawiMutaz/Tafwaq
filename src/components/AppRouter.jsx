import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import Account from '../pages/AdminPage'
import { useAuth } from '../fbConfig'
import StudentList from '../pages/StudentList'
import NotFoundPage from '../pages/NotFoundPage'
import AddStudent from '../pages/AddStudent'
import TeacherList from '../pages/TeacherList'
import AddTeacher from '../pages/AddTeacher'




function AppRouter() {

    const auth = useAuth();
    
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
                    <Route  path="*" element={ <NotFoundPage/> } />
                </Routes>
            </BrowserRouter> 
        </>
    )
}

export default AppRouter
