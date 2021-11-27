import React from 'react'
let counter = 1;

function TableEntry(props) {
    const user = props.user;
    return (
        <tr>
            <th scope="row">{counter++}</th>
            <td>{`${user.firstNameAr} ${user.midNameAr} ${user.lastNameAr}`}</td>
            <td>{user.type === "student" ? user.level : user.subject}</td>
            <td>{user.email}</td>
            <td> <i className="fas fa-edit"></i> </td>
        </tr>
    )
}

export default TableEntry
