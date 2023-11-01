import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaPlus, FaCalendarAlt, FaMinusCircle, FaArchive, FaTimesCircle, FaCheckCircle, FaPlusCircle } from 'react-icons/fa'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import ConfirmModal from './ConfirmModal';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';

function AdminExam() {

    const [hideOpenExam, setHideOpenExam] = useState(true);
    const [hideDraftExam, setHideDraftExam] = useState(true);
    const [hideClosedExam, setHideClosedExam] = useState(true);
    const [Exams, setExams] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [individualExam, setIndividualExam] = useState({
        streams: {
            webcam: "",
            screenshare: "",
            mobilecam: ""
        },
        title: "",
        examName: "",
        firstStartTime: "",
        lastStartTime: "",
        duration: "",
        durationCheckbox: "",
        mobileCheckbox: "",
        uploadCheckbox: "",
        globalCheckbox: "",
    });
    const [hideMobileCam, setHideMobileCam] = useState(true);
    const [dataText, setDataText] = useState(true);
    const { id } = useParams()
    const navigate = useNavigate()
    const confirmElementID = useRef(null)
    const successElementID = useRef(null)
    const errorElementID = useRef(null)

    useEffect(() => {
        fetch(`http://localhost:8004/fetchexam/${id}`)
            .then((res) => res.json())
            .then((data) => {
                const checkbox_input10 = document.getElementById("checkbox-input10")
                const checkbox_input4 = document.getElementById("checkbox-input4")
                const checkbox_input5 = document.getElementById("checkbox-input5")
                const checkbox_input6 = document.getElementById("checkbox-input6")

                setStudentsData(data.data[0].Students)
                if (data.data[0].Title === "Classroom") {
                    setHideMobileCam(false)
                }
                if (data.data[0].DurationCheckbox === "Yes") {
                    checkbox_input10.setAttribute("checked", "checked")
                } else {
                    checkbox_input10.removeAttribute("checked")
                }
                if (data.data[0].MobileCheckbox === "Yes") {
                    checkbox_input4.setAttribute("checked", "checked")
                } else {
                    checkbox_input4.removeAttribute("checked")
                }
                if (data.data[0].UploadCheckbox === "Yes") {
                    checkbox_input5.setAttribute("checked", "checked")
                } else {
                    checkbox_input5.removeAttribute("checked")
                }
                if (data.data[0].GlobalCheckbox === "Yes") {
                    checkbox_input6.setAttribute("checked", "checked")
                } else {
                    checkbox_input6.removeAttribute("checked")
                }

                setIndividualExam({
                    streams: {
                        webcam: data.data[0].Streams.webcam,
                        screenshare: data.data[0].Streams.screenshare,
                        mobilecam: data.data[0].Streams.mobilecam
                    },
                    title: data.data[0].Title,
                    examName: data.data[0].ExamName,
                    firstStartTime: data.data[0].FirstStartTime,
                    lastStartTime: data.data[0].LastStartTime,
                    duration: data.data[0].Duration,
                    durationCheckbox: data.data[0].DurationCheckbox,
                    mobileCheckbox: data.data[0].MobileCheckbox,
                    uploadCheckbox: data.data[0].UploadCheckbox,
                    globalCheckbox: data.data[0].GlobalCheckbox,
                })
            })
            .catch((err) => console.log(err));

        fetch("http://localhost:8004/fetchdata")
            .then((res) => res.json())
            .then((data) => {
                setExams(data.data)
            })
            .catch((err) => console.log(err));
    }, [id]);

    useEffect(() => {
        if (individualExam.mobileCheckbox === "Yes") {
            setIndividualExam({
                ...individualExam,
                streams: {
                    webcam: "true",
                    screenshare: "true",
                    mobilecam: "true"
                }
            })
        } else {
            setIndividualExam({
                ...individualExam,
                streams: {
                    webcam: "true",
                    screenshare: "true",
                    mobilecam: "false"
                }
            })
        }
    }, [individualExam.mobileCheckbox])


    useEffect(() => {
        const durationON = document.getElementById("duration")
        if (individualExam.durationCheckbox === "Yes") {
            durationON.removeAttribute("disabled")
        } else if (individualExam.durationCheckbox === "No") {
            if (durationON) {
                durationON.setAttribute("disabled", true)
            }
        }
    }, [individualExam.durationCheckbox])

    const handleHideOpenExam = () => {
        setHideOpenExam((e) => !e);
    }
    const handleHideDraftExam = () => {
        setHideDraftExam((e) => !e);
    }
    const handleHideClosedExam = () => {
        setHideClosedExam((e) => !e);
    }

    const handleStep2InputChange = (e) => {
        setIndividualExam({ ...individualExam, [e.target.name]: e.target.value })
    }

    const handleNavigateExams = (e) => {
        navigate(`/Admin/exams/${e.AdminSessionId}`)
    }

    const handleStep2CheckboxChange = (e) => {
        if (e.target.checked) {
            setIndividualExam({ ...individualExam, [e.target.name]: "Yes" })
        }
        else {
            setIndividualExam({ ...individualExam, [e.target.name]: "No" })
        }
    }

    const handleManage = () => {
        navigate(`/Admin/exams/${id}/manage_exam`)
    }

    const handleUpdateSession = (e) => {

        fetch(`http://localhost:8004/updateexamdetails/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ individualExam }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data === "Changes has been saved") {
                    setDataText(data.data)
                    const modalInstance = new bootstrap.Modal(successElementID.current);
                    modalInstance.show()
                } else if (data.data === "Something went wrong") {
                    setDataText(data.data)
                    const modalInstance = new bootstrap.Modal(errorElementID.current);
                    modalInstance.show()
                }
            })
            .catch((err) => { console.log(err) })
    }

    const deleteConfirmation = "Are you sure, you want to delete this session?"
    const updateConfirmation = "Do you want to update instructions?"

    const handleConfirmation = (text) => {
        setDataText(text)
        const modalInstance = new bootstrap.Modal(confirmElementID.current);
        modalInstance.show()
    }

    const handleDeleteSession = () => {
        let studentSessionIDArray = studentsData.map((e) => {
            return e._id
        })

        if (studentSessionIDArray.length > 0) {
            fetch(`http://localhost:8004/deletesession/${id}/${studentSessionIDArray}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.data === "Session deleted successfully") {
                        setDataText(data.data)
                        const modalInstance = new bootstrap.Modal(successElementID.current);
                        modalInstance.show()
                    } else if (data.data === "Something went wrong") {
                        setDataText(data.data)
                        const modalInstance = new bootstrap.Modal(errorElementID.current);
                        modalInstance.show()
                    }
                })
                .catch((err) => { console.log(err) })
        } else {
            fetch(`http://localhost:8004/deletesession/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.data === "Session deleted successfully") {
                        setDataText(data.data)
                        const modalInstance = new bootstrap.Modal(successElementID.current);
                        modalInstance.show()
                    } else if (data.data === "Something went wrong") {
                        setDataText(data.data)
                        const modalInstance = new bootstrap.Modal(errorElementID.current);
                        modalInstance.show()
                    }
                })
                .catch((err) => { console.log(err) })
        }
    }


    const handleCreateNewExam = () => {
        navigate(`/Admin`)
      }

    return (
        <>
            <Navbar />
            <div className="admin-content">
                <div className="admin d-flex align-items-center">
                    <div className="second-navbar d-flex align-items-center" style={{ 'width': '13.5rem' }}>
                        <h5>Administration</h5>
                    </div>
                    <div className="second-navbar d-flex align-items-center" style={{ 'width': '71.5%' }}>
                        <a href='/'>
                            <button className='btn btn-light butn'>Home</button>
                        </a>
                    </div>
                    <div className="second-navbar d-flex align-items-center" style={{ 'width': '20rem', 'float': 'right' }}>
                        <h6>Your institute currently has no tokens.</h6>
                    </div>
                </div>
                <div className="admin-main-content d-flex">
                    <div className="main-content left-side" style={{ 'width': '16%', "minWidth": "17rem" }}>
                        <div className="left-content">
                            <div className="">
                                <button onClick={handleCreateNewExam} className='buttons btn1 btn btn-primary'><FaPlus size={15} /> Create Exam</button><br />
                                <button className='my-3 btn1 btn btn-primary'>Overview</button><br />
                                <input type="text" className='search-exam my-1' placeholder='Search' />
                                <div className='d-flex my-2 align-items-center justify-content-between' style={{ 'width': '9rem', 'color': '#374760' }}>
                                    <FaCalendarAlt />
                                    <span className='fw-semibold'> OPEN EXAMS</span>
                                    <button onClick={handleHideOpenExam} style={{ 'border': 'none', 'outline': 'none', 'color': '#374760' }} >{hideOpenExam ? <FaMinusCircle /> : <FaPlusCircle />}</button>
                                </div>
                                {hideOpenExam && (
                                    <div className='d-flex align-items-start flex-column justify-content-between' style={{ 'width': '100%', 'color': '#374760' }}>
                                        {Exams.map((e, index) => {
                                            return <div key={index} onClick={() => { handleNavigateExams(e) }} className='admin_exam_name' >
                                                <span> <b> 10/12</b></span>
                                                <span> {e.ExamName} </span>
                                            </div>
                                        })}
                                    </div>)}
                                <div className='d-flex my-2 align-items-center justify-content-between' style={{ 'width': '9.3rem', 'color': '#374760' }}>
                                    <HiOutlinePencilAlt />
                                    <span className='fw-semibold'> DRAFT EXAMS</span>
                                    <button onClick={handleHideDraftExam} style={{ 'border': 'none', 'outline': 'none', 'color': '#374760' }} > {hideDraftExam ? <FaMinusCircle /> : <FaPlusCircle />}</button>
                                </div>
                                {hideDraftExam && (
                                    <div className='d-flex align-items-center flex-column justify-content-between' style={{ 'width': '6rem', 'color': '#374760' }}>
                                    </div>)}
                                <div className='d-flex my-2 align-items-center justify-content-between' style={{ 'width': '10rem', 'color': '#374760' }}>
                                    <FaArchive />
                                    <span className='fw-semibold'> CLOSED EXAMS</span>
                                    <button onClick={handleHideClosedExam} style={{ 'border': 'none', 'outline': 'none', 'color': '#374760' }} > {hideClosedExam ? <FaMinusCircle /> : <FaPlusCircle />}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main-content p-3 center-side" style={{ 'width': '84%' }}>
                        <div className="d-flex" style={{ 'height': '100%' }}>
                            <div className='py-2 px-3 admin-exam-center-left-side'>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <h5 className='mb-0'>{individualExam.examName}</h5>
                                        <h5 className='mb-0'>({individualExam.title})</h5>
                                    </div>
                                    <div className='d-flex flex-column align-items-end'>
                                        <p className='fw-bold mb-0 text_green'>OPEN</p>
                                        <div className='admin_exam_status bo_green_flag'></div>
                                    </div>
                                </div>
                                <form action="" id='formele'>
                                    <div className="details">
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }} >
                                            <p>Exam Name</p>
                                            <input name='examName' value={individualExam.examName} onChange={handleStep2InputChange} type="text" style={{ width: "16rem" }} />
                                        </div>
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                            <p>First Start Time</p>
                                            <input name='firstStartTime' value={individualExam.firstStartTime} onChange={handleStep2InputChange} type="datetime-local" style={{ width: "16rem" }} />
                                        </div>
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                            <p>Last Start Time</p>
                                            <input name='lastStartTime' value={individualExam.lastStartTime} onChange={handleStep2InputChange} type="datetime-local" style={{ width: "16rem" }} />
                                        </div>
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                            <p>Duration (in minutes)</p>
                                            <div className="d-flex">
                                                <input id='duration' disabled name='duration' value={individualExam.duration} onChange={handleStep2InputChange} type="text" style={{ width: "10.5rem" }} />
                                                <div className='global-flex'>
                                                    <div className='switch trend'></div>
                                                    <div className="form-check form-switch switch">
                                                        <input name='durationCheckbox' value={individualExam.durationCheckbox} onChange={handleStep2CheckboxChange} type="checkbox" id='checkbox-input10' hidden />
                                                        <label style={{ width: "70px" }} htmlFor="checkbox-input10" className='round-slider-container'>
                                                            <div><b>Yes</b></div>
                                                            <div><b>No</b></div>
                                                            <div style={{ left: "8px" }} className="round-slider"></div>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {hideMobileCam && (
                                            <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                                <p>Include mobile camera?</p>
                                                <div className="global-flex">
                                                    <div className="switch trend"></div>
                                                    <div className="form-check form-switch switch">
                                                        <input value={individualExam.mobileCheckbox} onChange={handleStep2CheckboxChange} type="checkbox" name='mobileCheckbox' id="checkbox-input4" hidden />
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
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                            <p>Students upload exam? </p>
                                            <div className='global-flex'>
                                                <div className='switch trend'></div>
                                                <div className="form-check form-switch switch">
                                                    <input value={individualExam.uploadCheckbox} onChange={handleStep2CheckboxChange} name='uploadCheckbox' type="checkbox" id='checkbox-input5' hidden />
                                                    <label htmlFor="checkbox-input5" className='round-slider-container'>
                                                        <div><b>Yes</b></div>
                                                        <div><b>No</b></div>
                                                        <div className="round-slider"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="details-title d-flex my-2 align-items-center justify-content-between" style={{ width: "100%" }}>
                                            <p>Global proctoring? </p>
                                            <div className='global-flex'>
                                                <div className='switch trend'></div>
                                                <div className="form-check form-switch switch">
                                                    <input value={individualExam.globalCheckbox} onChange={handleStep2CheckboxChange} name='globalCheckbox' type="checkbox" id='checkbox-input6' hidden />
                                                    <label htmlFor="checkbox-input6" className='round-slider-container'>
                                                        <div><b>Yes</b></div>
                                                        <div><b>No</b></div>
                                                        <div className="round-slider"></div>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type='button' onClick={() => { handleConfirmation(deleteConfirmation) }} className="btn btn-danger mt-2">Delete</button>
                                    <button type='button' onClick={() => { handleConfirmation(updateConfirmation) }} className="next btn btn1 me-2 mt-2">Update</button>
                                </form>
                            </div>
                            <ConfirmModal handleDeleteSession={handleDeleteSession} confirmElementID={confirmElementID} dataText={dataText} handleUpdateSession={handleUpdateSession} />
                            <SuccessModal successElementID={successElementID} dataText={dataText} />
                            <ErrorModal errorElementID={errorElementID} dataText={dataText} />
                            <div className='ms-3 admin-exam-center-right-side'>
                                <div className='admin-exam-center-right-top-side'>
                                    <div className='d-flex justify-content-between'>
                                        <h6 className='mb-0'>Students</h6>
                                        <span className='info-badge'>{studentsData.length} students</span>
                                    </div>
                                    <table className="table mt-4 mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Exam Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentsData.slice(0, 5).map((e, index) => {
                                                return <tr key={index}>
                                                    <td>{e.studentName}</td>
                                                    <td></td>
                                                </tr>
                                            })}
                                        </tbody>
                                    </table>
                                    {studentsData.length > 5 && (
                                        <span>. . .</span>
                                    )}
                                    <button onClick={handleManage} className="next btn btn1 mt-4">Manage</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminExam