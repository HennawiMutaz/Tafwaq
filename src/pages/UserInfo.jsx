import React, {useState, useEffect} from 'react'
import { db, useAuth } from '../fbConfig'
import { doc, getDoc } from 'firebase/firestore';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import StudentSidebar from '../components/StudentSidebar';
import TeacherSidebar from '../components/TeacherSidebar';

function UserInfo() {

    const [info, setInfo] = useState(null);
    const user = useAuth();

    // Triggers at load
  useEffect(() => {
    async function getUser() {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          setInfo(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (error) {
        console.log(error);
      }
    }
    return getUser();
  }, [user])




    //Render
    if(!info) {
            return (
                <div>
                    
                </div>
            )
        
    }

    return (
        <div>
            <Header />
            

            {info?.type === "teacher" ? <TeacherSidebar /> : (info?.type === "student" ? <StudentSidebar /> :<SideBar />  )}
        </div>
    )
}

export default UserInfo
