import React, { useRef, useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider, getAuth } from "firebase/auth";
import { db, useAuth } from '../fbConfig';
import StudentSidebar from '../components/StudentSidebar';
import Header from '../components/Header'
import SideBar from '../components/SideBar';
import TeacherSidebar from '../components/TeacherSidebar';



function ChangePasswordPage() {


  const [info, setInfo] = useState(null);
  const currentUser = useAuth();
  const [check, setCheck] = useState(false)

  

  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();
  const auth = getAuth();
  const user = auth.currentUser;
  const [isValid, setIsValid] = useState(false)
  const [msg, setMsg] = useState("كلمة السر القديمة خاطئة")

  async function changePassword(e) {
    e.preventDefault();


    const cred = EmailAuthProvider.credential(
      user?.email,
      oldPassword.current.value,
    );
    console.log(cred);

    reauthenticateWithCredential(user, cred).then(() => {
      // User re-authenticated.
      console.log("Re-authenticated");
      if (newPassword.current.value === confirmPassword.current.value) { //TODO: ADD IF NEWPASS AND OLDPASS ARE SAME => ERROR
        updatePassword(user, newPassword.current.value).then(() => {
          // Update successful.
          setMsg("تم تغيير كلمة السر بنجاح");
          document.getElementById("success-wrapper").className = "valid";
          document.getElementById("success-wrapper").style.display = "block";
          // restart values
          var msg = document.getElementById("confirm-msg");
          msg.textContent = "كلمة السر لا تتطابق";
          msg.classList.remove("valid");
          msg.classList.add("invalid");
          console.log("success");
        }).catch((error) => {
          // An error ocurred
          // ...
       
          console.log(error.code);
        });
      } else {
        console.log("passwords do not match");
      }
      document.getElementById("Reset").click();

    }).catch((error) => {
      //oldPassword is incorrect
      document.getElementById("success-wrapper").className = "invalid";
      document.getElementById("success-wrapper").style.display = "block";

      console.log(error);
    });
  }

  function validate(elem1, elem2, elem3, elem4) {

    if (elem1.classList.contains("valid") && elem2.classList.contains("valid") && elem3.classList.contains("valid") && elem4.classList.contains("valid") && (newPassword.current.value === confirmPassword.current.value) && oldPassword.current.value !== "") {
      setIsValid(true);
    }
    else {
      setIsValid(false);
    }

  }



  

  useEffect(() => {


    async function getUser() {
      try {
        const docRef = doc(db, "users", currentUser.uid);
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
  }, [currentUser])


  window.onload = () => {
    
    
    try {
      
      var myInput = document.getElementById("psw");
      var confirm = document.getElementById("confirm");
      var oldpsw = document.getElementById("oldpsw");
      var letter = document.getElementById("letter");
      var capital = document.getElementById("capital");
      var number = document.getElementById("number");
      var length = document.getElementById("length");
      
      // When the user clicks on the password field, show the message box
      myInput.onfocus = function () {
        document.getElementById("message").style.display = "block";
      }

      // When the user clicks outside of the password field, hide the message box
      myInput.onblur = function () {
        document.getElementById("message").style.display = "none";
      }

      // When the user clicks on the password field, show the message box
      confirm.onfocus = function () {
        document.getElementById("confirm-message").style.display = "block";
      }

      // When the user clicks outside of the password field, hide the confirm-message box
      confirm.onblur = function () {
        document.getElementById("confirm-message").style.display = "none";
      }

      // When the user starts to type something inside the password field
      myInput.onkeyup = function () {
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.value.match(lowerCaseLetters)) {
          letter.classList.remove("invalid");
          letter.classList.add("valid");
        } else {
          letter.classList.remove("valid");
          letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.value.match(upperCaseLetters)) {
          capital.classList.remove("invalid");
          capital.classList.add("valid");
        } else {
          capital.classList.remove("valid");
          capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
          number.classList.remove("invalid");
          number.classList.add("valid");
        } else {
          number.classList.remove("valid");
          number.classList.add("invalid");
        }

        // Validate length
        if (myInput.value.length >= 8) {
          length.classList.remove("invalid");
          length.classList.add("valid");
        } else {
          length.classList.remove("valid");
          length.classList.add("invalid");
        }

        validate(letter, capital, number, length);

      }


      //confirm input listener
      confirm.onkeyup = function () {
        validate(letter, capital, number, length);
        var msg = document.getElementById("confirm-msg");
        if (confirmPassword.current.value === newPassword.current.value) {
          msg.textContent = "كلمة السر  تتطابق";
          msg.classList.remove("invalid");
          msg.classList.add("valid");
        } else {
          msg.textContent = "كلمة السر لا تتطابق";
          msg.classList.remove("valid");
          msg.classList.add("invalid");
        }
      }

      oldpsw.onkeyup = function () {
        validate(letter, capital, number, length);
      }


    } catch (error) {
      console.log(error);
    }

  }
 





  return (
    <div>
      <link rel="stylesheet" href="/styles/studentpage.css" />
      <Header />
      {info?.type === "teacher" ? <TeacherSidebar /> : (info?.type === "student" ? <StudentSidebar /> : <SideBar />)}
      <div className="container-fluid no-print">
        <div className="row mt-5">
          {/* title header & add student btn */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 className="h2"> تغيير كلمة السر </h1>
              <div className="btn-toolbar mb-2 mb-md-0">
                <div className="alert d-flex justify-content-end" role="alert">
                  <button className="button" onClick={changePassword} disabled={!isValid} >
                    <span className="mx-1"> حفظ </span>
                  </button>
                </div>
              </div>
            </div>
          </main>
          {/* end of title header */}
          {/* form*/}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <section>
                <div className='change-password'>
                  <form>
                  <button id='Reset' type="reset" hidden></button>
                    <label >كلمة السر القديمة</label>
                    <input ref={oldPassword} type="password" id='oldpsw' required />

                    <label htmlFor="psw">كلمة السر الجديدة</label>
                    <input ref={newPassword} type="password" id="psw" name="psw" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{'}8,{'}'}" required />

                    <label htmlFor="psw2">تأكيد كلمة السر الجديدة</label>
                    <input ref={confirmPassword} type="password" id="confirm" name="psw2" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{'{'}8,{'}'}" required />


                  </form>
                  <div id="message">
                    <h3>الكلمة السرية الجديدة يجب ان تنطبق عليها الشروط التالية:</h3>
                    <p id="letter" className="invalid"> <b>تحتوي على احرف صغيرة (a-z)</b></p>
                    <p id="capital" className="invalid"> <b>تحتوي على احرف كبيرة (A-Z)</b></p>
                    <p id="number" className="invalid"> <b>تحتوي على ارقام (0-9)</b></p>
                    <p id="length" className="invalid"> <b>تتكون من 8 خانات على الأقل</b></p>
                  </div>
                  <div id="confirm-message">
                    <p id='confirm-msg' className="invalid"> <b>كلمة السر لا تتطابق</b></p>
                  </div>
                  <div style={{display:"none"}} id="success-wrapper">
                    <p id='success-msg' className=""> <b>{msg}</b></p>
                  </div>
                </div>

              </section>
            </div>
          </main>
          {/* end of form */}
        </div>
      </div >
    </div >
  )
}

export default ChangePasswordPage
