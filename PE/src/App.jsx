import { useState, useEffect, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Admin from './components/Admin'
import Content from './components/Content'
import Reviewer from './components/Reviewer'
import Proctor from './components/Proctor'
import Candidate from './components/Candidate'
import Backoffice from './components/Backoffice'
import BackofficeExam from './components/BackofficeExam'
import Sessions from './components/Sessions'
import AdminExam from './components/AdminExam'
import ManageStudents from './components/ManageStudents'


function App() {
  // const [queue, setQueue] = useState(true);
  // let inQueue = JSON.parse(localStorage.getItem("reviewStatus"))

  // useEffect(() => {
  //   if (inQueue != "Reset Review Status") {
  //     setQueue(false)
  //   } else {
  //     setQueue(true)
  //   }
  // }, [inQueue])


  return (
    <>
      <Routes>
        <Route path='/' element={<Content />}></Route>
        <Route path='/Admin' element={<Admin />}></Route>
        <Route path='/Admin/exams/:id' element={<AdminExam />}></Route>
        <Route path='/Reviewer' element={<Reviewer />}></Route>
        <Route path='/Proctor' element={<Proctor />}></Route>
        <Route path='/candidate/:id' element={<Candidate />}></Route>
        <Route path='/backoffice' element={<Backoffice />}></Route>
        <Route path='/backoffice/exams/:id' element={<BackofficeExam />}></Route>
        <Route path='/backoffice/session/:id' element={<Sessions />}></Route>
        <Route path='/reviewer/session/:id' element={<Reviewer />}></Route>
        <Route path='Admin/exams/:id/manage_exam' element={<ManageStudents />}></Route>

      </Routes>

    </>
  )
}

export default App
