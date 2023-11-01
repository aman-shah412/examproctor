import React, { useEffect, useState, useContext } from 'react'
import { FaRegQuestionCircle } from 'react-icons/fa'
import { FiCornerUpLeft, FiCornerUpRight, FiAlignLeft, FiAlignCenter, FiAlignRight, FiAlignJustify, FiFileText } from 'react-icons/fi'
import { BsTypeBold, BsTypeItalic } from 'react-icons/bs'
import { RiIndentDecrease, RiIndentIncrease } from 'react-icons/ri'
import { HiLink } from 'react-icons/hi'
import Step5 from './Step5'
import Context from "../Context/Context"



function Step4({ data, setData }) {

    const { setStep3, step4, setStep4 } = useContext(Context)


    const [step4Details, setStep4Details] = useState({
        studentInstruction: ""
    })

    const handleStep4InputChange = (e) => {
        setStep4Details({ ...step4Details, [e.target.name]: e.target.value })
    }

    const handlePreviousStep = () => {
        data.pop()
        data.pop()
        setStep3(true)
    }

    const handleNextStep = async (e) => {
        setStep4(false)
        e.preventDefault()
        setData([...data, step4Details])
    }

    return (
        <>
            {step4 ? <>
                <div className="main-content p-4 center-side" style={{ width: "75%" }}>
                    <div className="new-exam p-3">
                        <form action="" onSubmit={handleNextStep}>
                            <div style={{ 'color': '#374760' }}>
                                <h4><strong> Instructions for students</strong></h4>
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
                                        <div style={{ borderRight: "2px solid rgb(206, 205, 205)" }} className='p-2'>
                                            <div>
                                                <HiLink size={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <textarea value={step4Details.studentInstruction} style={{ width: "100%" }} onChange={handleStep4InputChange} name="studentInstruction" id="" rows="6"></textarea>
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
                    <h6>Step 4 - Exam Details</h6>
                    <div className="info-content my-5 d-flex align-items-center justify-content-between flex-column" style={{ height: "89%" }}>
                        <div className="info">
                            <FaRegQuestionCircle size={60} style={{ color: "red" }} />
                        </div>
                        <div className="info text-center">
                            <FiFileText size={40} color={"#555"} />
                            <p>
                                Add the exam link or the exam document and any additional instructions for the exam taker.
                            </p>
                        </div>
                        <div className="info d-flex justify-content-between" style={{ width: "100%" }}>
                            <div className="bar">
                                <div className="step_bar4"></div>
                            </div>
                            <span style={{ fontSize: "13px" }}>
                                {" "}
                                <b> 4 of 5</b>
                            </span>
                        </div>
                    </div>
                </div>
            </> : <Step5 setStep4={setStep4} data={data} setData={setData} />}
        </>
    )
}

export default Step4
