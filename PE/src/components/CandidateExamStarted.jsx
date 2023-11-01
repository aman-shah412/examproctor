import React, { useState, useEffect } from 'react'
import { FaVideo, FaRegClock } from "react-icons/fa"
import CandidateExamSubmitted from './CandidateExamSubmitted';

function CandidateExamStarted({ individualCandidateData, runBackwardTimer, timerString, stopRecording, currentUserVideoRef, media, adminData, id }) {

    const [showWebcam, setShowWebcam] = useState(false)
    const [examSubmitted, setExamSubmitted] = useState(false)


    useEffect(() => {
        let timer = JSON.parse(localStorage.getItem("timer"))
        runBackwardTimer(Number(timer))
    }, [])



    const handleShowWebcam = () => {
        setShowWebcam(e => !e)
    }

    useEffect(() => {
        if (showWebcam) {
            currentUserVideoRef.current.srcObject = media;
            currentUserVideoRef.current.play();
        }
    }, [showWebcam])


    const handleStopRecording = async () => {
        try {
            await fetch(`http://localhost:8004/finishexam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, mainID: adminData._id, date: new Date() })
            }).then((response) => response.json())
                .then((data) => {
                    stopRecording()
                    setExamSubmitted(true)
                    setTimeout(() => {
                        localStorage.removeItem("recordingnum")
                        localStorage.removeItem("timer")
                    }, 1000);
                }).catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {!examSubmitted && <>
                <div className='candidate_nav d-flex'>
                    <div className='candidate_nav_content candidate_nav_left d-flex align-items-center justify-content-center'>
                        <h4>Exam instructions</h4>
                    </div>
                    <div className='candidate_nav_content flex-grow-1'></div>
                    <div className='candidate_nav_content candidate_nav_right py-2 px-3'>
                        <button onClick={handleStopRecording} className='buttons btn1 btn btn-primary w-100'>Finish Exam</button>
                        <div className='d-flex justify-content-between p-2 mt-1'>
                            {adminData.Title !== "Classroom" && <div className='bg-light'>
                                <button className='border-0' onClick={handleShowWebcam}>
                                    <FaVideo size={35} />
                                </button>
                            </div>}
                            {adminData.Duration !== "" ? <div className='d-flex align-items-center' style={adminData.Title === "Classroom" ? { position: "absolute", right: "1rem" } : {}} >
                                <FaRegClock size={25} />
                                <h5 className='d-inline m-0 ms-1'>{timerString}</h5>
                            </div> : null}
                        </div>
                    </div>
                </div>
                {showWebcam && <div className='start_exam_content_video'>
                    <video ref={currentUserVideoRef} style={{ width: "100%", height: "auto" }} muted ></video>
                </div>}
                <div className='Candidate_start_exam_content'>
                    <div className='Candidate_instructions_main_box'>
                        <div className='mb-1' style={{ borderBottom: "1px solid #999", height: "4rem" }}>
                        </div>
                        <div>
                            <div className='Candidate_instruction_box'>
                                <h6>Exam instructions</h6>
                                <div className='Candidate_instruction_text'>

                                </div>
                            </div>
                            <div className='Candidate_instruction_box'>
                                <h6>Individual information</h6>
                                <div className='Candidate_instruction_text'>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='Candidate_closing_instructions_box'>
                        <div className='Candidate_closing_instruction_text'>
                            <p className='mb-1'>You can now start your exam. Please make sure that when you are done:</p>
                            <ul className='mb-2'>
                                <li>You first close the exam website(s) and document(s)</li>
                                <li>You click the 'Finish Exam' button above <strong>before</strong> closing this tab!</li>
                            </ul>
                            <p className='mb-0'>After doing this, you can safely close this tab.</p>
                        </div>
                    </div>
                </div>
            </>}
            {examSubmitted && <CandidateExamSubmitted />}
        </>
    )
}

export default CandidateExamStarted