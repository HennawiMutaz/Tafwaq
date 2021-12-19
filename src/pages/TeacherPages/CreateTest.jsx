import React from 'react'
import Header from '../../components/Header'
import TeacherSidebar from '../../components/TeacherSidebar'
import $ from 'jquery'

function CreateTest() {

    // make test
    var fields_number = 1;
    $(document).ready(function () {
        var max_fields = 25;
        var wrapper = $(".container1");
        var add_button = $(".add_form_field");

        const add = document.querySelector(".add_form_field");
        add_button.unbind('click').click(function(e) {
            e.preventDefault();
            if (fields_number < max_fields) {
                
                fields_number++;
                $(wrapper).append(`<div class="mt-5"><h4 class="qnum"> السؤال ${fields_number} </h4><input class="QU form__field" type="text" name="mytext[]" placeholder="نص السؤال"/><button type="button" style="padding-top:22px;padding-bottom:22px " class="delete btn btn--primary btn--inside">حذف السؤال</button>` +
                    ' <div><input class="Ans correct" type="text" name="ans[]" placeholder="إجابة ١ (صحيحة)"/></div><div><input class="Ans wrong" type="text" placeholder="إجابة ٢" name="ans[]"/></div><div><input class="Ans wrong" placeholder="إجابة ٣" type="text" name="ans[]"/></div><div><input class="Ans wrong" type="text" name="ans[]" placeholder="إجابة ٤"/></div></div>'); //add input box

            } else {
                alert('You Reached the limit')
            }
           
        });

        $(wrapper).on("click", ".delete", function (e) {
            e.preventDefault();
            $(this).parent('div').remove();
            fields_number--;
            const list = $(".qnum");
            for (let i = 0; i < list.length; i++) {
                list[i].innerText = "السؤال " + (i+2);
                
            }
        })

    });

    var qu = [];
    var ans = [];
    function addQuiz() {
        for (let i = 0; i < fields_number; i++) {
            qu.push(document.querySelectorAll('.QU')[i].value);

        }
        for (let i = 0; i < fields_number * 4; i++) {
            ans.push(document.querySelectorAll('.Ans')[i].value);

        }
        console.log(qu);
        console.log(ans);
    }

    return (
        <div>
            <link rel="stylesheet" href="/styles/teacherpage.css" />
            <Header />
            <TeacherSidebar />
            <div className="container-fluid">
                <div className="row mt-3">
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom mt-sm-5">
                            <h1 className="h2">إضافة اختبار </h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                            <button className="addQuiz">حفظ الامتحان
                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-file-earmark-check-fill" viewBox="0 0 16 16">
                                        <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0zM9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1zm1.354 4.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                                    </svg></button>
                            </div>
                        </div>
                    </main>
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <main className="main">
                            <div className="justify-right d-flex flex-row">
                                <div className="container1">
                                    
                                    <h4> السؤال 1 </h4>
                                    <div><input className="QU form__field" type="text" name="mytext[]" placeholder="نص السؤال" />
                                        <div><input className="Ans correct" type="text" name="ans[]" placeholder="إجابة ١ (صحيحة)" /></div>
                                        <div><input className="Ans wrong" type="text" name="ans[]" placeholder="إجابة ٢" /></div>
                                        <div><input className="Ans wrong" type="text" name="ans[]" placeholder="إجابة ٣" /></div>
                                        <div><input className="Ans wrong" type="text" name="ans[]" placeholder="إجابة ٤" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="centered container">
                            <button className="add_form_field">
                                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>+ </span>
                                        &nbsp;
                                        إضافة سؤال جديد
                                    </button>
                            </div>
                        </main>


                    </main>
                </div>
            </div>
        </div>
    )
}

export default CreateTest
