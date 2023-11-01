import React, { useState, useRef, useEffect, useContext } from 'react'
import { FaVideo, FaUserAlt, FaCheckCircle, FaRegClock } from "react-icons/fa"
import CandidateExamStarted from './CandidateExamStarted';
import CandidateExamSubmitted from './CandidateExamSubmitted';

function CandidateRR({ name, id }) {
    const [click, setClick] = useState(true);
    const [saveData, setSaveData] = useState({});
    const [photoData, setPhotoData] = useState(null);
    const [idData, setIDData] = useState(null);
    const [step1, setStep1] = useState(false);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);
    const [step5, setStep5] = useState(false);
    const [step6, setStep6] = useState(false);
    const [step7, setStep7] = useState(false);
    const [beforeStartExam, setBeforeStartExam] = useState(false);
    const [afterStartExam, setAfterStartExam] = useState(false);
    const [examSubmitted, setExamSubmitted] = useState(false);
    const [media, setMedia] = useState(null);
    const [screenMedia, setScreenMedia] = useState(null);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const [adminData, setAdminData] = useState("");
    const [individualCandidateData, setIndividualCandidateData] = useState();
    const [timerString, setTimerString] = useState("");
    const currentUserVideoRef = useRef(null);
    const canvasRef = useRef(null);
    const canvasRef2 = useRef(null);
    const tempScreenMedia = useRef(null)
    const tempMedia = useRef(null)
    const webcamRecorder = useRef(null)
    const screenRecorder = useRef(null)
    let recordingnum = 1
    let sChunks = []
    let wChunks = []
    let timer

    function runBackwardTimer(initialTime) {
        let isNegative = initialTime <= 0;
        initialTime--
        let minutes = Math.floor(initialTime / 60);
        let seconds = initialTime % 60;
        timer = initialTime
        if (JSON.parse(localStorage.getItem("timer"))) {
            localStorage.setItem("timer", JSON.stringify(timer))
        }
        if (isNegative) {
            minutes = Math.abs(minutes)
            seconds = Math.abs(seconds)
        }
        let timeString = (isNegative ? '-' : '') + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        setTimerString(timeString);
        setTimeout(() => {
            runBackwardTimer(initialTime)
        }, 1000);
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("refreshed"))) {
            localStorage.removeItem("refreshed")
        }

        fetch(`http://localhost:8004/cancelschedule`)

        fetch(`http://localhost:8004/candidateid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.data[1].Duration !== "") {
                    if (!JSON.parse(localStorage.getItem("timer")) || JSON.parse(localStorage.getItem("timer")) === null) {
                        localStorage.setItem("timer", JSON.stringify(Number(data.data[1].Duration) * 60))
                    }
                } else {
                    localStorage.removeItem("timer")
                }
                setAdminData(data.data[1])
                setIndividualCandidateData(data.data[0].Students[0])
                if (data.data[0].Students[0].status === "Email Sent" || data.data[0].Students[0].status === "In Setup") {
                    setBeforeStartExam(true)
                    setStep1(true)
                } else if (data.data[0].Students[0].status === "Exam started") {
                    setAfterStartExam(true)
                    shareWebcam()
                    shareScreen()
                } else if (data.data[0].Students[0].status === "Exam submitted") {
                    setExamSubmitted(true)
                    if (JSON.parse(localStorage.getItem("timer"))) {
                        localStorage.removeItem("timer")
                        localStorage.removeItem("recordingnum")
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        const unloadCallback = (event) => {
            event.preventDefault();
            event.returnValue = "";
            if (screenRecorder.current && webcamRecorder.current) {
                if (screenRecorder.current.state === "recording" && webcamRecorder.current.state === "recording") {
                    localStorage.setItem("refreshed", JSON.stringify(true))
                }
            }
            stopRecording()
        };

        window.addEventListener("beforeunload", unloadCallback);

        return () => {
            window.removeEventListener("beforeunload", unloadCallback)
        }
    }, [])


    function shareScreen() {
        navigator.mediaDevices
            .getDisplayMedia({ video: { displaySurface: "monitor" } })
            .then((webcamStream) => {
                let displaySurface = webcamStream.getVideoTracks()[0].getSettings().displaySurface;
                if (displaySurface !== 'monitor') {
                    throw new Error('Not Entire Screen');
                }
                tempScreenMedia.current = webcamStream
                setScreenMedia(tempScreenMedia.current);
                if (JSON.parse(localStorage.getItem("recordingnum"))) {
                    recordingnum = JSON.parse(localStorage.getItem("recordingnum")) + 1
                    if (JSON.parse(localStorage.getItem("recordingnum")) >= 1) {
                        record()
                    }
                }
            })
            .catch((err) => {
                if (err.name === "NotAllowedError") {
                    setPermissionDenied(true)
                }
                if (err.message === 'Not Entire Screen') {
                    alert("Please share entire screen")
                    setPermissionDenied(true)
                }
            });
    }

    useEffect(() => {
        if (permissionDenied) {
            shareScreen()
            setPermissionDenied(false)
        }
    }, [permissionDenied])

    function shareWebcam() {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((webcamStream) => {
                tempMedia.current = webcamStream
                setMedia(tempMedia.current);
                currentUserVideoRef.current.srcObject = webcamStream;
                currentUserVideoRef.current.play();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const turnOnWebcam = async () => {
        const show_webcam = document.getElementById("show_webcam")
        const response = await fetch("http://localhost:8004/tabprompting")
            .then((res) => res.json())
            .then(data => {
                if (data.data.numb > 1 && data.data.text === "Different") {
                    alert(`${data.data.numb} more tabs are open, Please close other tabs before proceeding`)
                } else if (data.data.numb > 1 && data.data.text === "Duplicate") {
                    alert("Another session detected, please close it before proceeding further")
                } else if (data.data.numb == 1 && data.data.text === "Proceed") {
                    shareWebcam()
                    show_webcam.removeAttribute("hidden")
                }
            }).catch((err) => {
                console.log(err);
            })
    }

    const nextStep_Step2 = () => {
        setStep1(false)
        setStep2(true)
        shareScreen()
    }

    useEffect(() => {
        if (screenMedia !== null) {
            screenMedia.getVideoTracks()[0].onended = function () {
                shareScreen()
            };
        }
    }, [screenMedia])

    const nextStep_Step3 = async () => {
        await fetch('http://localhost:8004/fetchsavedphotos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => response.json())
            .then((data) => {
                setPhotoData(data.data);
                setStep2(false)
                setStep3(true)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    useEffect(() => {
        if (step3 || step4 || step6 || step7) {
            currentUserVideoRef.current.srcObject = media;
            currentUserVideoRef.current.play();
        }
    }, [step3, step4, step6, step7])

    useEffect(() => {
        if (canvasRef.current && photoData !== null) {
            setSaveData({
                RandomID: photoData.RandomID,
                SelfiePhoto: photoData.SelfiePhoto,
            });
            setClick(false)
            let width = 350
            let height = width / (12 / 9)
            const ctx = canvasRef.current.getContext('2d');
            canvasRef.current.width = width;
            canvasRef.current.height = height;
            const image = new Image();
            image.src = photoData.SelfiePhoto
            image.onload = function () {
                ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }, [photoData])

    const nextStep_Step4 = async () => {
        try {
            await fetch(`http://localhost:8004/fetchsavedphotos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setIDData(data.data);
                    setStep3(false)
                    setStep4(true)
                    setClick(true)
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

            if (photoData !== null) {
                try {
                    const response = await fetch("http://localhost:8004/updatephoto", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify(saveData)
                    })
                } catch (error) {
                    console.log(error);
                }
            } else {
                const response = await fetch("http://localhost:8004/uploadphoto", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(saveData)
                })
            }

        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (canvasRef2.current && idData.IDPhoto !== "") {
            setClick(false)
            setSaveData({
                RandomID: idData.RandomID,
                IDPhoto: idData.IDPhoto
            })
            let width = 350
            let height = width / (12 / 9)
            const ctx = canvasRef2.current.getContext('2d');
            canvasRef2.current.width = width;
            canvasRef2.current.height = height;
            const image = new Image();
            image.src = idData.IDPhoto
            image.onload = function () {
                ctx.drawImage(image, 0, 0, canvasRef2.current.width, canvasRef2.current.height);
            }
        }
    }, [idData])

    const nextStep_Step5 = async () => {
        setStep4(false)
        setStep5(true)
        try {
            const response = await fetch("http://localhost:8004/saveidphoto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify(saveData)
            })
        } catch (error) {
            console.log(error);
        }

    }

    const handlePhotoClick = () => {
        let width = 350
        let height = width / (12 / 9)
        var canvasElement = document.getElementById('canvas');
        var context = canvasElement.getContext('2d');
        canvasElement.width = width;
        canvasElement.height = height;
        context.drawImage(currentUserVideoRef.current, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvasElement.toDataURL('image/jpeg');
        setClick(false)
        setSaveData({
            RandomID: id,
            SelfiePhoto: imageData,
            IDPhoto: "",
            AdminSessionId: adminData.AdminSessionId,
            StudentSessionId: individualCandidateData.studentSessionId
        })
    }

    const handleIDPhotoClick = () => {
        let width = 350
        let height = width / (12 / 9)
        var canvasElement = document.getElementById('canvas2');
        var context = canvasElement.getContext('2d');
        canvasElement.width = width;
        canvasElement.height = height;
        context.drawImage(currentUserVideoRef.current, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvasElement.toDataURL('image/jpeg');
        setClick(false)
        setSaveData({
            RandomID: id,
            IDPhoto: imageData
        })
    }

    const record = async () => {
        localStorage.setItem("recordingnum", JSON.stringify(recordingnum))
        const screenRecorderInstance = new MediaRecorder(tempScreenMedia.current);
        const webcamRecorderInstance = new MediaRecorder(tempMedia.current);

        screenRecorderInstance.ondataavailable = (e) => {
            let recordingnumber = JSON.parse(localStorage.getItem("recordingnum"))
            let refreshed = JSON.parse(localStorage.getItem("refreshed"))

            if (e.data.size > 0) {
                sChunks.push(e.data)
                const sblob = new Blob(sChunks, { type: 'video/webm' });
                navigator.serviceWorker.controller.postMessage({
                    action: 'storeScreenData', data: {
                        screenBlob: sblob,
                        recordingnumber: recordingnumber,
                        id: id,
                        refreshed: refreshed,
                        timer: new Date(Date.now() + 300000),
                    }
                });
            }
        };

        webcamRecorderInstance.ondataavailable = (e) => {
            let recordingnumber = JSON.parse(localStorage.getItem("recordingnum"))
            let refreshed = JSON.parse(localStorage.getItem("refreshed"))

            if (e.data.size > 0) {
                wChunks.push(e.data)
                const wblob = new Blob(wChunks, { type: 'video/webm' });
                navigator.serviceWorker.controller.postMessage({
                    action: 'storeWebcamData', data: {
                        webcamBlob: wblob,
                        recordingnumber: recordingnumber,
                        id: id,
                        refreshed: refreshed,
                        timer: new Date(Date.now() + 300000),
                    }
                });
            }
        };

        screenRecorderInstance.start();
        webcamRecorderInstance.start();
        console.log("started");

        screenRecorder.current = screenRecorderInstance
        webcamRecorder.current = webcamRecorderInstance

    }


    const handleStartRecording = () => {
        if (!JSON.parse(localStorage.getItem("recordingnum"))) {
            record()
        }
        setStep5(false)
        setStep6(true)
    }

    const nextStep_Step7 = () => {
        setStep6(false)
        setStep7(true)
    }

    const startExam = async () => {
        try {
            await fetch(`http://localhost:8004/startexam`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, mainID: adminData._id, date: new Date() })
            }).then((response) => response.json())
                .then((data) => {
                    setStep7(false)
                    setBeforeStartExam(false)
                    setAfterStartExam(true)
                }).catch((err) => {
                    console.log(err);
                })
        } catch (error) {
            console.log(error);
        }
    }

    const stopRecording = () => {
        if (JSON.parse(localStorage.getItem("recordingnum"))) {
            console.log("stopped");
            const stopScreenRecording = new Promise((resolve) => {
                screenRecorder.current.onstop = () => {
                    resolve();
                };
                screenRecorder.current.stop();
            });

            const stopWebcamRecording = new Promise((resolve) => {
                webcamRecorder.current.onstop = () => {
                    resolve();
                };
                webcamRecorder.current.stop();
            });

            Promise.all([stopScreenRecording, stopWebcamRecording]).then(() => {
            });
        }
    };

    return (
        <>
            {beforeStartExam && <div style={step7 ? { backgroundColor: "white" } : { backgroundColor: "black" }} className='candidate-page d-flex flex-column'>
                {beforeStartExam && <h1>Hello {name}</h1>}
                {step1 && <>
                    <p>Please turn on the webcam</p>
                    <video id='show_webcam' hidden ref={currentUserVideoRef} style={{ width: "40rem", height: "40rem" }} muted src=""></video>
                    {media === null ?
                        <button className='buttons btn1 btn btn-primary' id='tab_prompt' onClick={turnOnWebcam}>Turn on webcam</button> :
                        <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step2}>Next Step</button>
                    }
                </>}
                {step2 && <>
                    <p>Please click on hide after sharing screen</p>
                    <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step3}>Next Step</button>
                </>}
                {step3 && <>
                    <div className='media'>
                        <div className='media_canvas flex-column'>
                            <div>
                                <canvas ref={canvasRef} id='canvas' >
                                </canvas>
                            </div>
                            {!click && <div style={{ width: "21rem" }} className='mt-3 d-flex justify-content-evenly'>
                                <button className='buttons btn1 btn btn-primary' onClick={() => { setClick(true) }}>Click Again</button>
                                <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step4}>Next Step</button>
                            </div>}
                        </div>
                        <video ref={currentUserVideoRef} style={{ width: "40rem", height: "40rem" }} muted></video>
                    </div>
                    <div>
                        {click && <button className='buttons btn1 btn btn-primary' onClick={handlePhotoClick}>Click Picture</button>}
                    </div>
                </>}
                {step4 && <>
                    <div className='media'>
                        <div className='media_canvas flex-column'>
                            <div>
                                <canvas ref={canvasRef2} id='canvas2' >
                                </canvas>
                            </div>
                            {!click && <div style={{ width: "21rem" }} className='mt-3 d-flex justify-content-evenly'>
                                <button className='buttons btn1 btn btn-primary' onClick={() => { setClick(true) }}>Click Again</button>
                                <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step5}>Next Step</button>
                            </div>}
                        </div>
                        <video ref={currentUserVideoRef} style={{ width: "40rem", height: "40rem" }} muted></video>
                    </div>
                    <div>
                        {click && <button className='buttons btn1 btn btn-primary' onClick={handleIDPhotoClick}>Click Picture</button>}
                    </div>
                </>}
                {step5 && <div className='candidate-content'>
                    <h5>Everything after this point is recorded</h5>
                    <div className='d-flex mt-3'>
                        <FaVideo size={30} />
                        <p className='ms-3'>Everything after this point is recorded</p>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button className='buttons btn1 btn btn-primary' onClick={handleStartRecording}>OK</button>
                    </div>
                </div>}
                {step6 && <>
                    <div className='media'>
                        <div className='media_canvas flex-column'>
                            <div>
                                <img src="https://th.bing.com/th/id/OIP.3cWKbNEo08RmcVS9LIEH4QHaE7?pid=ImgDet&rs=1" width={300} alt="" />
                            </div>
                        </div>
                        <video ref={currentUserVideoRef} style={{ width: "35%", height: "40rem" }} muted></video>
                        <div className='media_canvas flex-column'>
                            <div className='candidate_instruction'>
                                <h4>You are allowed to use following materials</h4>
                                <ul>
                                    <li>You may use pen and paper</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step7}>Next step</button>
                    </div>
                </>}
                {step7 && <>
                    <h2>DONE!</h2>
                    <h3>Before you proceed:</h3>
                    <div className='d-flex mt-3'>
                        <div>
                            <video ref={currentUserVideoRef} style={{ width: "26rem" }} muted></video>
                        </div>
                        <div className='d-flex flex-column justify-content-center p-3' style={{ width: "26rem", height: "20rem" }}>
                            <div className='d-flex align-items-center'>
                                <FaUserAlt size={70} color='rgb(80 181 123)' />
                                <p className='ms-4 mb-0'>Check your camera, is is positioned correctly and is the room light enough?</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <FaCheckCircle size={45} color='rgb(80 181 123)' />
                                <p className='ms-4 mb-0'>If you are ready click start.</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <button className='buttons btn1 btn btn-primary' onClick={startExam}>Start Exam</button>
                    </div>
                </>}
            </div>}
            {afterStartExam && <CandidateExamStarted individualCandidateData={individualCandidateData} timerString={timerString} runBackwardTimer={runBackwardTimer} adminData={adminData} media={media} currentUserVideoRef={currentUserVideoRef} id={id} stopRecording={stopRecording} />
            }
            {examSubmitted && <CandidateExamSubmitted />}
        </>
    )
}

export default CandidateRR
