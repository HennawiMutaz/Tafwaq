import React, {useEffect} from 'react'
import Header from '../../components/Header'
import StudentSidebar from '../../components/StudentSidebar'
import $ from "jquery";

function Paperwork() {
      
        useEffect(() => {
        
            $("form").on("change", ".file-upload-field", function(){ 
                $(this).parent(".file-upload-wrapper").attr("data-text", $(this).val().replace(/.*(\/|\\)/, '') );
              });
              
              var animateButton = function(e) {
              
                e.preventDefault();
                e.target.classList.remove('animate');
                
                e.target.classList.add('animate');
                
                e.target.classList.add('animate');
                setTimeout(function(){
                  e.target.classList.remove('animate')
                },6000)
              }
              
              var classname = document.getElementsByClassName("button");
              
              for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener('click', animateButton, false)
              }
            
        }, [])
        
    

    return (
        <div className="dashboard">
            <link rel="stylesheet" href="/styles/studentpage.css" />
            <Header />
            <StudentSidebar />
            <div className="container-fluid">
                <div className="row mt-5">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className=" container">
                            <section className="cards">
                                <article className="Sub-card">
                                    <div className="row">
                                        <div className="col-12 col-lg-12 col-md-12 col-sm-12 center">
                                            <h1> الممنوع من الصرف / ورقة عمل</h1>
                                            <h6>أ.إياد محمد</h6>
                                        </div>
                                    </div>
                                </article>
                            </section>
                        </div>
                        <div className="container">
                            <a href="" className="download-btn"><svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-earmark-arrow-down" viewBox="0 0 16 16">
                                <path d="M8.5 6.5a.5.5 0 0 0-1 0v3.793L6.354 9.146a.5.5 0 1 0-.708.708l2 2a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 10.293V6.5z" />
                                <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                            </svg> تحميل ورقة العمل
                            </a>
                        </div>
                        <div className="container">
                            <form className="form">
                                <div className="file-upload-wrapper" data-text="اختر ملف">
                                    <input id="uploade" name="file-upload-field" type="file" className="file-upload-field" />
                                </div>
                            </form>
                        </div>
                        <div className="wrapper container">
                            <div className="block"><button className="button success">حفظ التغيرات</button></div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Paperwork
