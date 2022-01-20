import React, { useRef, useState, useEffect } from 'react'
import { login } from '../fbConfig'
import Preloader from '../components/Preloader';

function LoginPage() {

  const [incorrect, setIncorrect] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isloading, setIsloading] = useState(true);
  const [msg, setmsg] = useState("")

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const b = await login(emailRef.current.value.trim(), passwordRef.current.value); 
      // console.log(b.uid); undefined
      
      // window.location.replace('/account');
    } catch (error) {
      setIncorrect(true);
      console.log(error.code);
      if (error.code === "auth/wrong-password") {
        setmsg("عنوان البريد الإلكتروني أو كلمة المرور خاطئين");
      }
      else if (error.code === "auth/too-many-requests") {
        setmsg();
        setmsg("حاول التسجيل لاحقاً");
      } else {
        setmsg("عنوان البريد الإلكتروني أو كلمة المرور خاطئين");
      }
    } 
  }


  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);
    return;
  }, [])


//  if (isloading)
//     return (
//       <Preloader hide={!isloading ? { opacity: 0, zIndex: -1 } : null} />
//     );



    return (

      <div id="login-page" className="bg-light">
          <Preloader hide={!isloading ? {opacity:0, zIndex:-1} : null} />
          <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div id="login_image" className="col-lg-7 col-12 mt-sm-5">
                  <img src="/images/study.svg" alt="#" className="img-fluid" id="login-img" />
                </div>
                <div className="col-lg-5 col-12 bg-white rounded-3 shadow-lg">
                <section className="form-signin" dir="ltr">
                  <h1 className="h3 mb-3 fw-normal text-center mb-4">تسجيل الدخول</h1>
                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <input required ref={emailRef} type="email" className="form-control" placeholder="البريد الإلكتروني" />
                    </div>
                    
                    <div className="input-group">
                      <input required ref={passwordRef} type="password" className="form-control" placeholder="كلمة السر" />
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">الدخول</button>
                  </form>
                </section>
              </div>
            
          </div>
          <div style={incorrect ? { opacity:1, } : {opacity:0}} className="row align-items-center mt-4">
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          </div>
        </div>
      </div>
      <div>
      <a href="/" id="fab">
        <i className="fa fa-home my-float" />
      </a>
      </div>
      
    </div>
    
    

        
    )
}

export default LoginPage
