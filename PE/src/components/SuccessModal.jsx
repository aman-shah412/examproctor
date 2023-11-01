import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiCheckCircle } from 'react-icons/bi'

function Modal({ successElementID, dataText, id }) {
    const navigate = useNavigate()

    const handleClick = () => {
        
        if (dataText === "Email sent successfully") {
            navigate(`/Admin/exams/${id}/manage_exam`)
            window.location.reload()
        }

        if (dataText === "Session deleted successfully") {
            navigate(`/Admin`)
        }
    }

    return (
        <div ref={successElementID} id='successModal' className="modal fade" tabIndex="-1" aria-labelledby="successLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center">
                        <BiCheckCircle color='Green' size={150} />
                        <h4 className='mt-3'>{dataText}</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={handleClick} className="btn btn-primary" data-bs-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal