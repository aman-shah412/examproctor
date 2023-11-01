import React from 'react'
import exam from '/exam.png'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className='img1' src='/exam2.jpeg' />
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
            </li>
          </ul>
          <form className="d-flex">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </form>
        </div>
      </div>
    </nav>
  )
}
