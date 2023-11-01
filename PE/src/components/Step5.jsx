import React, { useState, useEffect, useContext, useRef } from 'react'
import { FaQuestionCircle, FaPlusSquare, FaRegQuestionCircle } from 'react-icons/fa'
import { FiFileText } from 'react-icons/fi'
import Context from "../Context/Context"
import SuccessModal from "./SuccessModal"
import ErrorModal from "./ErrorModal"


function Step5({ data, setData }) {

    const { step5, setStep5 } = useContext(Context)
    let id = data[0].adminSessionId
    const sendEmail = document.getElementById("sendEmail")
    const save_skipReq = document.getElementById("save_skipReq")
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
    const [number, setNumber] = useState(1)
    const successElementID = useRef(null)
    const errorElementID = useRef(null)
    const [dataText, setdataText] = useState()


    useEffect(() => {
        const sendEmail = document.getElementById("sendEmail")
        const save_skipReq = document.getElementById("save_skipReq")
        try {
            fetch("http://localhost:8004/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(data)
            })
            sendEmail.disabled = true
            save_skipReq.disabled = true
        } catch (error) {
            console.log(error);
        }
    }, [])

    const handleAddStudent = () => {
        fetch(`http://localhost:8004/addstudent/${data[0].adminSessionId}`, {
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
                    setdataText(datas.data)
                } else if (datas.data === "Student already exist") {
                    const modalInstance = new bootstrap.Modal(errorElementID.current);
                    modalInstance.show();
                    setdataText(datas.data)
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

    const handleStudentInfoInputChange = (e) => {
        setStudentInfo({ ...studentInfo, [e.target.name]: e.target.value })
    }

    const handleCheckboxChange = (e) => {
        if (e.target.checked) {
            setStudentInfo({ ...studentInfo, skipRequirment: "Yes" })
        }
        else {
            setStudentInfo({ ...studentInfo, skipRequirment: "No" })
        }
    }

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

    const handleSave = () => {
        const skip_Req = document.getElementsByClassName("skip_Req")
        for (let i = 0; i < studentInfoArray.length; i++) {
            studentInfoArray[i].skipRequirment = skip_Req[i].value
        }
        fetch(`http://localhost:8004/savechanges/${data[0].adminSessionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ studentInfoArray }),
        })
            .then((response) => response.json())
            .then((datas) => {
                setdataText(datas.data)
                const modalInstance = new bootstrap.Modal(successElementID.current);
                modalInstance.show()
                save_skipReq.disabled = true
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const handleSendEmail = async () => {
        await fetch(`http://localhost:8004/sendemail/${data[0].adminSessionId}`, {
            method: "GET"
        })
            .then((response) => response.json())
            .then((datas) => {
                setdataText(datas.data)
                const modalInstance = new bootstrap.Modal(successElementID.current);
                modalInstance.show()
                sendEmail.disabled = true
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            {step5 ? <>
                <div className="main-content p-4 center-side" style={{ width: "75%" }}>
                    <div className="new-exam p-3">
                        <div style={{ 'color': '#374760' }}>
                            <h4><strong> Students</strong></h4>
                        </div>
                        <div className='d-flex my-5'>
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
                                <input type="checkbox" checked={studentInfo.skipRequirment === "Yes"} onChange={handleCheckboxChange} name='skipRequirment' style={{ width: "3rem" }} />
                            </div>
                            <div className="details-title d-flex my-2 align-items-center justify-content-end" style={{ width: "15%" }} >
                                <button onClick={handleAddStudent} className="btn btn1"><FaPlusSquare />Add student</button>
                            </div>
                        </div>
                        <SuccessModal id={id} successElementID={successElementID} dataText={dataText} />
                        <ErrorModal errorElementID={errorElementID} dataText={dataText} />
                        <table className='admin_table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th style={{ width: "auto", minWidth: "10rem" }}>Email</th>
                                    <th>External ID</th>
                                    <th>Individual Info</th>
                                    <th>Proctor</th>
                                    <th>Skip Requirement</th>
                                    <th>Start Time</th>
                                    <th>Exam Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentInfoArray.map((e, index) => {
                                    return <tr key={index}>
                                        <td>{e.studentName}</td>
                                        <td>{e.studentEmail}</td>
                                        <td></td>
                                        <td>{e.studentInfo}</td>
                                        <td></td>
                                        <td><input onChange={handleChange_UpdateCheckbox} className='skip_Req' type="checkbox" style={{ width: "2rem", height: '2rem' }} /></td>
                                        <td></td>
                                        <td></td>
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
                <div className="main-content p-4 right-side" style={{ width: "21rem" }}>
                    <h6>Step 5 - Exam Student Registration</h6>
                    <div className="info-content my-5 d-flex align-items-center justify-content-between flex-column" style={{ height: "89%" }}>
                        <div className="info">
                            <FaRegQuestionCircle size={60} style={{ color: "red" }} />
                        </div>
                        <div className="info text-center">
                            <FiFileText size={40} color={"#555"} />
                            <p>
                                Add students to exam for registration.
                            </p>
                        </div>
                        <div className="info d-flex justify-content-between" style={{ width: "100%" }}>
                            <div className="bar">
                                <div className="step_bar5"></div>
                            </div>
                            <span style={{ fontSize: "13px" }}>
                                {" "}
                                <b> 5 of 5</b>
                            </span>
                        </div>
                    </div>
                </div>
            </> : <> </>}
        </>
    )
}

export default Step5