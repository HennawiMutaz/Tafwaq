import React from 'react'

function Modal(props) {
    const userInfo = props.msg;

    const genderMap = {
        male: "ذكر",
        female: "أنثى"
    };

    const levelMap = {
        1: "الأول",
        2: "الثاني",
        3: "الثالث",
        4: "الرابع",
        5: "الخامس",
        6: "السادس",
        7: "السابع",
        8: "الثامن",
        9: "التاسع",
        10: "العاشر",
        11: "الحادي عشر",
        12: "الثاني عشر",
    }



    return (
        <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">معلومات المستخدم</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                       الرقم الوطني: {`${userInfo.nationalNumber}`} <br />
                        الإسم بالعربي: {`${userInfo.firstNameAr}  ${userInfo.midNameAr}  ${userInfo.lastNameAr}`} <br />
                        الإسم بالإنجليزي: {`${userInfo.firstNameEn}  ${userInfo.midNameEn}  ${userInfo.lastNameEn}`} <br />
                        البريد الإلكتروني: {userInfo.email} <br />
                        كلمة المرور: {userInfo.password} <br />
                        تاريخ الميلاد : {userInfo.birthdate} <br />
                        {userInfo.type === "student" ? `الصف : ${levelMap[userInfo.level]}` : `التخصص : ${userInfo.subjectAr}`}   <br />
                        الجنس : {genderMap[userInfo.gender]} <br />

                    </div>
                    <div className="modal-footer no-print">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
                        <button style={{backgroundColor: "#1a9986", color: "#FFF"}} type="button" className="btn" onClick={window.print}>طباعة</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
