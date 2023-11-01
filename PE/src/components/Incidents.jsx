import React from 'react'

function Incidents({ Incis, index, handleDelInci }) {

    return (
        <div key={index} className="incident d-flex justify-content-between">
            <div className="incident-text">
                <h2>{Incis.time2}-{Incis.time}</h2>
                <p>{Incis.name}</p>
            </div>
            <div className="add-del">
                <button className="add-del-btn blue">
                    <img src="https://demo.proctorexam.com/img/edit.svg" alt="" />
                </button>
                <button onClick={() => { handleDelInci(Incis) }} className="add-del-btn red">
                    <img src="https://demo.proctorexam.com/img/garbage.svg" alt="" />
                </button>
            </div>
        </div>
    )
}

export default Incidents