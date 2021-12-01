import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../fbConfig'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { query, where, getDocs, collection } from 'firebase/firestore';
import TableEntry from '../components/TableEntry';

function ClassroomList() {
    const user = useAuth();
    // const [isloading, setIsloading] = useState(true);
    const [list, setList] = useState([])
    let temp = [];
    let counter = 1;
    function createTable(elem) {
        return (
             <tr>
                <th scope="row">{counter++}</th>
                <td>{elem.name}</td>
                <td> <i className="fas fa-edit"></i> </td>
            </tr>
        );
    }

    useEffect(() => {
        async function getClassrooms () {
          try {
            const q = query(collection(db, "classrooms"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                temp.push(doc.data());
            });            
           } catch (error) {
               console.log(error);
           } finally {
               setList(temp);
           }
           
       }    
       return getClassrooms();
       }, [])


    return (
        <div>       
        <Header />
        <SideBar /> 


        <div className="container-fluid">
            <div className="row mt-5">
                {/* title header & add student btn */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">قائمة الصفوف</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="alert d-flex justify-content-end" role="alert">
                                <a className="btn btn-primary btn-lg" href="/account/addclassroom">
                                    <span> إضافة صف </span>
                                    <i className="fas fa-user-plus" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                {/* end of title header */}
                {/* table */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col-10 mx-auto mt-5">
                    <table className="table table-striped table-hover table-bordered">
                        <thead style={{display: list.length ? null : "none" }}>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم الصف</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <h1 style={{display: !list.length ? null : "none"}} className="text-center">لا توجد بيانات</h1>
                        <tbody>
                            {list.map(createTable)}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </main>
                {/* end of table */}
                
                
                </div>
            </div>
        </div>
    )
}

export default ClassroomList
