import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import {
    updateDoc,
    doc,
    arrayRemove,
    arrayUnion
} from 'firebase/firestore';
import { db } from '../fbConfig';

function TableEntry(props) {
    
    const pathName = window.location.pathname;
    const user = props.user;
    let iconClass = props.iconClass,inclass;

    function temp() {
    console.log(user);
    let ret;
    if (user.type === "teacher") {
        iconClass = user.classroomsIDs.includes(props.classroomID) ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover";
        inclass=user.classroomsIDs.includes(props.classroomID) ? true : false;
        console.log(inclass);
        ret = (inclass ?  () => props.removeFun(user.uid) :  () => props.teafun(user.uid))
    }
    else if (user.type === "student") {
        iconClass= user.classroomID == props.classroomID ? "fas fa-user-minus icon-hover" : "fas fa-user-plus icon-hover";
        inclass= user.classroomID == props.classroomID ? true : false;
        console.log(inclass);
        ret = (inclass ? () => props.removeFun(user.uid) :  () => props.stdfun(user.uid) )
    }
    console.log(ret);

    return ret(user.uid);
    }

    useEffect(() => {

        

        function fun() {
            const icons = document.querySelectorAll(".icon-hover");
            for (let i = 0; i < icons.length; i++) {
                const el = icons[i];
                el.addEventListener('click', function() {
                   if (el.classList.contains("fa-user-plus")) {
                      el.classList.replace("fa-user-plus","fa-user-minus");
                      
                   } else {
                       el.classList.replace("fa-user-minus","fa-user-plus");
                   }
                   console.log("switched");
    
                })
            }
            
        }
        return fun();
    }, [])
    

    
  
    return (
        <tr>
            <th scope="row">{props.counter}</th>
            <td>{`${user.firstNameAr} ${user.midNameAr} ${user.lastNameAr}`}</td>
            <td>{user.type === "student" ? user.level : user.subjectAr}</td>
            <td>{user.email}</td>
            <td style={{ display: (pathName === "/account/studentlist" || pathName === "/account/teacherlist") ? null : "none" }}>
                <Link
                    to="/account/edit-user"
                    state={{ user: user }}
                    style={{ color: "#000" }}
                >
                    <i className={props.icon}></i>
                </Link>
            </td>
            <td  style={{ display: pathName === "/account/edit-classroom" || pathName === "/account/addclassroom" ? null : "none" }}>
            <i onClick={() => temp()} className={props.iconClass}></i>
            </td>
            
        

            
        </tr>
    )
}

export default TableEntry
