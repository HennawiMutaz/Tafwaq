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
    let members = 0;
    function createTable(elem) {
        return (
            <tr>
                <th scope="row">{counter++}</th>
                <td>{elem.name}</td>
                <td className='text-center'>{elem.members}</td>
                <td> <i className="fas fa-edit icon-hover"></i> </td>
            </tr>
        );
    }

    async function countMembers(elem) {
        try {
            const q = query(collection(db, "users"), where("classroomID", "==", elem?.id));
            
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                console.log(elem.name,elem.id,"___",doc.data().classroomID);
                members++;
            }); 
        } catch (error) {
            console.log(error);
        } finally {
            elem.members = members;
            console.log("members=",members);
            members = 0;
        }   
    }

    useEffect(() => {
        async function getClassrooms() {
            try {
                const q = query(collection(db, "classrooms"));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    temp.push(doc.data());
                });
            } catch (error) {
                console.log(error);
            } finally {
                setList(temp);
                temp.map(elem => countMembers(elem));
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
                                    <a className="button" href="/account/addclassroom">
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
                                    <thead style={{ display: list.length ? null : "none" }}>
                                        <tr>
                                            <th style={{width:"50px"}} scope="col">#</th>
                                            <th style={{width:"400px"}} scope="col">اسم الصف</th>
                                            <th style={{width:"200px"}} className='text-center' scope="col">عدد الطلاب</th>
                                            <th style={{width:"50px"}} scope="col"></th>
                                        </tr>
                                    </thead>
                                    <div style={{ display: !list.length ? null : "none" }} className="p-5 spinner-border spinner-border-lg" role="status"></div>

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
