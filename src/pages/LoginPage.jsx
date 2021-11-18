import React, { useRef, useState, useEffect } from 'react'
import { login } from '../fbConfig'
import Preloader from '../components/Preloader';
import { useNavigate } from 'react-router';

function LoginPage() {

  const [incorrect, setIncorrect] = useState(false)
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isloading, setIsloading] = useState(true);
  const navigate = useNavigate();


  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(emailRef.current.value.trim(), passwordRef.current.value); 
      // navigate('/account', { replace: true })
      window.location.replace('/account');
    } catch (error) {
      console.log(error);
      setIncorrect(true);
    } 
  }


  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 1000);
    return;
  }, [])







    return (

      <div id="login-page" className="bg-light">
          <Preloader hide={!isloading ? {opacity:0, zIndex:-1} : null} />
          <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div id="login_image" className="col-lg-7 col-12 mt-sm-5">
                  <img src="./img/study.svg" alt="#" className="img-fluid" id="login-img" />
                </div>
                <div className="col-lg-5 col-12 bg-white rounded-3 shadow-lg">
                <section className="form-signin" dir="ltr">
                  <h1 className="h3 mb-3 fw-normal text-center mb-4">تسجيل الدخول</h1>
                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <input ref={emailRef} type="email" className="form-control" placeholder="البريد الإلكتروني" />
                    </div>
                    
                    <div className="input-group">
                      <input ref={passwordRef} type="password" className="form-control" placeholder="كلمة السر" />
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">الدخول</button>
                  </form>
                </section>
              </div>
            
          </div>
          <div style={incorrect ? { opacity:1, } : {opacity:0}} className="row align-items-center mt-4">
            <div className="alert alert-danger" role="alert">
            معلومات غير صحيحة
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
