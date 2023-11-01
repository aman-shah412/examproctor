import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import { MdPause } from 'react-icons/md'
import { MdReplay10 } from 'react-icons/md'
import { MdForward10 } from 'react-icons/md'
import { MdOutlineFullscreen } from 'react-icons/md'
import { MdVolumeUp } from 'react-icons/md'
import { MdVolumeOff } from 'react-icons/md'
import { ImLink } from 'react-icons/im'
import { FiFolder } from 'react-icons/fi'
import Incidents from './Incidents'

function Sessions() {

  const { id } = useParams();
  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState();
  const [timer, setTimer] = useState("00:00:00");
  const [playWebcam, setPlayWebcam] = useState(false);
  const [playScreenshare, setPlayScreenshare] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showScreenshare, setShowScreenshare] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [mute, setMute] = useState(false);
  const [active, setActive] = useState(false);
  const [playBackText, setplayBackText] = useState("1x");
  const [seekTime, setSeekTime] = useState(0);
  const [studentData, setStudentData] = useState([]);
  const [examData, setExamData] = useState({
    Streams: {
      webcam: "",
      screenshare: "",
      mobilecam: ""
    }
  });
  const [storageResetReview, setStorageResetReview] = useState("Review Session")
  const [showFlagColor, setShowFlagColor] = useState(false);

  const navigate = useNavigate()
  const webcamRef = useRef(null);
  const screenshareRef = useRef(null);
  const rewindRef = useRef(null);
  const forwardRef = useRef(null);
  const speedRef = useRef(null);
  const muteUnmuteRef = useRef(null);
  const facePhoto = useRef(null);
  const idPhoto = useRef(null);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const [flaggingStatus, setFlaggingStatus] = useState(null)

  const playBack1 = () => {
    if (webcamRef.current) {
      webcamRef.current.playbackRate = 1
      screenshareRef.current.playbackRate = 1
      setplayBackText("1x")
      setActive(false)
    } else if (screenshareRef.current) {
      screenshareRef.current.playbackRate = 1
      setplayBackText("1x")
      setActive(false)
    }
  }

  const playBack2 = () => {
    if (webcamRef.current) {
      webcamRef.current.playbackRate = 2
      screenshareRef.current.playbackRate = 2
      setplayBackText("2x")
      setActive(true)
    } else if (screenshareRef.current) {
      screenshareRef.current.playbackRate = 2
      setplayBackText("2x")
      setActive(true)
    }
  }

  const playBack4 = () => {
    if (webcamRef.current) {
      webcamRef.current.playbackRate = 4
      screenshareRef.current.playbackRate = 4
      setplayBackText("4x")
      setActive(true)
    } else if (screenshareRef.current) {
      screenshareRef.current.playbackRate = 4
      setplayBackText("4x")
      setActive(true)
    }
  }

  const playBack6 = () => {
    if (webcamRef.current) {
      webcamRef.current.playbackRate = 6
      screenshareRef.current.playbackRate = 6
      setplayBackText("6x")
      setActive(true)
    } else if (screenshareRef.current) {
      screenshareRef.current.playbackRate = 6
      setplayBackText("6x")
      setActive(true)
    }
  }

  const playBack8 = () => {
    if (webcamRef.current) {
      webcamRef.current.playbackRate = 8
      screenshareRef.current.playbackRate = 8
      setplayBackText("8x")
      setActive(true)
    } else if (screenshareRef.current) {
      screenshareRef.current.playbackRate = 8
      setplayBackText("8x")
      setActive(true)
    }
  }



  const handleProgress = () => {
    if (webcamRef.current) {
      const duration = webcamRef.current.duration;
      const currentTime = webcamRef.current.currentTime;
      const progresspercent = (currentTime / duration) * 100;
      const durationRound = Math.floor(duration);
      const currentTimeRound = Math.floor(currentTime)
      // this will set the running timer in hh:mm:ss format
      let dateObj = new Date(currentTimeRound * 1000);
      let hours = dateObj.getUTCHours();
      let minutes = dateObj.getUTCMinutes();
      let seconds = dateObj.getSeconds();
      let timeString = hours.toString().padStart(2, '0')
        + ':' + minutes.toString().padStart(2, '0')
        + ':' + seconds.toString().padStart(2, '0');
      // this will set the total duration of video in hh:mm:ss format      
      let dateObj1 = new Date(durationRound * 1000);
      let hours1 = dateObj1.getUTCHours();
      let minutes1 = dateObj1.getUTCMinutes();
      let seconds1 = dateObj1.getSeconds();
      let timeString1 = hours1.toString().padStart(2, '0')
        + ':' + minutes1.toString().padStart(2, '0')
        + ':' + seconds1.toString().padStart(2, '0');
      setDuration(progresspercent);
      setTimer(timeString)
      setTotalDuration(timeString1)
    } else if (screenshareRef.current) {
      const duration2 = screenshareRef.current.duration;
      const currentTime2 = screenshareRef.current.currentTime;
      const progresspercent2 = (currentTime2 / duration2) * 100;
      const durationRound2 = Math.floor(duration2);
      const currentTimeRound2 = Math.floor(currentTime2)
      // this will set the running timer in hh:mm:ss format
      let dateObj2 = new Date(currentTimeRound2 * 1000);
      let hours2 = dateObj2.getUTCHours();
      let minutes2 = dateObj2.getUTCMinutes();
      let seconds2 = dateObj2.getSeconds();
      let timeString2 = hours2.toString().padStart(2, '0')
        + ':' + minutes2.toString().padStart(2, '0')
        + ':' + seconds2.toString().padStart(2, '0');
      // this will set the total duration of video in hh:mm:ss format      
      let dateObj3 = new Date(durationRound2 * 1000);
      let hours3 = dateObj3.getUTCHours();
      let minutes3 = dateObj3.getUTCMinutes();
      let seconds3 = dateObj3.getSeconds();
      let timeString3 = hours3.toString().padStart(2, '0')
        + ':' + minutes3.toString().padStart(2, '0')
        + ':' + seconds3.toString().padStart(2, '0');
      setDuration(progresspercent2);
      setTimer(timeString2)
      setTotalDuration(timeString3)
    }
  };

  window.addEventListener("keypress", function playPause(e) {
    if (e.keyCode == 32) {
      if (document.activeElement === rewindRef.current) {
        e.stopPropagation
      }
      else if (document.activeElement === forwardRef.current) {
        e.stopPropagation
      }
      else if (document.activeElement === speedRef.current) {
        e.stopPropagation
      }
      else if (document.activeElement === muteUnmuteRef.current) {
        e.stopPropagation
      }
      else {
        e.preventDefault()
        handlePlayVideo()
      }
    }
  })

  const handlePlayVideo = () => {
    if (webcamRef.current) {
      playWebcam ? webcamRef.current.pause() : webcamRef.current.play();
      webcamRef.current.onplaying = () => {
        setPlayWebcam(true)
      };

      webcamRef.current.onpause = () => {
        setPlayWebcam(false)
      };
    }

    if (screenshareRef.current) {
      playScreenshare ? screenshareRef.current.pause() : screenshareRef.current.play();
      screenshareRef.current.onplaying = () => {
        setPlayScreenshare(true)
      };

      screenshareRef.current.onpause = () => {
        setPlayScreenshare(false)
      };
    }
  }

  const changeDuration = (e) => {
    if (webcamRef.current) {
      setSeekTime(e.target.value);
      const webPosition = webcamRef.current.duration * (seekTime / 100)
      const screenPosition = webcamRef.current.duration * (seekTime / 100)
      webcamRef.current.currentTime = webPosition
      screenshareRef.current.currentTime = screenPosition
    } else if (screenshareRef.current) {
      setSeekTime(e.target.value);
      const screenPosition = screenshareRef.current.duration * (seekTime / 100)
      screenshareRef.current.currentTime = screenPosition
    }
  };

  const handleRewind = (e) => {
    if (webcamRef.current) {
      const webPosition = webcamRef.current.duration * (duration / 100) - 15;
      const screenPosition = webcamRef.current.duration * (duration / 100) - 15;
      webcamRef.current.currentTime = webPosition
      screenshareRef.current.currentTime = screenPosition
    } else if (screenshareRef.current) {
      const screenPosition = screenshareRef.current.duration * (duration / 100) - 15;
      screenshareRef.current.currentTime = screenPosition
    }
  }

  const handleForward = (e) => {
    if (webcamRef.current) {
      const webPosition = webcamRef.current.duration * (duration / 100) + 15;
      const screenPosition = webcamRef.current.duration * (duration / 100) + 15;
      webcamRef.current.currentTime = webPosition
      screenshareRef.current.currentTime = screenPosition
    } else if (screenshareRef.current) {
      const screenPosition = screenshareRef.current.duration * (duration / 100) + 15;
      screenshareRef.current.currentTime = screenPosition
    }

  }

  const changemute = (e) => {
    setMute((e) => !e);
  };

  const handleScreenChange = () => {
    let screen = document.getElementById("screenshare")
    let mob = document.getElementById("mobile")
    let web = document.getElementById("webcam")
    if (examData.Streams.mobilecam === "ture") {
      if (screen.firstElementChild.classList.contains("mob") && mob.firstElementChild.classList.contains("screen")) {
        screen.appendChild(mob.firstElementChild)
        mob.appendChild(screen.firstElementChild)
      }
      if (screen.firstElementChild.classList.contains("web") && web.firstElementChild.classList.contains("screen")) {
        web.appendChild(screen.firstElementChild)
        screen.appendChild(web.firstElementChild)
      }
      if (web.firstElementChild.classList.contains("screen") && screen.firstElementChild.classList.contains("mob")) {
        web.appendChild(screen.firstElementChild)
        screen.appendChild(web.firstElementChild)
      }
      if (mob.firstElementChild.classList.contains("screen") && screen.firstElementChild.classList.contains("web")) {
        mob.appendChild(screen.firstElementChild)
        screen.appendChild(mob.firstElementChild)
      }
    } else {
      if (screen.firstElementChild.classList.contains("web") && web.firstElementChild.classList.contains("screen")) {
        web.appendChild(screen.firstElementChild)
        screen.appendChild(web.firstElementChild)
      }
    }
  }


  const handleWebcamChange = () => {
    let screen = document.getElementById("screenshare")
    let mob = document.getElementById("mobile")
    let web = document.getElementById("webcam")

    if (examData.Streams.mobilecam === "ture") {
      if (web.firstElementChild.classList.contains("web")) {
        web.appendChild(screen.firstElementChild)
        screen.appendChild(web.firstElementChild)
      }

      if (mob.firstElementChild.classList.contains("web")) {
        mob.appendChild(screen.firstElementChild)
        screen.appendChild(mob.firstElementChild)
      }
    } else {
      if (web.firstElementChild.classList.contains("web")) {
        web.appendChild(screen.firstElementChild)
        screen.appendChild(web.firstElementChild)
      }
    }
  }


  const handleMobileChange = () => {
    let screen = document.getElementById("screenshare")
    let web = document.getElementById("webcam")
    let mob = document.getElementById("mobile")
    if (mob.firstElementChild.classList.contains("mob")) {
      screen.appendChild(mob.firstElementChild)
      mob.appendChild(screen.firstElementChild)
    }
    if (web.firstElementChild.classList.contains("mob")) {
      web.appendChild(screen.firstElementChild)
      screen.appendChild(web.firstElementChild)
    }
  }

  const [Incis, setIncis] = useState([])

  let InitFlag
  useEffect(() => {
    const reviewSession = document.getElementById("reviewSession")

    fetch(`http://localhost:8004/examid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentID: id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data[1].Streams.mobilecam === "true") {
          setShowMobile(true)
        }
        if (data.data[1].Streams.screenshare === "true") {
          setShowScreenshare(true)
        }
        if (data.data[1].Streams.webcam === "true") {
          setShowWebcam(true)
        }
        if (data.data[0].Students[0].flagColor !== "") {
          setShowFlagColor(true)
        }
        if (data.data[0].Students[0].reviewStatus === "Reviewed" || data.data[0].Students[0].reviewStatus === "Not Reviewed") {
          setStorageResetReview("Review Session")
        } else if (data.data[0].Students[0].reviewStatus === "In Review") {
          setStorageResetReview("Reset Review Session")
        }
        InitFlag = {
          finalComment: data.data[0].Students[0].finalComment,
          flagColor: data.data[0].Students[0].flagColor
        }
        setFlaggingStatus(InitFlag)
        setExamData(data.data[1])
        let newStudents = data.data[0].Students.map((e) => {
          if (e.startTime) {
            let hours = new Date(e.startTime).getHours()
            let minutes = new Date(e.startTime).getMinutes()
            let seconds = new Date(e.startTime).getSeconds()
            let date = new Date(e.startTime).getDate()
            let Year = new Date(e.startTime).getFullYear()
            let startTimeString = `${hours}:${minutes}:${seconds}, ${monthNames[new Date(e.startTime).getMonth()]} ${date} ${Year}`

            if (e.endTime) {
              let endhours = new Date(e.endTime).getHours()
              let endminutes = new Date(e.endTime).getMinutes()
              let endseconds = new Date(e.endTime).getSeconds()
              let enddate = new Date(e.endTime).getDate()
              let endYear = new Date(e.endTime).getFullYear()
              let endTimeString = `${endhours}:${endminutes}:${endseconds}, ${monthNames[new Date(e.endTime).getMonth()]} ${enddate} ${endYear}`

              return {
                ...e,
                startTime: startTimeString,
                endTime: endTimeString
              }
            } else {
              return {
                ...e,
                startTime: startTimeString,
              }
            }
          } else {
            return { ...e }
          }
        })
        if (newStudents[0].endTime === "") {
          reviewSession.disabled = true
        } else {
          reviewSession.disabled = false
        }
        setStudentData(newStudents[0]);
        setIncis(newStudents[0].incidents)
        fetch('http://localhost:8004/fetchsavedphotos', {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: data.data[0].Students[0]._id }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.data !== null) {
              facePhoto.current.src = data.data.SelfiePhoto
              idPhoto.current.src = data.data.IDPhoto
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        fetch(`http://localhost:8004/fetchscreen/${data.data[0].Students[0]._id}`)
          .then(response => {
            if (response.ok) {
              return response.blob()
            }
          })
          .then((data) => {
            const videoURL = URL.createObjectURL(data);
            screenshareRef.current.src = videoURL
          }).catch((error) => {
            console.log("Error:");
          });
        fetch(`http://localhost:8004/fetchwebcam/${data.data[0].Students[0]._id}`)
          .then(response => {
            if (response.ok) {
              return response.blob()
            }
          })
          .then((data) => {
            if (data.type !== "text/html") {
              const videoURL = URL.createObjectURL(data);
              webcamRef.current.src = videoURL
            }
          }).catch((error) => {
            console.log("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:");
      });

    const body = document.body
    const classAtt = body.getAttribute("class")
    const styleAtt = body.getAttribute("style")
    if (classAtt !== null && styleAtt !== null) {
      body.removeAttribute("class")
      body.removeAttribute("style")
      body.lastElementChild.remove()
    }

  }, [])


  const handleDelInci = (Inci) => {
    fetch(`http://localhost:8004/deleteincident/${examData.AdminSessionId}/${studentData.studentSessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Inci }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIncis(Incis.filter((e) => {
          return e !== Inci;
        }))
      })
      .catch((err) => {
        console.log(err);
      })
  }


  useEffect(() => {
    Incis.map((e) => {
      if (e.dateObj != 0) {
        Incis.sort((a, b) => a.dateObj > b.dateObj ? 1 : -1)
      }
    })
  }, [Incis])


  const resetFlag = {
    finalComment: "",
    flagColor: ""
  }
  const [resetStatus, setResetStatus] = useState(resetFlag)

  useEffect(() => {
    const bo_main_flag = document.getElementById("bo_main_flag")
    if (flaggingStatus !== null) {

      if (flaggingStatus.flagColor === "Green") {
        bo_main_flag.classList.add("bo_green_flag")
      }
      if (flaggingStatus.flagColor === "Amber") {
        bo_main_flag.classList.add("bo_amber_flag")
      }
      if (flaggingStatus.flagColor === "Red") {
        bo_main_flag.classList.add("bo_red_flag")
      }
    }
  }, [flaggingStatus])


  const handleReviewSession = (e) => {
    let reviewStatus
    if (storageResetReview === "Reset Review Session") {
      reviewStatus = "Not Reviewed"
      fetch('http://localhost:8004/resetreview', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, mainID: examData._id, reviewStatus, resetStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          setStorageResetReview("Review Session")
          setStudentData({ ...studentData, reviewStatus: "Not Reviewed" })
          setShowFlagColor(false)
        })
        .catch((e) => { console.log(e) })
    }
    if (storageResetReview === "Review Session") {
      reviewStatus = "In Review"
      fetch('http://localhost:8004/resetreview', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, mainID: examData._id, reviewStatus, resetStatus }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate(`/reviewer/session/${id}`)
        })
        .catch((e) => { console.log(e); })
    }
  }


  return (
    <>
      <Navbar />
      <div className="admin d-flex align-items-center">
        <div className="second-navbar d-flex align-items-center" style={{ 'width': '13.5rem' }}>
          <h5>Backoffice</h5>
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
      <div className='bo_session_main d-flex justify-content-center'>
        <div className='main_content'>
          <div className="session_status">
            <div className="left_status">Student Session</div>
            <div className="right_status">
              <div>Exam Status : {studentData.reviewStatus}</div>
              {showFlagColor && <div id='bo_main_flag' className="flagging_status"></div>}
              <div className="review_session_button" >
                <button id='reviewSession' onClick={handleReviewSession} className='buttons btn2 btn btn-primary'>{storageResetReview}</button>
              </div>
            </div>
          </div>
          <div className="session_data">
            <div className="session_left_side">
              <div className="bo_player">
                <div className="bo_streams">
                  <div className="big_streams">
                    {showScreenshare && <div onClick={examData.Title !== "Classroom" ? handleScreenChange : null} className="bo_ss" id='screenshare'>
                      <video className='screen' onTimeUpdate={handleProgress} onLoadedMetadata={handleProgress} width="100%" ref={screenshareRef} height="100%"></video>
                    </div>}
                  </div>
                  <div className="small_streams">
                    {showWebcam && <div className="bo_webcam" onClick={handleWebcamChange} id="webcam">
                      <video className="web" onTimeUpdate={handleProgress} onLoadedMetadata={handleProgress} ref={webcamRef} width="100%" height="100%" muted={mute}></video>
                    </div>}
                    {showMobile && < div className="bo_mobile" onClick={handleMobileChange} id="mobile">
                      <video className="mob" width="100%" src=""></video>
                    </div>}
                  </div>
                </div>
                <div className="bo_controller">
                  <div className="controllers">
                    <button onClick={handlePlayVideo} className={playWebcam || playScreenshare ? "play-pause active" : "play-pause"}>
                      {playWebcam || playScreenshare ? <MdPause size={24} /> : <FaPlay size={12} />}
                    </button>
                    <button ref={rewindRef} onClick={handleRewind} className="play-pause">
                      <MdReplay10 size={24} />
                    </button>
                    <button ref={forwardRef} onClick={handleForward} className="play-pause">
                      <MdForward10 size={24} />
                    </button>
                  </div>
                  <div className="bo_range controllers-2">
                    <label className="start-timer" htmlFor="">{timer}</label>
                    <div id="timeBubble" className="time-bubble">00:00</div>
                    <label className="end-timer" >{totalDuration}</label>
                    <input onChange={changeDuration} value={duration} type="range" max={100} className='range2' />
                  </div>
                  <div className="controllers">
                    <div ref={speedRef} className={active ? "play-pause d-flex tool active" : "play-pause d-flex tool"} style={{ 'cursor': 'pointer' }}>
                      <strong style={{ 'fontSize': '12px' }}>{playBackText}</strong>
                      <div className="d-flex tooltiptext">
                        <button onClick={playBack1} className="play-pause">
                          <strong style={{ 'fontSize': '12px' }}>1x</strong>
                        </button>
                        <button onClick={playBack2} className="play-pause">
                          <strong style={{ 'fontSize': '12px' }}>2x</strong>
                        </button>
                        <button onClick={playBack4} className="play-pause">
                          <strong style={{ 'fontSize': '12px' }}>4x</strong>
                        </button>
                        <button onClick={playBack6} className="play-pause">
                          <strong style={{ 'fontSize': '12px' }}>6x</strong>
                        </button>
                        <button onClick={playBack8} className="play-pause">
                          <strong style={{ 'fontSize': '12px' }}>8x</strong>
                        </button>
                      </div>
                    </div>
                    <button ref={muteUnmuteRef} onClick={changemute} className="play-pause">
                      {mute ? <MdVolumeOff size={24} /> : <MdVolumeUp size={24} />}
                    </button>
                    <button className="play-pause">
                      <MdOutlineFullscreen size={24} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bo_visited-files">
                <div className="bo_visited_page">
                  <button className="visited_button d-flex align-items-center">
                    <div style={{ "padding": "10px" }} className="inner-btn-part d-flex align-items-center"><ImLink size={30} /></div>
                    <div style={{ "width": '100%', "height": "100%" }} className="d-flex align-items-center justify-content-center">
                      <p>Visited Pages</p>
                    </div>
                  </button>
                </div>
                <div className="bo_files">
                  <button disabled className="visited_button d-flex align-items-center">
                    <div style={{ "padding": "10px" }} className="inner-btn-part d-flex align-items-center">
                      <FiFolder size={30} />
                    </div>
                    <div style={{ "width": '100%', "height": "100%" }} className="d-flex align-items-center justify-content-center">
                      <p>Files</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="bo_comments_section">
                <p>Comments</p>
                <div className="bo_comments">
                  <div className="bo_inci_group">
                    {Incis.map((e, index) => {
                      return <Incidents index={index + 1} Incis={e} key={index} handleDelInci={handleDelInci} />
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="session_right_side">
              <div className="bo_photos">
                <div className="photos">
                  <div className="picture_inside">
                    <img ref={facePhoto} alt="" />
                  </div>
                  <div className="picture_title">
                    <p>Face photo</p>
                  </div>
                </div>
                <div className="photos id_photo">
                  <div className="picture_inside">
                    <img ref={idPhoto} alt="" />
                  </div>
                  <div className="picture_title">
                    <p>ID Card</p>
                  </div>
                </div>
                <div className="zoom-button">
                  <h5>Click to zoom</h5>
                </div>
              </div>
              <div className="bo_info">
                <p>Info</p>
                <div className="info_box">
                  <table>
                    <tbody>

                      <tr>
                        <td>
                          <strong>Name:</strong>
                        </td>
                        <td>{studentData.studentName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Email:</strong>
                        </td>
                        <td>{studentData.studentEmail
                        }</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Exam name:</strong>
                        </td>
                        <td>{examData.ExamName}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Start time:</strong>
                        </td>
                        <td>{studentData.startTime ? studentData.startTime : "-"}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>End time:</strong>
                        </td>
                        <td>{studentData.endTime ? studentData.endTime : "-"}</td>
                      </tr>
                      <tr>
                        <td>

                        </td>
                        <td>
                          <button className='buttons btn3 btn btn-primary'> Fix start/ end time</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Streams included:</strong>
                        </td>
                        <td>
                          <span className={examData.Streams.screenshare === "true" ? "stream available" : "stream"}>Screen</span>
                          <span className={examData.Streams.webcam === "true" ? "stream available" : "stream"}>Webcam</span>
                          <span className={examData.Streams.mobilecam === "true" ? "stream available" : "stream"}>Mobile</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bo_chat_boxes">
                <div className="chat_button">
                  <button className='tawk_button d-flex'>
                    <div style={{ 'backgroundColor': '#EC0000', width: "60px" }} className="inner-btn-part d-flex align-items-center">
                      <img src="https://demo.proctorexam.com/img/chat.svg" alt="" />
                    </div>
                    <span>Tawk Messages</span>
                  </button>
                </div>
                {examData.Title === "Live Proctoring" ? <div className="chat_button">
                  <button className='proctor_button d-flex'>
                    <div style={{ 'backgroundColor': '#1C4E98', width: "60px" }} className="inner-btn-part d-flex align-items-center">
                      <img src="https://demo.proctorexam.com/img/chat.svg" alt="" />
                    </div>
                    <span>Proctoring Messages</span>
                  </button>
                </div> : ""}
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Sessions