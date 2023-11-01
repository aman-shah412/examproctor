import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar'


function BackofficeExam() {

  const { id } = useParams();
  const [students, setStudents] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:8004/examid`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data.data.Students);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleNavigate = (e) => {
    navigate(`/backoffice/session/${e.studentSessionId}`)
  }

  return (
    <>
      <Navbar />
      <div className="admin d-flex align-items-center">
        <div className="second-navbar d-flex align-items-center" style={{ 'width': '13.5rem' }}>
          <h5>Backoffice</h5>
        </div>
        <div className="second-navbar d-flex align-items-center" style={{ 'width': '71.5%' }}>
          <Link to='/'>
            <button className='btn btn-light butn'>Home</button>
          </Link>
        </div>
        <div className="second-navbar d-flex align-items-center" style={{ 'width': '20rem', 'float': 'right' }}>
          <h6>Your institute currently has no tokens.</h6>
        </div>
      </div>
      <div className="bo_main d-flex justify-content-center">
        <div className="bo_content">
          <div className="bo_search">
            <input type="text" placeholder='Search for exams or students' />
          </div>
          <div className="bo_exams">
            <h4>Demo</h4>
            <table className='bo_table' style={{ "width": "100%" }}>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Exam status</th>
                  <th>Start time</th>
                  <th>Duration</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody className='bo_tbody'>
                {students.map((e, index) => {
                  return <tr onClick={() => { handleNavigate(e) }} key={index} className='bo_tr'>
                    <td>{e.studentName}</td>
                    <td>{e.reviewStatus === "" ? "-" : e.reviewStatus}</td>
                    <td>{e.startTime}</td>
                    <td> 00:04:08 </td>
                    <td></td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default BackofficeExam