import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useMatch } from 'react-router-dom'
import './Prof_style.css'
import Nav from './Nav';
import Con from './Content';
import A_Ses from './AllSession';


function Profpage() {
    useEffect(() => {
        document.querySelector(".App").classList.remove("add");
    }, [])
    // console.log(useMatch())

    return (

        <div className='header' id='header'>
            <Nav />
            <Routes>
                <Route path="AllSession" element={<A_Ses />} />
                <Route path="Session/:id" element={<Con />} />
            </Routes>

        </div>
        // </Router>
    )
}

export default Profpage
