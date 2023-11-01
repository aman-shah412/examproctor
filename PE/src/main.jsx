import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import State from './Context/State'
import swDev from "./swDev";


ReactDOM.createRoot(document.getElementById('root')).render(
    <State>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </State>

)

swDev()
