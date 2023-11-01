import React, { useState, useContext } from 'react'
import { FaCheck, FaTimes, FaRegQuestionCircle } from 'react-icons/fa'
import { FiCornerUpLeft, FiCornerUpRight, FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify, FiFileText } from 'react-icons/fi'
import { BsTypeBold, BsTypeItalic } from 'react-icons/bs'
import { RiIndentDecrease, RiIndentIncrease } from 'react-icons/ri'
import { HiLink } from 'react-icons/hi'
import Step4 from './Step4'
import Context from "../Context/Context"



function Step3({ data, setData }) {

    const { setStep2, step3, setStep3 } = useContext(Context)

    const handleInternetRadio = (radio) => {
        const targeted = document.getElementsByClassName("internet")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const handleApplicationRadio = (radio) => {
        const targeted = document.getElementsByClassName("application")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const handleTextbookRadio = (radio) => {
        const targeted = document.getElementsByClassName("textbook")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const handleCalculatorRadio = (radio) => {
        const targeted = document.getElementsByClassName("calculator")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const handlePenPaperRadio = (radio) => {
        const targeted = document.getElementsByClassName("penPaper")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const handleAdditionalRadio = (radio) => {
        const targeted = document.getElementsByClassName("additional")
        for (let i = 0; i < targeted.length; i++) {
            targeted[i].lastElementChild.setAttribute("hidden", false)
        }
        document.querySelector(`.${radio}`).firstElementChild.click()
        document.querySelector(`.${radio}`).lastElementChild.removeAttribute("hidden")
    }

    const [step3Details, setStep3Details] = useState({
        proctorInstruction: ""
    })

    const [radioInput, setRadioInput] = useState({
        internet: "No",
        application: "No",
        textbook: "No",
        calculator: "No",
        penPaper: "No",
        additional: "No"
    })

    const handleStep3InputChange = (e) => {
        setStep3Details({ ...step3Details, [e.target.name]: e.target.value })
    }

    const handleRadioInputChange = (e) => {
        setRadioInput({ ...radioInput, [e.target.name]: e.target.value })
    }

    const handlePreviousStep = () => {
        data.pop()
        data.pop()
        setStep2(true)
    }

    const handleNextStep = (e) => {
        e.preventDefault()
        setStep3(false)
        setData([...data, radioInput, step3Details])
    }

    return (
        <>
            {step3 ? <>
                <div className="main-content p-4 center-side" style={{ width: "75%" }}>
                    <div className="new-exam p-3">
                        <form action="" onSubmit={handleNextStep} id='formeleStep3'>
                            <div style={{ 'color': '#374760' }}>
                                <h4 className='mb-0'><strong> Instructions for proctors (must be written in English)</strong></h4>
                            </div>
                            <div className="details">
                                <div className="details-title d-flex my-2 align-items-center" >
                                    <h5 style={{ width: "19rem", margin: "0" }}>Allowed?</h5>
                                    <div className='custom_radio d-flex justify-content-center align-items-center' style={{ marginRight: "3rem", border: "none" }}>
                                        Yes
                                    </div>
                                    <div className='custom_radio d-flex justify-content-center align-items-center' style={{ border: "none" }}>
                                        No
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Students are allowed to use the internet</p>
                                    <div onClick={() => { handleInternetRadio("internet_yes") }} className='custom_radio internet internet_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="internet" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio internet internet_no d-flex justify-content-center align-items-center' onClick={() => { handleInternetRadio("internet_no") }}>
                                        <input hidden type="radio" value="No" name="internet" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Students may use external applications</p>
                                    <div onClick={() => { handleApplicationRadio("application_yes") }} className='custom_radio application application_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="application" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio application application_no d-flex justify-content-center align-items-center' onClick={() => { handleApplicationRadio("application_no") }}>
                                        <input hidden type="radio" value="No" name="application" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex align-items-center justify-content-between" style={{ width: "27rem" }}>
                                    <h4 className='mb-0'>Allowed Materials</h4>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Students may use textbooks</p>
                                    <div onClick={() => { handleTextbookRadio("textbook_yes") }} className='custom_radio textbook textbook_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="textbook" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio textbook textbook_no d-flex justify-content-center align-items-center' onClick={() => { handleTextbookRadio("textbook_no") }}>
                                        <input hidden type="radio" value="No" name="textbook" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Students may use a calculator</p>
                                    <div onClick={() => { handleCalculatorRadio("calculator_yes") }} className='custom_radio calculator calculator_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="calculator" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio calculator calculator_no d-flex justify-content-center align-items-center' onClick={() => { handleCalculatorRadio("calculator_no") }}>
                                        <input hidden type="radio" value="No" name="calculator" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Students may use pen and paper</p>
                                    <div onClick={() => { handlePenPaperRadio("penPaper_yes") }} className='custom_radio penPaper penPaper_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="penPaper" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio penPaper penPaper_no d-flex justify-content-center align-items-center' onClick={() => { handlePenPaperRadio("penPaper_no") }}>
                                        <input hidden type="radio" value="No" name="penPaper" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex my-2 align-items-center">
                                    <p style={{ width: "19rem" }}>Additional materials</p>
                                    <div onClick={() => { handleAdditionalRadio("additional_yes") }} className='custom_radio additional additional_yes d-flex justify-content-center align-items-center' style={{ marginRight: "3rem" }}>
                                        <input hidden type="radio" value="Yes" onChange={handleRadioInputChange} name="additional" />
                                        <FaCheck hidden size={25} color='green' />
                                    </div>
                                    <div className='custom_radio additional additional_no d-flex justify-content-center align-items-center' onClick={() => { handleAdditionalRadio("additional_no") }}>
                                        <input hidden type="radio" value="No" name="additional" onChange={handleRadioInputChange} />
                                        <FaTimes size={25} color='red' />
                                    </div>
                                </div>
                                <div className="details-title d-flex flex-column my-2 justify-content-between" style={{ width: "100%" }}>
                                    <p>Type in anything else that needs to be mentioned</p>
                                    <div style={{ width: "100%" }}>
                                        <div className='text_format d-flex'>
                                            <div style={{ width: "5.5rem", borderRight: "2px solid rgb(206, 205, 205)" }} className='d-flex align-items-center justify-content-between p-2'>
                                                <div>
                                                    <FiCornerUpLeft opacity={0.5} size={30} />
                                                </div>
                                                <div>
                                                    <FiCornerUpRight opacity={0.5} size={30} />
                                                </div>
                                            </div>
                                            <div style={{ width: "10rem", borderRight: "2px solid rgb(206, 205, 205)" }}>
                                                <select style={{ height: "100%" }} className="form-select" aria-label="Default select example">
                                                    <option value="paragraph" >Paragraph</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                            </div>
                                            <div style={{ width: "5.5rem", borderRight: "2px solid rgb(206, 205, 205)" }} className='d-flex align-items-center justify-content-between p-2'>
                                                <div>
                                                    <BsTypeBold size={30} />
                                                </div>
                                                <div>
                                                    <BsTypeItalic size={30} />
                                                </div>
                                            </div>
                                            <div style={{ width: "12rem", borderRight: "2px solid rgb(206, 205, 205)" }} className='d-flex align-items-center justify-content-between p-2'>
                                                <div>
                                                    <FiAlignLeft size={30} />
                                                </div>
                                                <div>
                                                    <FiAlignCenter size={30} />
                                                </div>
                                                <div>
                                                    <FiAlignRight size={30} />
                                                </div>
                                                <div>
                                                    <FiAlignJustify size={30} />
                                                </div>
                                            </div>
                                            <div style={{ width: "5.5rem", borderRight: "2px solid rgb(206, 205, 205)" }} className='d-flex align-items-center justify-content-between p-2'>
                                                <div>
                                                    <RiIndentDecrease size={30} />
                                                </div>
                                                <div>
                                                    <RiIndentIncrease size={30} />
                                                </div>
                                            </div>
                                            <div style={{ borderRight: "2px solid rgb(206, 205, 205)" }} className='px-1'>
                                                <div>
                                                    <HiLink size={30} />
                                                </div>
                                            </div>
                                        </div>
                                        <textarea name="proctorInstruction" value={step3Details.proctorInstruction} onChange={handleStep3InputChange} style={{ width: "100%" }} id="" rows="6"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="prev-next">
                                <button type='button' className="prev" onClick={handlePreviousStep}>Previous step</button>
                                <button className="next btn btn1">Next step</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="main-content p-4 right-side" style={{ width: "21rem" }}>
                    <h6>Step 3 - Exam Restrictions</h6>
                    <div className="info-content my-5 d-flex align-items-center justify-content-between flex-column" style={{ height: "89%" }}>
                        <div className="info">
                            <FaRegQuestionCircle size={60} style={{ color: "red" }} />
                        </div>
                        <div className="info text-center">
                            <FiFileText size={40} color={"#555"} />
                            <p>
                                Add exam restrictions for the reviewers, such as whether books, specific websites, or calculators are allowed.
                            </p>
                        </div>
                        <div className="info d-flex justify-content-between" style={{ width: "100%" }}>
                            <div className="bar">
                                <div className="step_bar3"></div>
                            </div>
                            <span style={{ fontSize: "13px" }}>
                                {" "}
                                <b> 3 of 5</b>
                            </span>
                        </div>
                    </div>
                </div>
            </> : <Step4 setStep3={setStep3} data={data} setData={setData} />}
        </>
    )
}

export default Step3
