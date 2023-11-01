import React, { useState, useEffect, useContext } from 'react'
import { FaRegQuestionCircle, FaCogs } from 'react-icons/fa'
import Step3 from './Step3';
import Context from "../Context/Context"

function Step2({ streams, setStreams, title, hideMobileCam, setNewExam }) {

    const { step2, setStep2 } = useContext(Context)

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [step2Details, setStep2Details] = useState({
        streams: streams,
        title: title.name,
        examName: "",
        firstStartTime: "",
        lastStartTime: "",
        duration: "",
        creationDate: new Date().getDate() + " " + monthNames[new Date().getMonth()] + " " + new Date().getFullYear(),
        adminSessionId: ""
    })

    const [step2CheckboxDetails, setStep2CheckboxDetails] = useState({
        durationCheckbox: "No",
        mobileCheckbox: "No",
        uploadCheckbox: "No",
        globalCheckbox: "No"
    })

    function createRandomID(previousIDs) {
        let createID;
        do {
            createID = Math.floor(Math.random() * 10 * 40 * 40);
        } while (previousIDs.includes(createID));

        return createID;
    }

    useEffect(() => {
        if (step2CheckboxDetails.mobileCheckbox === "Yes") {
            setStreams({
                webcam: "true",
                screenshare: "true",
                mobilecam: "true"
            })
            setStep2Details({
                ...step2Details, streams: {
                    webcam: "true",
                    screenshare: "true",
                    mobilecam: "true"
                }
            })
        } else {
            setStep2Details({
                ...step2Details, streams: {
                    webcam: "true",
                    screenshare: "true",
                    mobilecam: "false"
                }
            })
        }
    }, [step2CheckboxDetails.mobileCheckbox])


    useEffect(() => {
        fetch("http://localhost:8004/fetchdata")
            .then((res) => res.json())
            .then((data) => {
                let datasss = data.data.map((e) => {
                    return e.AdminSessionId
                })
                let adminSessionId = createRandomID(datasss)
                setStep2Details({ ...step2Details, adminSessionId })
            })
            .catch((err) => console.log(err));
    }, [])


    useEffect(() => {
        const durationON = document.getElementById("duration")
        if (step2CheckboxDetails.durationCheckbox === "Yes") {
            durationON.setAttribute("required", true)
            durationON.removeAttribute("disabled")
        } else if (step2CheckboxDetails.durationCheckbox === "No") {
            if (durationON) {
                durationON.removeAttribute("required")
                durationON.setAttribute("disabled", true)
                setStep2Details({ ...step2Details, duration: "" })
            }
        }
    }, [step2CheckboxDetails.durationCheckbox])


    const [data, setData] = useState([{}])

    const handleStep2InputChange = (e) => {
        setStep2Details({ ...step2Details, [e.target.name]: e.target.value })
    }

    const handleStep2CheckboxChange = (e) => {
        if (e.target.checked) {
            setStep2CheckboxDetails({ ...step2CheckboxDetails, [e.target.name]: "Yes" })
        }
        else {
            setStep2CheckboxDetails({ ...step2CheckboxDetails, [e.target.name]: "No" })
        }
    }

    const handlePreviousStep = () => {
        setNewExam(true)
    }

    const handleNextStep = (e) => {
        e.preventDefault()
        setStep2(false)
        setData([step2Details, step2CheckboxDetails])
    }

    return (
        <>
            {step2 ? <>
                <div className="main-content p-4 center-side" style={{ width: "75%" }}>
                    <div className="new-exam p-3">
                        <form action="" id='formele' onSubmit={handleNextStep}>
                            <div style={{ 'color': '#374760' }}>
                                <h4><strong> New Exam ({title.name})</strong></h4>
                            </div>
                            <div className="details">
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }} >
                                    <p>Exam Name</p>
                                    <input required name='examName' value={step2Details.examName} onChange={handleStep2InputChange} type="text" style={{ width: "18rem" }} />
                                </div>
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <p>First Start Time</p>
                                    <input name='firstStartTime' value={step2Details.firstStartTime} onChange={handleStep2InputChange} type="datetime-local" style={{ width: "18rem" }} />
                                </div>
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <p>Last Start Time</p>
                                    <input name='lastStartTime' value={step2Details.lastStartTime} onChange={handleStep2InputChange} type="datetime-local" style={{ width: "18rem" }} />
                                </div>
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <p>Duration (in minutes)</p>
                                    <div className="d-flex">
                                        <input id='duration' disabled name='duration' value={step2Details.duration} onChange={handleStep2InputChange} type="text" style={{ width: "11.5rem" }} />
                                        <div className='global-flex'>
                                            <div className='switch trend'></div>
                                            <div className="form-check form-switch switch">
                                                <input name='durationCheckbox' onChange={handleStep2CheckboxChange} type="checkbox" value={step2CheckboxDetails.durationCheckbox} id='checkbox-input3' hidden />
                                                <label htmlFor="checkbox-input3" className='round-slider-container'>
                                                    <div><b>Yes</b></div>
                                                    <div><b>No</b></div>
                                                    <div className="round-slider"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {hideMobileCam && (
                                    <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                        <p>Include mobile camera?</p>
                                        <div className="global-flex">
                                            <div className="switch trend"></div>
                                            <div className="form-check form-switch switch">
                                                <input value={step2CheckboxDetails.mobileCheckbox} onChange={handleStep2CheckboxChange} type="checkbox" name='mobileCheckbox' id="checkbox-input4" hidden />
                                                <label
                                                    htmlFor="checkbox-input4"
                                                    className="round-slider-container">
                                                    <div>
                                                        <b>Yes</b>
                                                    </div>
                                                    <div>
                                                        <b>No</b>
                                                    </div>
                                                    <div className="round-slider"></div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>)}
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <p>Students upload exam? </p>
                                    <div className='global-flex'>
                                        <div className='switch trend'></div>
                                        <div className="form-check form-switch switch">
                                            <input value={step2CheckboxDetails.uploadCheckbox} onChange={handleStep2CheckboxChange} name='uploadCheckbox' type="checkbox" id='checkbox-input5' hidden />
                                            <label htmlFor="checkbox-input5" className='round-slider-container'>
                                                <div><b>Yes</b></div>
                                                <div><b>No</b></div>
                                                <div className="round-slider"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <p>Global proctoring? </p>
                                    <div className='global-flex'>
                                        <div className='switch trend'></div>
                                        <div className="form-check form-switch switch">
                                            <input value={step2CheckboxDetails.globalCheckbox} onChange={handleStep2CheckboxChange} name='globalCheckbox' type="checkbox" id='checkbox-input6' hidden />
                                            <label htmlFor="checkbox-input6" className='round-slider-container'>
                                                <div><b>Yes</b></div>
                                                <div><b>No</b></div>
                                                <div className="round-slider"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="prev-next">
                                <button type='button' className="prev" onClick={handlePreviousStep}>Previous step</button>
                                <button className="next btn btn1">Next step</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-content p-4 right-side" style={{ width: "21rem" }}>
                    <h6>Step 2 - Exam Details</h6>
                    <div className="info-content my-5 d-flex align-items-center justify-content-between flex-column" style={{ height: "89%" }}>
                        <div className="info">
                            <FaRegQuestionCircle size={60} style={{ color: "red" }} />
                        </div>
                        <div className="info text-center">
                            <FaCogs size={40} color={"#555"} />
                            <p>
                                Fill in the exam details, including the duration of the exam and when students may begin their exam.
                            </p>
                        </div>
                        <div className="info d-flex justify-content-between" style={{ width: "100%" }}>
                            <div className="bar">
                                <div className="step_bar2"></div>
                            </div>
                            <span style={{ fontSize: "13px" }}>
                                {" "}
                                <b> 2 of 5</b>
                            </span>
                        </div>
                    </div>
                </div>
            </> : <Step3 setStep2={setStep2} data={data} setData={setData} />}
        </>
    )
}

export default Step2