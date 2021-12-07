import React from 'react'

function ModalInfo(props) {

    return (
        <div className="modal fade" id="ModalInfo" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel2"> تنوبه </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                    {props.msg}  
                    
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default ModalInfo;
