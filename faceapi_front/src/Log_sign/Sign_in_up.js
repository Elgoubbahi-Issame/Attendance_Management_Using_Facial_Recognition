import React, { useState, useEffect } from 'react'
import './Log_sign.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



function Sign_in_up() {
    const [email, setemail] = useState('');
    const [full_name, setfull_name] = useState('');
    const [CIN, setCIN] = useState('');
    const [image, setimage] = useState();
    const [Class, setClass] = useState('');
    const [IsPending, setIsPending] = useState(false);
    const [MSG, setMSG] = useState('Please enter your information first');
    const [BIGMSG, setBIGMSG] = useState('ERRORE');
    const [btn, setbtn] = useState(false);

    var History = useNavigate();
    useEffect(() => {
        let fileinput = document.getElementById("file");
        let output = document.getElementById("selector");
        fileinput.addEventListener("change", function (e) {
            let file = e.target.files;
            let show = "<span>Selected file : </span>" + file[0].name;
            output.classList.add("active1");
            output.innerHTML = show;
        })



    }, [])

    function Login() {
        setIsPending(true);

        setTimeout(() => {
            const data = {
                full_name,
                email
            }

            axios.post('http://127.0.0.1:8000/api/login', data).then(res => {
                if (res.data.message == 'Success') {
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('id_teacher', res.data.teacher.teacher_id)

                    const config = {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token')
                        }

                    }
                    localStorage.setItem('header', config)



                    History("/Profil/AllSession");
                }
                else {

                    alert(res.data.message)
                }
            })

            setIsPending(false)
        }, 1000);
    }
    function Singup() {
        setIsPending(true);

        // console.log(data)
        setTimeout(() => {
            const formData = new FormData();

            formData.append("full_name", full_name);
            formData.append("CIN", CIN);
            formData.append('file', image);
            formData.append('Class', Class);
            console.log(formData)

            axios.post('http://127.0.0.1:8000/api/register', formData).then(res => {
                console.log(res.data)
                if (res.data.message == 'true') {
                    setBIGMSG('THANK YOU')
                    setMSG('Successful Registration ;)')
                    setbtn(true)
                    document.getElementById('icon').style.color = 'green';
                    document.querySelector('.popup-overlay').classList.add('active-popup');
                } else {
                    setBIGMSG('ERRORE !!')
                    setMSG(res.data.message)
                    setbtn(false)
                    document.getElementById('icon').style.color = 'red';
                    document.querySelector('.popup-overlay').classList.add('active-popup');
                }

            })
            setIsPending(false)
        }, 1000);
    }

    return (
        <div className="forms-container">
            <div className="signin-signup">
                <form action="#" className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" onChange={(e) => { setfull_name(e.target.value) }} placeholder="Full name" />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-at"></i>
                        <input onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Email" />
                    </div>
                    {!IsPending && <input onClick={Login} type="" value="Login" className="btn solid" />}
                    {IsPending && <input onClick={Login} type="" value="Login..." className="btn solid" />}

                </form>
                <form action="#" className="sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"></i>
                        <input type="text" onChange={(e) => { setfull_name(e.target.value) }} placeholder="Full Name" />
                    </div>

                    <div className="input-field">
                        <i className="fas fa-lock"></i>
                        <input type="text" onChange={(e) => { setCIN(e.target.value) }} placeholder="CIN" />
                    </div>
                    <div className="input-field">
                        <i class="fas fa-graduation-cap"></i>
                        <input type="text" onChange={(e) => { setClass(e.target.value) }} placeholder="Class" />
                    </div>
                    <div className="input-field-upl">
                        {/* <i className="fas fa-lock"></i> */}
                        <i className="fas fa-images"></i>
                        <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} id='file' hidden />
                        <label for='file' id='selector'>Select file</label>
                    </div>
                    {!IsPending && <input type="" onClick={Singup} className="btn buy-btn" value="Sign up" />}
                    {IsPending && <input type="" onClick={Singup} className="btn" value="Signing..." />}

                </form>


            </div>
            <div>
                {/* popup */}
                <div className="popup-overlay">
                    <div className="popup-box-container">
                        <div className="check-container">
                            {btn && <i id="icon" className="fas fa-check"></i>}
                            {!btn && <i id="icon" class="fas fa-times"></i>}
                        </div>
                        <div className="popup-message-container">
                            <h1>{BIGMSG}</h1>
                            <p>{MSG}</p>
                        </div>
                        <button onClick={() => {
                            document.querySelector('.popup-overlay').classList.remove('active-popup');
                            if (btn) window.location.reload();

                        }} className="ok-btn">
                            <span>OK</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sign_in_up
