import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { FaPlay } from 'react-icons/fa'
import { MdReplay10 } from 'react-icons/md'
import { MdForward10 } from 'react-icons/md'
import { MdOutlineFullscreen } from 'react-icons/md'
import { MdVolumeUp } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import { VscError } from 'react-icons/vsc'
import { RxCheckCircled } from 'react-icons/rx'
import { MdPause } from 'react-icons/md'
import { MdVolumeOff } from 'react-icons/md'
import { FcNext } from 'react-icons/fc'
import Incidents from "./Incidents";
import Navbar from "./Navbar";


function Reviewer() {

  const [duration, setDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState();
  const [timer, setTimer] = useState("00:00:00");
  const [playWebcam, setPlayWebcam] = useState(false);
  const [playScreenshare, setPlayScreenshare] = useState(false);
  const [mute, setMute] = useState(false);
  const [active, setActive] = useState(false);
  const [playBackText, setplayBackText] = useState("1x");
  const [seekTime, setSeekTime] = useState(0);
  const [incidentRaise, setIncidentRaise] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [showReviewerPage, setShowReviewerPage] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showScreenshare, setShowScreenshare] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const [showNoVideos, setShowNoVideos] = useState(false);
  const [Incis, setIncis] = useState([])
  const [sortIncis, setSortIncis] = useState([])

  const [examData, setExamData] = useState({
    Streams: {
      webcam: "",
      screenshare: "",
      mobilecam: ""
    }
  });

  const { id } = useParams()
  const navigate = useNavigate()
  const reviewSession = useRef(null);
  const webcamRef = useRef(null);
  const screenshareRef = useRef(null);
  const inputRef = useRef(null);
  const rewindRef = useRef(null);
  const forwardRef = useRef(null);
  const speedRef = useRef(null);
  const muteUnmuteRef = useRef(null);
  const finalCommentRef = useRef(null);

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
      if (document.activeElement === inputRef.current) {
        e.stopPropagation
      }
      else if (document.activeElement === rewindRef.current) {
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
      else if (document.activeElement === finalCommentRef.current) {
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

  const handleIncidentInput = (e) => {
    setIncidentRaise(e.target.value)
  }

  function createRandomSno(previousIDs) {
    let createID;
    do {
      createID = Math.floor(Math.random() * 10 * 80);
    } while (previousIDs.includes(createID));

    return createID;
  }

  const addIncident = (e) => {
    e.preventDefault()
    let duration
    let currentTime

    if (webcamRef.current) {
      duration = webcamRef.current.duration;
      currentTime = webcamRef.current.currentTime;
    } else if (screenshareRef.current) {
      duration = screenshareRef.current.duration;
      currentTime = screenshareRef.current.currentTime;
    }

    const currentTimeRound = Math.floor(currentTime);
    const progresspercent = (currentTime / duration) * 100;
    let dateObj = new Date(currentTimeRound * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();
    let timeString = hours.toString().padStart(2, '0')
      + ':' + minutes.toString().padStart(2, '0')
      + ':' + seconds.toString().padStart(2, '0');

    let dateObj2 = new Date((currentTimeRound - 30) * 1000);
    let hours2 = dateObj2.getUTCHours();
    let minutes2 = dateObj2.getUTCMinutes();
    let seconds2 = dateObj2.getSeconds();
    let timeString2 = hours2.toString().padStart(2, '0')
      + ':' + minutes2.toString().padStart(2, '0')
      + ':' + seconds2.toString().padStart(2, '0');


    let defaultTime = new Date(0 * 1000);
    let dafaultHours = defaultTime.getUTCHours();
    let dafaultMinutes = defaultTime.getUTCMinutes();
    let defaultSeconds = defaultTime.getSeconds();
    let defaultTimeString = dafaultHours.toString().padStart(2, '0')
      + ':' + dafaultMinutes.toString().padStart(2, '0')
      + ':' + defaultSeconds.toString().padStart(2, '0');

    let sno = createRandomSno(studentData.incidents)

    let myIncis = {
      dateObj: progresspercent,
      sno: sno,
      time: timeString,
      name: incidentRaise,
      time2: currentTimeRound > 30 ? timeString2 : defaultTimeString
    }

    fetch(`http://localhost:8004/addincident/${examData.AdminSessionId}/${studentData.studentSessionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ myIncis }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIncis([...Incis, myIncis]);
        setIncidentRaise("")
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
    setSortIncis(Incis)
  }, [Incis])

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

  const [flagColor, setFlagColor] = useState("")
  const [finalComment, setFinalComment] = useState("")

  const handleFinalCommentChange = (e) => {
    e.preventDefault();
    setFinalComment(e.target.value)
  }

  function removeNewLines(event) {
    var clipboardData = event.clipboardData;
    var pastedText = clipboardData.getData('text/plain');
    var modifiedText = pastedText.replace(/\r?\n/g, '');
    event.preventDefault();
    var textarea = document.getElementById('final_comment');
    var startPos = textarea.selectionStart;
    var endPos = textarea.selectionEnd;
    setFinalComment(finalComment.substring(0, startPos) + modifiedText + finalComment.substring(endPos))
    var newCursorPos = startPos + modifiedText.length;
    textarea.setSelectionRange(newCursorPos, newCursorPos);
  }

  const tab_names = document.getElementsByClassName("color_container")
  const handleTabChange = (tabname) => {
    for (let i = 0; i < tab_names.length; i++) {
      if (tab_names[i].classList.value.includes("green_color")) {
        tab_names[i].classList.remove("green_border")
      }
      if (tab_names[i].classList.value.includes("amber_color")) {
        tab_names[i].classList.remove("amber_border")
      }
      if (tab_names[i].classList.value.includes("red_color")) {
        tab_names[i].classList.remove("red_border")
      }
    }
    const tabNameClassList = document.querySelector(`.${tabname}`).classList
    if (tabNameClassList.value.includes("green_color")) {
      tabNameClassList.add("green_border")
      setFlagColor("Green")
    }
    if (tabNameClassList.value.includes("amber_color")) {
      tabNameClassList.add("amber_border")
      setFlagColor("Amber")
    }
    if (tabNameClassList.value.includes("red_color")) {
      tabNameClassList.add("red_border")
      setFlagColor("Red")
    }
  }

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8004/examid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentID: id }),
      })
        .then((response) => response.json())
        .then((data) => {
          setShowReviewerPage(true)
          if (data.data[1].Streams.mobilecam === "true") {
            setShowMobile(true)
          }
          if (data.data[1].Streams.screenshare === "true") {
            setShowScreenshare(true)
          }
          if (data.data[1].Streams.webcam === "true") {
            setShowWebcam(true)
          }
          setExamData(data.data[1])
          let newStudents = data.data[0].Students.map((e) => {
            if (e.startTime) {
              let hours = new Date(e.startTime).getHours()
              let minutes = new Date(e.startTime).getMinutes()
              let seconds = new Date(e.startTime).getSeconds()
              let date = new Date(e.startTime).getDate()
              let month = new Date(e.startTime).getMonth()
              let Year = new Date(e.startTime).getFullYear()
              let startTimeString = `${month + 1}/${date}/${Year} ${hours}:${minutes}`

              return {
                ...e,
                startTime: startTimeString,
              }

            } else {
              return { ...e }
            }
          })
          setStudentData(newStudents[0]);
          setIncis(newStudents[0].incidents)
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
              console.log("Error:");
            });
        })
        .catch((err) => { console.log(err) })
    } else {
      fetch(`http://localhost:8004/fetchdata`)
        .then((response) => response.json())
        .then((data) => {
          let array = data.data.map((e) => {
            let newArray = []
            e.Students.forEach(element => {
              if (element.reviewStatus === "In Review") {
                newArray.push(element)
              }
            });
            return newArray
          })
          let flatArray = array.flatMap((arr) => arr)
          if (flatArray.length > 0) {
            setShowReviewerPage(true)
          } else {
            setShowNoVideos(true)
          }
          let newStudents = flatArray.map((e) => {
            if (e.startTime) {
              let hours = new Date(e.startTime).getHours()
              let minutes = new Date(e.startTime).getMinutes()
              let seconds = new Date(e.startTime).getSeconds()
              let date = new Date(e.startTime).getDate()
              let month = new Date(e.startTime).getMonth()
              let Year = new Date(e.startTime).getFullYear()
              let startTimeString = `${month + 1} ${date} ${Year} ${hours}:${minutes}`

              return {
                ...e,
                startTime: startTimeString,
              }

            } else {
              return { ...e }
            }
          })
          setStudentData(newStudents[0])
          setIncis(newStudents[0].incidents)
          if (flatArray.length > 0) {
            fetch(`http://localhost:8004/examid`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ studentID: flatArray[0].studentSessionId }),
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
                setExamData(data.data[1]);
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
                    console.log("Error:");
                  });
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }

  }, [])

  useEffect(() => {
    if (showReviewerPage && studentData.endTime === "") {
      reviewSession.current.disabled = true
    }
  }, [showReviewerPage])


  const handleSubmitSession = () => {
    if (id) {
      const flaggingStatusData = {
        flagColor: flagColor,
        finalComment: finalComment
      }
      let reviewStatus = "Reviewed"
      fetch('http://localhost:8004/resetreview', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, mainID: examData._id, reviewStatus, resetStatus: flaggingStatusData }),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate(`/backoffice/session/${id}`)
        })
        .catch((e) => { console.log(e) })
    } else {
      const flaggingStatusData = {
        flagColor: flagColor,
        finalComment: finalComment
      }
      let reviewStatus = "Reviewed"
      fetch('http://localhost:8004/resetreview', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: studentData.studentSessionId, mainID: examData._id, reviewStatus, resetStatus: flaggingStatusData }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.location.reload()
        })
        .catch((e) => { console.log(e) })
    }
  }

  const handleCancelSubmitSession = () => {
    setFlagColor("")
    setFinalComment("")
    for (let i = 0; i < tab_names.length; i++) {
      tab_names[i].classList.remove("green_border")
      tab_names[i].classList.remove("amber_border")
      tab_names[i].classList.remove("red_border")
    }
  }

  return (
    <>
      <Navbar />
      {showReviewerPage && <div className="reviewer-content">
        <div className="review-upper d-flex">
          <div className=" upper-content-left">
            <div className="big-streams">
              {showScreenshare && <div onClick={examData.Title !== "Classroom" ? handleScreenChange : null} className="screenshare" id="screenshare">
                <video className="screen" onTimeUpdate={handleProgress} onLoadedMetadata={handleProgress} ref={screenshareRef} width="100%" ></video>
              </div>}
              <div className="small-streams">
                {showWebcam && <div onClick={handleWebcamChange} className="webcam" id="webcam">
                  <video className="web" onTimeUpdate={handleProgress} onLoadedMetadata={handleProgress} ref={webcamRef} width="100%" muted={mute}></video>
                </div>}
                {showMobile && <div onClick={handleMobileChange} className="mobile" id="mobile">
                  <video className="mob" width="100%" ></video>
                </div>}
              </div>
            </div>
            <div className="controls d-flex justify-content-between align-items-end">
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
              <div className="controllers-2">
                <label className="start-timer" htmlFor="">{timer}</label>
                <div id="timeBubble" className="time-bubble">00:00</div>
                <label className="end-timer" htmlFor="00:00:17">{totalDuration}</label>
                <input onChange={changeDuration} className="range" type="range" value={duration} name="" id="" max={100} title={duration} />
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
          <div className="upper-content-right">
            <div className="right-reviewer-content">
              <div className="RAG-status">
                <div>
                  <button style={{ 'float': 'right' }} className="RAG d-flex">
                    <div style={{ 'backgroundColor': '#e09d39' }} className="inner-btn-part d-flex align-items-center"><FaSignOutAlt size={40} /></div>
                    <h5>Cancel and exit</h5>
                  </button>
                </div>
                <div className="lower-btn" style={{ 'clear': 'both' }}>
                  <button className="RAG d-flex">
                    <div style={{ 'backgroundColor': '#EC0000' }} className="inner-btn-part d-flex align-items-center"><VscError size={40} /></div>
                    <h5>Mark as Unreviewable</h5>
                  </button>
                  <button ref={reviewSession} className="RAG d-flex" data-bs-toggle="modal" data-bs-target="#flag_modal">
                    <div style={{ 'backgroundColor': '#009E3A' }} className="inner-btn-part d-flex align-items-center"><RxCheckCircled size={40} /></div>
                    <h5>Review</h5>
                  </button>
                  <div className="modal fade" id="flag_modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Please sum up this exam:</h1>
                        </div>
                        <div className="modal-body">
                          <div className="GAR d-flex align-items-start">
                            <div className="green_flag">
                              <span onClick={() => handleTabChange("green_color")} className="color_container green_color">
                                ✓
                              </span>
                              <p>No suspicious behaviour detected</p>
                            </div>
                            <div className="green_flag">
                              <span onClick={() => handleTabChange("amber_color")} className="color_container amber_color">
                                ?
                              </span>
                              <p>Exam is doubtful or slightly suspicious</p>
                            </div>
                            <div className="green_flag">
                              <span onClick={() => handleTabChange("red_color")} className="color_container red_color">
                                X
                              </span>
                              <p>Exam is suspicious</p>
                            </div>
                          </div>
                          <textarea onPaste={(e) => removeNewLines(e)} value={finalComment} onChange={handleFinalCommentChange} ref={finalCommentRef} name="flagging" placeholder="Write a commentary summarising the review" id="final_comment" rows="4"></textarea>
                        </div>
                        <div className="modal-footer">
                          <button onClick={handleCancelSubmitSession} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button onClick={handleSubmitSession} type="button" className="btn btn-primary">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="visited-page">
                <h2>Visited Pages</h2>
                <div className="visited-page-content">
                  <p>There are no visited pages available for this session</p>
                </div>
              </div>
              <div className="raise-incident">
                <form onSubmit={addIncident}>
                  <div className="d-flex">
                    <input ref={inputRef} value={incidentRaise} onChange={handleIncidentInput} type="text" style={{ 'display': 'inline-block', 'width': '22vw', 'borderTopRightRadius': '0', 'borderBottomRightRadius': '0' }}
                      placeholder="Please insert a comment" />
                    <button type="submit" className="push-incident"><img src="https://demo.proctorexam.com/img/next.png" /></button>
                  </div>
                </form>
                <input type="text" disabled style={{ 'width': '100%' }} placeholder="Last comment entered" />
              </div>
            </div>
          </div>
        </div>
        <div className="review-lower">
          <div className="lower-content d-flex">
            <div className="lower-left">
              <p>
                <span>
                  <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Student Ref.: </strong>
                  <span style={{ 'display': 'inline-block' }}>{examData.AdminSessionId + "00" + studentData.studentSessionId}</span>
                </span>
              </p>
              <p>
                <span>
                  <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Institute Name:</strong>
                  <span style={{ 'display': 'inline-block' }}>EnFuse Demo 1</span>
                </span>
              </p>
              <p>
                <span>
                  <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Exam Name:</strong>
                  <span style={{ 'display': 'inline-block' }}>{examData.ExamName}</span>
                </span>
              </p>
              <p>
                <span>
                  <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Exam Start Time:</strong>
                  <span style={{ 'display': 'inline-block' }}>{studentData.startTime === "" ? "-" : studentData.startTime}</span>
                </span>
              </p>
              <p>
                <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Streams:</strong>
                <span className="stream-available" style={{ 'display': 'inline-flex' }}>
                  <span className={examData.Streams.screenshare === "true" ? "stream available" : "stream"}>Screen</span>
                  <span className={examData.Streams.webcam === "true" ? "stream available" : "stream"}>Webcam</span>
                  <span className={examData.Streams.mobilecam === "true" ? "stream available" : "stream"}>Mobile</span>
                </span>
              </p>
              <p>
                <strong style={{ 'display': 'inline-block', 'marginRight': '5px' }}>Instructions:</strong>
              </p>
              <div className="instruction-box">
                <p>Student <strong className={examData.Internet === "Yes" ? "may_use" : "may_not_use"}> {examData.Internet === "Yes" ? "may use" : "may not use"}</strong> the internet to visit websites</p>
                <p>Student <strong className={examData.Application === "Yes" ? "may_use" : "may_not_use"}> {examData.Application === "Yes" ? "may use" : "may not use"}</strong> any external applications</p>
                <p>Student <strong className={examData.Textbook === "Yes" ? "may_use" : "may_not_use"}> {examData.Textbook === "Yes" ? "may use" : "may not use"}</strong> textbooks</p>
                <p>Student <strong className={examData.Calculator === "Yes" ? "may_use" : "may_not_use"}> {examData.Calculator === "Yes" ? "may use" : "may not use"}</strong> a calculator</p>
                <p>Student <strong className={examData.PenPaper === "Yes" ? "may_use" : "may_not_use"}> {examData.PenPaper === "Yes" ? "may use" : "may not use"}</strong> pen and paper</p>
                <br />
                <p>Test</p>
              </div>
            </div>
            <div className="lower-right">
              <h2>Comments</h2>
              <div className="inserted-comments d-flex flex-column" id="inserted">
                {sortIncis.map((e, index) => {
                  return <Incidents index={index} Incis={e} key={index} handleDelInci={handleDelInci} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>}
      {showNoVideos &&
        <div>No videos</div>}
    </>
  );
}

export default Reviewer;
