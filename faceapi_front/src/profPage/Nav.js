import React, { useEffect } from 'react'
import Img1 from './logo.png'
import Img8 from './user.png'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';



function Nav() {
    const History = useNavigate();
    useEffect(() => {
        try {
            localStorage.getItem('token')
        } catch (error) {
            History('/');
        }
    }, [])

    window.addEventListener("scroll", function () {
        var header = document.querySelector(".nav")
        header.classList.toggle("stiky", this.window.scrollY > 0)
    })
    function logout() {
        const config = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        fetch('http://127.0.0.1:8000/api/logout', config).then(res => {
            localStorage.clear();
            History('/');
            res.json().then(res1 => {
                console.log(res1)
            })
        })
    }
    return (
        <div>
            <ul className="nav justify-content-between">
                <li className="nav-item">
                    <img src={Img1} alt="" className='logo1' />
                </li>
                <li className="nav-item">

                    <div class="navigation">
                        <a class="button" href='#' onClick={logout}>
                            <img src={Img8} />
                            <div class="logout">LOGOUT</div>
                        </a>
                    </div>
                    {/* <i className="fas fa-sign-out-alt"></i> */}

                </li>
            </ul>

        </div>
    )
}

export default Nav
