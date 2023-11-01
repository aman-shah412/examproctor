import React from 'react'
import Institute from '../components/Institute'
import { FaTachometerAlt } from 'react-icons/fa';
import { FaRegEye } from 'react-icons/fa';
import { FaUserSecret } from 'react-icons/fa';
import { FaWpexplorer } from 'react-icons/fa';
import { FaArchive } from 'react-icons/fa';
import { FaRegListAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Content() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Institute />
            </div>
            <div className="whole">
                <div className="container access">
                    <div className="d-flex justify-content-evenly ">
                        <div className="size">
                            <Link to='/Admin' style={{ 'textDecoration': 'none', 'color': 'white' }}>
                                <div className="col p-4  ">
                                    <h6> Administration</h6>
                                    <FaTachometerAlt size={70} />
                                </div>
                            </Link>
                        </div>
                        <div className="size">
                            <Link to='/Reviewer' style={{ 'textDecoration': 'none', 'color': 'white' }}>
                                <div className="col p-4">
                                    <h6>  Reviewer </h6>
                                    <FaRegEye size={70} />
                                </div>
                            </Link>
                            <div className='global-flex' style={{ top: "0.6rem" }}>
                                <div className='switch'>Global Reviewer</div>
                                <div className="form-check form-switch switch">
                                    <input hidden type="checkbox" id='checkbox-input' />
                                    <label htmlFor="checkbox-input" className='round-slider-container'>
                                        <div><b>Yes</b></div>
                                        <div><b>No</b></div>
                                        <div className="round-slider"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="size">
                            {/* <Link to='/Proctor' style={{ 'textDecoration': 'none', 'color': 'white' }}> */}
                                <div className="col p-4" title="This feature is temporarily unavailable">
                                    <h6> Proctor</h6>
                                    <FaUserSecret size={70} />
                                </div>
                            {/* </Link> */}
                            <div className='global-flex' style={{ top: "0.6rem" }}>
                                <div className='switch'>Global Proctoring</div>
                                <div className="form-check form-switch switch">
                                    <input hidden type="checkbox" id='checkbox-input2' />
                                    <label htmlFor="checkbox-input2" className='round-slider-container'>
                                        <div><b>Yes</b></div>
                                        <div><b>No</b></div>
                                        <div className="round-slider"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container access">
                    <div className="d-flex justify-content-evenly">
                        <div className="col p-4 size obv" title="This feature is temporarily unavailable">
                            <h6> Observatory </h6>
                            <FaWpexplorer size={70} />
                        </div>
                        <div className="size">
                            <Link to='/backoffice' style={{ 'textDecoration': 'none', 'color': 'white' }}>
                                <div className="col p-4  ">
                                    <h6> BackOffice</h6>
                                    <FaArchive size={70} />
                                </div>
                            </Link>
                        </div>
                        <div className="col p-4 size" title="This feature is temporarily unavailable">
                            <h6>  Auditor</h6>
                            <FaRegListAlt size={70} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Content