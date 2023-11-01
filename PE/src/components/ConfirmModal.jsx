import React from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { RxUpdate } from 'react-icons/rx'

function ConfirmModal({ deleteData, confirmElementID, dataText, handleDeleteSession, handleUpdateSession, handleDeleteStudents }) {

    const handleClick = () => {
        if (dataText === "Are you sure, you want to delete this session?") {
            handleDeleteSession()
        }
        if (dataText === "Do you want to update instructions?") {
            handleUpdateSession()
        }
        if (dataText === "Are you sure, you want to delete this student?") {
            handleDeleteStudents(deleteData)
        }
    }

    return (
        <div ref={confirmElementID} className="modal fade" tabIndex="-1" aria-labelledby="confirmLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body d-flex flex-column align-items-center">
                        {dataText === "Are you sure, you want to delete this session?" || "Are you sure, you want to delete this student?" ? <FaTrashAlt color='gray' size={120} /> : <RxUpdate color='dodgerblue' size={130} />}
                        <h4 className='mt-3'>{dataText}</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" onClick={handleClick} className="btn btn-danger" data-bs-dismiss="modal">Yes</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal