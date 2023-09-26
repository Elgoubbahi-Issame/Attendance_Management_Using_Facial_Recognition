import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import Ses from './Session_card';
import Select from 'react-select'
import axios from 'axios';
function AllSession() {
    const [S_M_T, setS_M_T] = useState([]);
    const [Classrom, setClassrom] = useState([]);
    const [Msg, setMsg] = useState(null);
    const [isPending, setisPending] = useState(false);
    const [Selected1, setSelected1] = useState();
    const [Selected2, setSelected2] = useState();
    const [module_name, setmodule_name] = useState([]);
    const [classroom_name, setclassroom_name] = useState([]);
    const [session_date, setsession_date] = useState([]);
    const [start_hour, setstart_hour] = useState([]);
    const [end_hour, setend_hour] = useState([]);
    const history = useNavigate();
    const teacher_id = localStorage.getItem('id_teacher')
    const config = {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('id_teacher') || !localStorage.getItem('token'))
            history("/");

        const getSes = async () => {
            setisPending(true)
            document.getElementById("header").style.height = 100 + 'vh';
            document.querySelector(".row").classList.add('center_Load');
            const res = await fetch('http://127.0.0.1:8000/api/teacher/list/' + teacher_id, config);
            const data = await res.json();
            const msage = data.message;
            // setMsg(data.message);
            setTimeout(() => {
                if (data.classroom && data.module) {
                    var seen = {};
                    var not_Dup_classroom = [];
                    for (var i = 0; i < data.classroom.length; i++) {
                        if (!(data.classroom[i].name in seen)) {
                            not_Dup_classroom.push(data.classroom[i]);
                            seen[data.classroom[i].name] = true;
                        }
                    }
                    var seen1 = {};
                    var not_Dup_module = [];
                    for (var i = 0; i < data.module.length; i++) {
                        if (!(data.module[i].name in seen1)) {
                            not_Dup_module.push(data.module[i]);
                            seen1[data.module[i].name] = true;
                        }
                    }
                    not_Dup_classroom.map(cls => {
                        classroom_name.push({ label: cls.name, value: cls.classroom_id })
                    })
                    not_Dup_module.map(cls => {
                        module_name.push({ label: cls.name, value: cls.module_id })
                    })
                }
                if (data.Session_Teacher_Module && data.classroom_session) {
                    setS_M_T(data.Session_Teacher_Module)
                    setClassrom(data.classroom_session)
                    if (data.Session_Teacher_Module.length <= 4) {
                        document.getElementById("header").style.height = 100 + 'vh';

                    } else if (data.Session_Teacher_Module.length > 4) {
                        document.getElementById("header").style.height = 100 + '%';

                    }
                }

                document.querySelector(".row").classList.remove('center_Load');



            }, 100);
            setisPending(false)
            if (msage) {
                alert(msage)
            }
        }
        // console.log(S_M_T)
        getSes();
    }, []);
    // console.log(module_name);
    // console.log(classroom_name);

    return (
        <div className='row' >
            {isPending && <div className="spinner-grow  size" role="status">

                <span className="visually-hidden">Loading...</span>
            </div>}
            {!isPending && <div className='grid' id='grid'>

                {
                    S_M_T.map((a, i) =>
                        Classrom.map((b, j) => {
                            if (i == j) {
                                return < Ses key={a.session_id} ses={a} clas={b} />
                            }
                        })
                    )
                }
                <div class="card_add">
                    {/* <div className="box_add"> */}
                    <div className="circel_add">
                        <i onClick={() => {
                            document.querySelector('.popup-overlay').classList.add('active-popup');
                        }} class="fas fa-plus-circle"></i>


                    </div>
                </div>
            </div>}
            {/* <i class="fas fa-camera-home"></i> */}

            <div className="popup-overlay">
                <div className='popup-form'>
                    <i onClick={() => {
                        document.querySelector('.popup-overlay').classList.remove('active-popup');
                    }} className="fas fa-times-circle cancel-popup"></i>
                    <form className='session-form'>
                        <div className='title-session'>
                            <h3>Add Session</h3>
                        </div>
                        <div className="inputs">
                            <div className="input">
                                <div className='input-select'>
                                    <label>Start session</label>
                                    <input min="09:00" max="18:00" onChange={(e) => { setstart_hour(e.target.value) }} type="time" name="" id="" />
                                    <label>End session</label>
                                    <input min="09:00" max="18:00" onChange={(e) => { setend_hour(e.target.value) }} type="time" name="" id="" />
                                    <label>Date of session</label>
                                    <input onChange={(e) => { setsession_date(e.target.value) }} type="date" name="" id="" />
                                </div>
                                <label>Module name</label>
                                <Select options={module_name}
                                    onChange={setSelected1}
                                />
                                <label>Classrrom</label>
                                <Select options={classroom_name}
                                    onChange={setSelected2}
                                />
                            </div>
                            <input onClick={() => {
                                const data = {
                                    session_date,
                                    start_hour,
                                    end_hour,
                                    teacher_id,
                                    Selected1,
                                    Selected2
                                }
                                axios.post('http://127.0.0.1:8000/api/session/start', data).then(res => {
                                    console.log(res)
                                    window.location.reload();
                                })
                            }} type="" value='Add' className='btn' name="" id="" />
                        </div>
                    </form>
                </div>
            </div>
        </div>


    )
}

export default AllSession
