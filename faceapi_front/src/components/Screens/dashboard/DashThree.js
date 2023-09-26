import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
const DashThree = () => {
    const [classrooms, setClassrooms] = useState([])
    const [wait, setWait] = useState(true)
    const [updated, setUpdated] = useState(true)
    const [idSalle, setIdSalle] = useState(1)
    const [name, setName] = useState('')
    const [prof, setProf] = useState(1)
    const [module, setModule] = useState(1)
    const [profs, setProfs] = useState([])
    const [modules, setModules] = useState([])

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
    }, [updated])

    const handleClick = () => {
        const overlaySalle = document.getElementById('edit__salle')
        overlaySalle.classList.add('d-none')
    }

    if (wait) {
        return 'loading...'
    }

    console.log(classrooms);
    return (
        <>
            <div className="overlay d-none" id="edit__salle">
                <i className="fas fa-times"
                    onClick={handleClick}></i>
                <form className="form" id="formSalle" data-classid=''>
                    <h1 className="primary-heading main-color">Modifer une salle <span id="id_salle">i</span></h1>

                    <div className="form__group">
                        <label for="name" className="form__label">nom de la salle</label>
                        <input type="text" className="form__input" id="name"
                            onChange={
                                (e) => {
                                    setName(e.target.value)
                                }} />
                    </div>
                    <div className="form__group">
                        <label htmlFor="profs" className="form__label" >
                            profrsseurs :
                        </label>
                        <select id="profs"
                            onChange={
                                (e) => {
                                    setProf(e.target.value)
                                }
                            }>
                            {
                                profs.map(prof => {
                                    return <option value={prof.teacher_id}>{prof.first_name} {prof.last_name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="filieres" className="form__label" >
                            modules :
                        </label>
                        <select id="modules"
                            onChange={
                                (e) => {
                                    setModule(e.target.value)
                                }
                            }>
                            {
                                modules.map(module => {
                                    return <option value={module.module_id}>{module.name}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="form__group">
                        <label htmlFor="filieres" className="form__label" >
                            Effectif :
                        </label>
                        <input type="text" id="max_std" className="form__input bolder" />
                    </div>

                    <div className="form__group">
                        <input type="submit" value="créer la salle" />
                    </div>
                </form>
            </div>
            <div className="dashboard__salles">
                {
                    classrooms.map(classroom => {
                        return <div className="salle" key={classroom.classroom_id}>
                            <i className="fas fa-times-circle delete"
                                data-id={classroom.classroom_id}
                                onClick={
                                    (e) => {
                                        const classid = e.target.dataset.id
                                        const URL = 'http://127.0.0.1:8000/api/classroom/delete/' + classid
                                        axios.post(URL)
                                            .then(res => {
                                                console.log('user deleted succusfully')
                                                setUpdated(!updated)
                                            })
                                            .catch(err => console.log('somethng bad happen'))
                                    }
                                }></i>
                            <i className="fas fa-edit edit edit__salle"
                                data-id={classroom.classroom_id}
                                onClick={
                                    (e) => {

                                        const classid = e.target.dataset.id

                                        const selectedClassroom = classrooms.find(classr => {
                                            return classr.classroom_id == classid
                                        })

                                        const profIf = selectedClassroom.teacher.teacher_id
                                        const moduleId = selectedClassroom.module.module_id
                                        const max = selectedClassroom.max_student
                                        setModule(selectedClassroom.module.module_id)
                                        setProf(selectedClassroom.teacher.teacher_id)
                                        document.querySelector('#formSalle #id_salle').textContent = classid
                                        document.querySelector('#formSalle #name').value = classroom.name
                                        document.querySelector('#formSalle #profs').value = profIf
                                        document.querySelector('#formSalle #modules').value = moduleId
                                        document.querySelector('#formSalle #max_std').value = max
                                        const overlaySalle = document.getElementById('edit__salle')
                                        overlaySalle.classList.remove('d-none')
                                        console.log('the data', { max, moduleId, profIf, classid })
                                    }
                                }></i>
                            <h1 className="secondary-heading main-color">
                                <i className="fas fa-school"></i>
                                &nbsp;
                                {classroom.name}
                            </h1>

                            <ul>
                                <li>
                                    <i className="fas fa-chalkboard-teacher main-color bolder secondary-heading"></i>
                                    &nbsp;
                                    <span className="bolder">
                                        {/* {classroom.teacher.first_name} */}
                                        &nbsp;
                                        {classroom.teacher.last_name}
                                    </span>
                                </li>

                                <li>
                                    <i className="fas fa-bezier-curve main-color bolder secondary-heading"></i>
                                    &nbsp;
                                    <span className="bolder">{classroom.name}</span>
                                </li>

                                <li>
                                    <i className="fas fa-sort-numeric-up-alt secondary-heading main-color bolder"></i>
                                    &nbsp;
                                    <span className="bolder">{classroom.max_student}</span>
                                </li>
                            </ul>
                        </div>
                    })
                }
            </div>
        </>
    )
}



export default DashThree

