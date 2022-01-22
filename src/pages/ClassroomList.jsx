import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../fbConfig'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { query, where, getDocs, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';

//!MEMBERS OF CLASSROOMS NOT SHOWING
function ClassroomList() {
    const user = useAuth();
    // const [isloading, setIsloading] = useState(true);
    const [list, setList] = useState([])
    const [mem, setMem] = useState([])
    let temp = [];
    let counter = 1;
    let members = [];
    

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
                
                for (let index = 0; index < temp.length; index++) {
                        const q = query(collection(db, "users"), where("classroomID", "==", temp[index]?.id));
                        const querySnapshot = await getDocs(q);            
                        members.push(querySnapshot.docs.length);
                }
                setMem(members);
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
                                    <thead>
                                        <tr>
                                            <th style={{ width: "50px" }} scope="col">#</th>
                                            <th style={{ width: "400px" }} scope="col">اسم الصف</th>
                                            <th style={{ width: "200px" }} className='text-center' scope="col">عدد الطلاب</th>
                                            <th style={{ width: "50px" }} scope="col"></th>
                                        </tr>
                                    </thead>
                                    {/* <div style={{ display: !list.length ? null : "none" }} className="p-5 spinner-border spinner-border-lg" role="status"></div> */}

                                    <tbody>
                                        {list.map((elem, index) => {
                                            return (
                                                <tr key={elem + Math.random()}>
                                                    <th scope="row">{counter++}</th>
                                                    <td>{elem.name}</td>
                                                    <td className='text-center'>{mem[index]}</td>
                                                    <td>
                                                        <Link
                                                            to="/account/edit-classroom"
                                                            state={{ classroom: elem }}
                                                            style={{ color: "#000" }}
                                                        >
                                                            <i className="fas fa-edit icon-hover"></i>
                                                        </Link>
                                                    </td>

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
    )
}

export default ClassroomList
