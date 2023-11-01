import React, { useEffect, useState } from 'react'
import Navbar from "./Navbar"
import { Link, useNavigate } from 'react-router-dom'


function Backoffice() {
    const [exams, setExams] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8004/fetchdata")
            .then((response) => response.json())
            .then((data) => {
                setExams(data.data);
            }).catch((err) => {
                console.log(err);
            })
    }, [])

    const handleNavigate = (e) => {
        navigate(`/backoffice/exams/${e.AdminSessionId}`)
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
                        <h4>Exams</h4>
                        <table className='bo_table' style={{ "width": "100%" }}>
                            <thead>
                                <tr>
                                    <th>Exam name</th>
                                    <th>Date of creation</th>
                                    <th>Last exam taken on</th>
                                    <th>Attendance</th>
                                    <th>Reviewed</th>
                                </tr>
                            </thead>
                            <tbody className='bo_tbody'>
                                {exams.map((e, index) => {
                                    return <tr key={index} onClick={() => { handleNavigate(e) }} className='bo_tr'>
                                        <td className=''>{e.ExamName}</td>
                                        <td>{e.CreationDate}</td>
                                        <td>24th April 2022</td>
                                        <td>
                                            <h3>0%</h3>
                                            <div>(0/192)</div>
                                        </td>
                                        <td>N/A</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </>
    )
}

export default Backoffice