import React from 'react'

function LoginPage() {
    return (
        
<div className="login-page">

<link rel="stylesheet" type="text/css" href="vendors/styles/core.css"></link>
      <link rel="stylesheet" type="text/css" href="vendors/styles/icon-font.min.css"></link>
      <link rel="stylesheet" type="text/css" href="vendors/styles/style.css"></link>
  <div className="login-wrap d-flex align-items-center flex-wrap justify-content-center">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-md-6 col-lg-5">
          <div className="login-box bg-white box-shadow border-radius-10">
            <div className="login-title">
              <h2 className="text-center text-primary">تسجيل الدخول</h2>
            </div>
            <form>
              <div className="input-group custom">
                <input type="text" className="form-control form-control-lg" placeholder="البريد الإلكتروني" />
                <div className="input-group-append custom">
                  <span className="input-group-text"><i className="fas fa-user" /></span>
                </div>
              </div>
              <div className="input-group custom">
                <input type="password" className="form-control form-control-lg" placeholder="**********" />
                <div className="input-group-append custom">
                  <span className="input-group-text"><i className="fas fa-key" /></span>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="input-group mb-0">
                    <a className="btn btn-primary btn-lg btn-block" href="index.html">تسجيل الدخول</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-6 col-lg-7">
          <img src="./img/study.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
  <a href="/" className="float">
    <i className="fa fa-home my-float" />
  </a>
</div>

        
    )
}

export default LoginPage
