import React, { useState, useContext, useEffect } from 'react'
import { FaPlus, FaCalendarAlt, FaMinusCircle, FaArchive, FaTimesCircle, FaCheckCircle, FaRegQuestionCircle, FaSlidersH, FaPlusCircle } from 'react-icons/fa'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import Step2 from './Step2'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Context from "../Context/Context"


function Admin() {

  const [hideOpenExam, setHideOpenExam] = useState(true);
  const [hideDraftExam, setHideDraftExam] = useState(true);
  const [hideClosedExam, setHideClosedExam] = useState(true);
  const [Exams, setExams] = useState([]);
  const [title, setTitle] = useState({
    name: name,
  });
  const [streams, setStreams] = useState({
    webcam: "",
    screenshare: "",
    mobilecam: ""
  });
  const [hideMobileCam, setHideMobileCam] = useState(true);

  const { newExam, setNewExam, step2, setStep2, step3, setStep3, step4, setStep4, step5, setStep5 } = useContext(Context)

  useEffect(() => {
    fetch("http://localhost:8004/fetchdata")
      .then((res) => res.json())
      .then((data) => {
        setExams(data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const handleHideOpenExam = () => {
    setHideOpenExam((e) => !e);
  }
  const handleHideDraftExam = () => {
    setHideDraftExam((e) => !e);
  }
  const handleHideClosedExam = () => {
    setHideClosedExam((e) => !e);
  }
  const handleNewClassroomExam = () => {
    setNewExam((e) => !e);
    setTitle({ name: 'Classroom' });
    setStreams({
      webcam: "false",
      screenshare: "true",
      mobilecam: "false"
    })
    setHideMobileCam(false)
  }
  const handleNewRecordedExam = () => {
    setNewExam(false);
    setTitle({ name: 'Record & Review' });
    setStreams({
      webcam: "true",
      screenshare: "true",
      mobilecam: "false"
    })
  }
  const handleNewLiveExam = () => {
    setNewExam(false);
    setTitle({ name: 'Live Proctoring' });
    setStreams({
      webcam: "true",
      screenshare: "true",
      mobilecam: "false"
    })
  }


  const handleCreateNewExam = () => {
    window.location.reload()
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
                      return <Link key={index} to={`/Admin/exams/${e.AdminSessionId}`} style={{ 'textDecoration': 'none', 'color': 'rgb(55, 71, 96)' }}>
                        <div className='admin_exam_name' >
                          <span> <b> 10/12</b></span>
                          <span> {e.ExamName} </span>
                        </div>
                      </Link>
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
          {newExam ? <>
            <div className="main-content p-4 center-side" style={{ 'width': '70%', minWidth: "40rem" }}>
              <div className="d-flex align-items-center justify-content-between" style={{ 'height': '100%' }}>
                <div className="exam-creation">
                  <h5>Classroom</h5>
                  <div className='d-flex my-3 align-items-center justify-content-between'>Live Proctoring <FaTimesCircle size={25} style={{ 'color': 'darkred', 'opacity': '0.7' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Web Camera <FaTimesCircle size={25} style={{ 'color': 'darkred', 'opacity': '0.7' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Mobile Camera <FaTimesCircle size={25} style={{ 'color': 'darkred', 'opacity': '0.7' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Screen Sharing <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-4  align-items-center justify-content-center' ><button onClick={handleNewClassroomExam} style={{ 'width': '14rem', 'border': 'none', 'height': '2.5rem', 'backgroundColor': 'gainsboro' }}>Select</button></div>
                </div>
                <div className="exam-creation">
                  <h5>Record & Review</h5>
                  <div className='d-flex my-3 align-items-center justify-content-between'>Live Proctoring <FaTimesCircle size={25} style={{ 'color': 'darkred', 'opacity': '0.7' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Web Camera <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Mobile Camera (optional) <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Screen Sharing <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-4  align-items-center justify-content-center' ><button onClick={handleNewRecordedExam} style={{ 'width': '14rem', 'border': 'none', 'height': '2.5rem', 'backgroundColor': 'gainsboro' }}>Select</button></div>
                </div>
                <div className="exam-creation">
                  <h5>Live Proctoring</h5>
                  <div className='d-flex my-3 align-items-center justify-content-between'>Live Proctoring <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Web Camera <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Mobile Camera (optional)  <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-3  align-items-center justify-content-between'>Screen Sharing <FaCheckCircle size={25} style={{ 'color': '#6cb98d' }} /></div>
                  <div className='d-flex my-4  align-items-center justify-content-center' ><button onClick={handleNewLiveExam} style={{ 'width': '14rem', 'border': 'none', 'height': '2.5rem', 'backgroundColor': 'gainsboro' }}>Select</button></div>
                </div>
              </div>
            </div>

            <div className="main-content p-4 right-side" style={{ 'width': '21rem' }}>
              <h6>Step 1 - Exam Type</h6>
              <div className="info-content my-5 d-flex align-items-center justify-content-between flex-column" style={{ 'height': '90%' }}>
                <div className="info">
                  <FaRegQuestionCircle size={60} style={{ 'color': 'red' }} />
                </div>
                <div className="info text-center">
                  <FaSlidersH size={40} color={'#555'} />
                  <p>Some exams require only screensharing others may need a live proctor, choose accordingly.</p>
                </div>
                <div className="info d-flex justify-content-between" style={{ 'width': '100%' }}>
                  <div className='bar' >
                    <div className='bar2' ></div>
                  </div>
                  <span style={{ 'fontSize': '13px' }}> <b> 1 of 5</b></span>
                </div>
              </div>
            </div>
          </> : <Step2 title={title} setStreams={setStreams} streams={streams} hideMobileCam={hideMobileCam} setNewExam={setNewExam} />}
        </div>
      </div>
    </>
  )
}

export default Admin