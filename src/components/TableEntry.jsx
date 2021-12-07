import React from 'react'


function TableEntry(props) {



    const user = props.user;
    return (
        <tr>
            <th scope="row">{props.counter}</th>
            <td>{`${user.firstNameAr} ${user.midNameAr} ${user.lastNameAr}`}</td>
            <td>{user.type === "student" ? user.level :  user.subject}</td>
            <td>{user.email}</td>
            <td><i onClick={ user.type === "student" ? () => props.stdfun(user.uid) : () => props.teafun(user.uid)} className={props.icon}></i></td>
        </tr>
    )
}

export default TableEntry
