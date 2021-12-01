import React, { useEffect, useState } from 'react'
import { db, useAuth } from '../fbConfig'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { query, where, getDocs, collection } from 'firebase/firestore';
import TableEntry from '../components/TableEntry';

function TeacherList() {

    const user = useAuth();
    // const [isloading, setIsloading] = useState(true);
    const [list, setList] = useState([])
    let temp = [];
    let counter = 1;
    function createTable(elem) {
        let keyVal = Math.random();
        return (
            <TableEntry
             key={keyVal}
             user={elem} 
             icon="fas fa-edit"
             counter={counter++}    
             />
        );
    }

    useEffect(() => {
        async function getUser () {
          try {
            const q = query(collection(db, "users"), where("type", "==", "teacher"));

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
       return getUser();
       }, [])

    return (
        <div>       
        <Header />
        <SideBar /> 


        <div className="container-fluid">
            <div className="row mt-5">
                {/* title header & add teacher btn */}
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 class="h2">قائمة المعلمين</h1>
                        <div class="btn-toolbar mb-2 mb-md-0">
                            <div className="alert d-flex justify-content-end" role="alert">
                                <a className="btn btn-primary btn-lg" href="/account/addteacher">
                                    <span> إضافة معلم </span>
                                    <i className="fas fa-user-plus" />
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                {/* end of title header */}
                {/* table */}
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <div className="col-10 mx-auto mt-5">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم المعلم</th>
                            <th scope="col">التخصص</th>
                            <th scope="col">البريد الإلكتروني</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
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

export default TeacherList
