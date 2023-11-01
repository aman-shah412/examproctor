import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'

function ErrorModal({ errorElementID, dataText }) {
    
    return (
        <div ref={errorElementID} id='errorModal' className="modal fade" tabIndex="-1" aria-labelledby="errorLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center">
                        <FaRegTimesCircle color='red' size={150} />
                        <h4 className='mt-3'>{dataText}</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorModal