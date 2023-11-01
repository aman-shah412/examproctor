import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar';
import { FaPlus, FaCalendarAlt, FaMinusCircle, FaArchive, FaQuestionCircle, FaPlusSquare, FaRegQuestionCircle } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom';
import SuccessModal from "./SuccessModal"
import ErrorModal from "./ErrorModal"
import ConfirmModal from './ConfirmModal';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi'

function ManageStudents() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [Exams, setExams] = useState([]);
    const [number, setNumber] = useState(1)
    const [hideOpenExam, setHideOpenExam] = useState(true);
    const [hideDraftExam, setHideDraftExam] = useState(true);
    const [hideClosedExam, setHideClosedExam] = useState(true);
    const [dataText, setDataText] = useState()
    const [deleteData, setDeleteData] = useState({})
    const [studentInfo, setStudentInfo] = useState({
        studentName: "",
        studentEmail: "",
        studentInfo: "",
        skipRequirment: "No",
        status: "Registered",
        studentSessionId: "",
        startTime: "",
        endTime: "",
        incidents: [],
        finalComment: "",
        flagColor: "",
        reviewStatus: "",
    })
    const [studentInfoArray, setStudentInfoArray] = useState([])

    const confirmElementID = useRef(null)
    const successElementID = useRef(null)
    const errorElementID = useRef(null)

    const sendEmail = document.getElementById("sendEmail")
    const save_skipReq = document.getElementById("save_skipReq")

    const handleStudentInfoInputChange = (e) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value })
    }
    const handleHideOpenExam = () => {
        setHideOpenExam((e) => !e);
    }
    const handleHideDraftExam = () => {
        setHideDraftExam((e) => !e);
    }
    const handleHideClosedExam = () => {
        setHideClosedExam((e) => !e);
    }
    const handleNavigateExams = (e) => {
        navigate(`/Admin/exams/${e.AdminSessionId}`)
    }

    useEffect(() => {
        const sendEmail = document.getElementById("sendEmail")
        const save_skipReq = document.getElementById("save_skipReq")
        fetch(`http://localhost:8004/fetchexam/${id}`)
            .then((res) => res.json())
            .then((data) => {
                let statusArray = data.data[0].Students.map((e) => {
                    return e.status
                })
                if (statusArray.includes('Registered')) {
                    sendEmail.disabled = false;
                } else {
                    sendEmail.disabled = true;
                }
                save_skipReq.disabled = true
                setStudentInfoArray(data.data[0].Students)
            })
            .catch((err) => {
                console.log(err);
            })

        fetch("http://localhost:8004/fetchdata")
            .then((res) => res.json())
            .then((data) => {
                setExams(data.data)
            })
            .catch((err) => console.log(err));
    }, [])


    function createRandomID(previousIDs) {
        let createID;
        do {
            createID = Math.floor(Math.random() * 10 * 40 * 40);
        } while (previousIDs.includes(createID));

        return createID;
    }

    useEffect(() => {
        if (number > 0) {
            fetch("http://localhost:8004/fetchdata")
                .then((res) => res.json())
                .then((data) => {
                    let datasss = data.data.map((e) => {
                        let studentSessionIDs = e.Students.map((e) => {
                            return e.studentSessionId
                        })
                        return studentSessionIDs
                    })
                    let flatArray = datasss.flatMap((arr) => arr)
                    let studentSessionId = createRandomID(flatArray)
                    setStudentInfo({ ...studentInfo, studentSessionId })
                })
                .catch((err) => console.log(err));
        }
    }, [number])

    useEffect(() => {
        let mapped = studentInfoArray.map((e) => {
            return e.skipRequirment
        })
        const skip_Req = document.getElementsByClassName("skip_Req")
        for (let i = 0; i < skip_Req.length; i++) {
            skip_Req[i].setAttribute("value", mapped[i])
            if (mapped[i] === "Yes") {
                skip_Req[i].setAttribute("checked", "checked")
            }
        }
    }, [studentInfoArray])

    const handleChange_UpdateCheckbox = (e) => {
        if (e.target.hasAttribute("checked")) {
            e.target.removeAttribute("checked")
        }
        if (e.target.checked) {
            e.target.setAttribute("value", "Yes")
        }
        if (!e.target.checked) {
            e.target.setAttribute("value", "No")
        }
        save_skipReq.disabled = false
    }

    const handleAddStudent = () => {
        fetch(`http://localhost:8004/addstudent/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentInfo }),
        })
            .then((response) => response.json())
            .then((datas) => {
                if (datas.data === "Student added successfully") {
                    const modalInstance = new bootstrap.Modal(successElementID.current);
                    modalInstance.show();
                    setNumber(number + 1)
                    setStudentInfoArray([...studentInfoArray, studentInfo])
                    sendEmail.disabled = false
                    setDataText(datas.data)
                } else if (datas.data === "Student already exist") {
                    const modalInstance = new bootstrap.Modal(errorElementID.current);
                    modalInstance.show();
                    setDataText(datas.data)
                }
                setStudentInfo({
                    studentName: "",
                    studentEmail: "",
                    studentInfo: "",
                    skipRequirment: "No",
                    status: "Registered",
                    studentSessionId: "",
                    startTime: "",
                    endTime: "",
                    incidents: [],
                    finalComment: "",
                    flagColor: "",
                    reviewStatus: "",
                })
            })
            .catch((err) => { console.log(err) })
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setStudentInfo({ ...studentInfo, skipRequirment: "Yes" })
        }
        else {
            setStudentInfo({ ...studentInfo, skipRequirment: "No" })
        }
    }

    const handleSave = async () => {
        const skip_Req = document.getElementsByClassName("skip_Req")
        for (let i = 0; i < studentInfoArray.length; i++) {
            studentInfoArray[i].skipRequirment = skip_Req[i].value
        }
        fetch(`http://localhost:8004/savechanges/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentInfoArray }),
        })
            .then((response) => response.json())
            .then((datas) => {
                setDataText(datas.data)
                const modalInstance = new bootstrap.Modal(successElementID.current);
                modalInstance.show()
                save_skipReq.disabled = true
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleSendEmail = async (e) => {
        await fetch(`http://localhost:8004/sendemail/${id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((datas) => {
                setDataText(datas.data)
                const modalInstance = new bootstrap.Modal(successElementID.current);
                modalInstance.show()
                sendEmail.disabled = true
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleConfirmation = (e) => {
        setDataText("Are you sure, you want to delete this student?")
        setDeleteData(e)
        const modalInstance = new bootstrap.Modal(confirmElementID.current);
        modalInstance.show()
    }

    const handleDeleteStudents = async (student) => {
        await fetch(`http://localhost:8004/deletestudent/${id}/${student._id}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((datas) => {
                if (datas.data === "Student removed successfully") {
                    setDataText(datas.data)
                    const modalInstance = new bootstrap.Modal(successElementID.current);
                    modalInstance.show()
                }
                setStudentInfoArray(studentInfoArray.filter((e) => {
                    return e !== student;
                }))
            })
            .catch((err) => {
                console.log(err);
            })
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
                                        <div>
                                            <span> <b> 10/12</b></span>
                                            <span> Demo</span>
                                        </div>
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
                        <div className='p-3' style={{ backgroundColor: "white", width: "100%", height: "100%", overflowY: "auto" }}>
                            <div>
                                <h5 className='mb-0'>Students</h5>
                            </div>
                            <div className='d-flex mt-3'>
                                <div className="details-title d-flex my-2 me-4" style={{ width: "20%" }}>
                                    <input type="text" name='studentName' value={studentInfo.studentName} placeholder='Name' style={{ width: "100%" }} onChange={handleStudentInfoInputChange} />
                                </div>
                                <div className="details-title d-flex my-2 me-4" style={{ width: "20%" }} >
                                    <input type="text" name='studentEmail' value={studentInfo.studentEmail} placeholder='Email' style={{ width: "100%" }} onChange={handleStudentInfoInputChange} />
                                </div>
                                <div className="details-title d-flex my-2 me-3" style={{ width: "20%" }} >
                                    <input type="text" name='studentInfo' value={studentInfo.studentInfo} placeholder='Individual Info' style={{ width: "100%" }} onChange={handleStudentInfoInputChange} />
                                </div>
                                <div className="details-title d-flex my-2 me-3 align-items-center" >
                                    <FaQuestionCircle size={20} />
                                </div>
                                <div className="details-title d-flex my-2 me-4 align-items-center justify-content-between"  >
                                    <p>Skip requirements:</p>
                                    <input type="checkbox" checked={studentInfo.skipRequirment === "Yes"} onChange={handleCheckboxChange} name='skipRequirment' style={{ width: "3rem", marginLeft: "1rem" }} />
                                </div>
                                <div className="details-title d-flex my-2 align-items-center justify-content-end" style={{ width: "15%" }} >
                                    <button onClick={handleAddStudent} className="btn btn1"><FaPlusSquare />Add student</button>
                                </div>
                            </div>
                            <ConfirmModal deleteData={deleteData} handleDeleteStudents={handleDeleteStudents} confirmElementID={confirmElementID} dataText={dataText} />
                            <SuccessModal id={id} successElementID={successElementID} dataText={dataText} />
                            <ErrorModal errorElementID={errorElementID} dataText={dataText} />
                            <table className='mt-2 admin_table'>
                                <thead>
                                    <tr>
                                        <th style={{ width: "auto", minWidth: "4rem" }}>Name</th>
                                        <th style={{ width: "auto", minWidth: "10rem" }}>Email</th>
                                        <th>External ID</th>
                                        <th>Individual Info</th>
                                        <th>Skip Requirement</th>
                                        <th>Start Time</th>
                                        <th>Exam Status</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentInfoArray.map((e, index) => {
                                        return <tr key={index}>
                                            <td style={{ cursor: "pointer" }}>{e.studentName}</td>
                                            <td>{e.studentEmail}</td>
                                            <td></td>
                                            <td>{e.studentInfo}</td>
                                            <td><input onChange={handleChange_UpdateCheckbox} className='skip_Req' type="checkbox" style={{ width: "2rem", height: '2rem' }} /></td>
                                            <td></td>
                                            <td>{e.status}</td>
                                            <td onClick={() => { handleConfirmation(e) }} style={{ cursor: "pointer" }}>{<HiOutlineTrash size={25} color='red' />}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                            <div className="prev-next d-flex justify-content-end">
                                <button onClick={handleSave} id='save_skipReq' style={{ position: "relative", right: "0" }} className="btn btn1">Save</button>
                                <button id='sendEmail' onClick={handleSendEmail} style={{ position: "relative", right: "0" }} className="btn btn1">Send Email</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ManageStudents