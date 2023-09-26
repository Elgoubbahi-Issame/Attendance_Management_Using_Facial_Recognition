import React, { useState, useEffect } from 'react';
import axios from 'axios'
const DashSeven = () => {
    const [profs, setProfs] = useState([])
    const [modules, setModules] = useState([])
    const [classrooms, setClassrooms] = useState([])
    const [wait, setWait] = useState(true)
    useEffect(() => {
        setWait(true)
        const CLASSROOMS_URL = 'http://127.0.0.1:8000/api/classroom/list'
        const MODULES_URL = 'http://127.0.0.1:8000/api/module/list'
        const TEACHERS_URL = 'http://127.0.0.1:8000/api/teacher/list'
        axios.get(CLASSROOMS_URL)
            .then(res => {
                console.log('wahed')
                setClassrooms(res.data.list_classroom)
                return axios.get(MODULES_URL)
            })
            .then(res => {
                console.log('jooj')
                setModules(res.data.list_module)
                return axios.get(TEACHERS_URL)
            })
            .then(res => {
                console.log('tlata')
                setProfs(res.data.list_teacher)
                setWait(false)
            })
            .catch(err => console.log('err'))
    }, [])
    const submit = (e) => {
        e.preventDefault()
        const classroom_id = document.querySelector('#education-form #class').value
        const module_id = document.querySelector('#education-form #modules').value
        const teacher_id = document.querySelector('#education-form #profs').value

        const EDUCATION_URL = 'http://127.0.0.1:8000/api/education/store'
        axios.post(EDUCATION_URL,
            {
                teacher_id,
                classroom_id,
                module_id
            })
            .then(res => {
                console.log('education row created succesfully')
                window.location.reload();
            })
            .catch(err => {
                console.log('error happened')
            })
    }
    return <div className="dashboard__creer_salle">
        <form className="form" id="education-form" onSubmit={submit}>
            <h1 className="primary-heading main-color">Creer une classe</h1>

            <div className="form__group">
                <label for="class" className="form__label" >
                    classrooms :
                </label>
                <select id="class" required>
                    {
                        classrooms.map(classroom => {
                            return <option value={classroom.classroom_id}>{classroom.name}</option>
                        })
                    }
                </select>
            </div>

            <div className="form__group">
                <label for="profs" className="form__label" >
                    professeur :
                </label>
                <select id="profs" required>
                    {
                        profs.map(prof => {
                            return <option value={prof.teacher_id}>{prof.first_name} {prof.last_name}</option>
                        })
                    }
                </select>
            </div>

            <div className="form__group">
                <label for="modules" className="form__label" >
                    module :
                </label>
                <select id="modules">
                    {
                        modules.map(module => {
                            return <option value={module.module_id}>{module.name}</option>
                        })
                    }

                </select>
            </div>

            <div className="form__group">
                <input type="submit" value="creer la classe" />
            </div>
        </form>
    </div>
};

export default DashSeven;
