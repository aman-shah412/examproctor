import React, { useState, useRef, useEffect } from 'react'
import { FaVideo, FaUserAlt, FaCheckCircle, FaRegClock } from "react-icons/fa"
import CandidateExamStarted from './CandidateExamStarted';
import CandidateExamSubmitted from './CandidateExamSubmitted';

function CandidateClassRoom({ name, id }) {
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);
  const [beforeStartExam, setBeforeStartExam] = useState(false);
  const [afterStartExam, setAfterStartExam] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [screenMedia, setScreenMedia] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [adminData, setAdminData] = useState("");
  const [individualCandidateData, setIndividualCandidateData] = useState();
  const [timerString, setTimerString] = useState("");
  const tempScreenMedia = useRef(null)
  const screenRecorder = useRef(null)
  let recordingnum = 1
  let sChunks = []
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
      if (screenRecorder.current) {
        if (screenRecorder.current.state === "recording") {
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
    setStep2(false)
    setStep3(true)
  }

  const record = async () => {
    localStorage.setItem("recordingnum", JSON.stringify(recordingnum))
    const screenRecorderInstance = new MediaRecorder(tempScreenMedia.current);

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

    screenRecorderInstance.start();
    console.log("started");
    screenRecorder.current = screenRecorderInstance
  }


  const handleStartRecording = () => {
    if (!JSON.parse(localStorage.getItem("recordingnum"))) {
      record()
    }
    setStep3(false)
    setStep4(true)
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

      Promise.all([stopScreenRecording]).then(() => {
      });
    }
  };

  return (
    <>
      {beforeStartExam && <div style={step4 ? { backgroundColor: "white" } : { backgroundColor: "black" }} className='candidate-page d-flex flex-column'>
        {beforeStartExam && <h1>Hello {name}</h1>}
        {step1 && <>
          <p>Please Share your screen</p>
          <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step2}>Share screen</button>
        </>}
        {step2 && <>
          <p>Please click on hide after sharing screen</p>
          <button className='buttons btn1 btn btn-primary' onClick={nextStep_Step3}>Next Step</button>
        </>}
        {step3 && <div className='candidate-content'>
          <h5>Everything after this point is recorded</h5>
          <div className='d-flex mt-3'>
            <FaVideo size={30} />
            <p className='ms-3'>Everything after this point is recorded</p>
          </div>
          <div className='d-flex justify-content-end'>
            <button className='buttons btn1 btn btn-primary' onClick={handleStartRecording}>OK</button>
          </div>
        </div>}
        {step4 && <>
          <h2>DONE!</h2>
          <h3>Before you proceed:</h3>
          <div className='d-flex mt-5'>
            <div className='d-flex align-items-center'>
              <FaCheckCircle size={60} color='rgb(80 181 123)' />
              <p className='ms-4 mb-0'>If you are ready click start.</p>
            </div>
          </div>
          <div className='mt-3'>
            <button className='buttons btn1 btn btn-primary' onClick={startExam}>Start Exam</button>
          </div>
        </>}
      </div>}
      {afterStartExam && <CandidateExamStarted individualCandidateData={individualCandidateData} timerString={timerString} runBackwardTimer={runBackwardTimer} adminData={adminData} id={id} stopRecording={stopRecording} />
      }
      {examSubmitted && <CandidateExamSubmitted />}
    </>
  )
}

export default CandidateClassRoom