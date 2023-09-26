import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
// import {showErr,showSucces} from '../../../FormValidation'
const DashFour = () => {
    const [modules, setModules] = useState([])
    const [wait, setWait] = useState(false)
        ;
    useEffect(() => {
        // get the modules data from the database
        const MODULE_URl = 'http://127.0.0.1:8000/api/module/list'
        axios.get(MODULE_URl)
            .then((res) => {
                setModules(res.list_module)
                setWait(false)
            })
            .then((err) => console.log(err))
    }, [])

    const submit = (e) => {
        e.preventDefault()
        const email = document.querySelector('#teacher_form #email')
        const first_name = document.querySelector('#teacher_form #first_name')
        const last_name = document.querySelector('#teacher_form #last_name')
        const URL_ADD_TEACHER = 'http://127.0.0.1:8000/api/teacher/store'
        axios.post(URL_ADD_TEACHER, {
            'email': email.value,
            'first_name': first_name.value,
            'last_name': last_name.value
        })
            .then(res => console.log('teacher added succesfully'))
            .catch(err => console.log('something bad happened'))
    }

    if (wait) {
        return 'loading ...'
    }
    return (
        <div className="dashboard__creer_salle">
            <form className="form" onSubmit={submit} id="teacher_form">
                <h1 className="primary-heading main-color">
                    <i class="fas fa-chalkboard-teacher"></i>
                    &nbsp;
                    Ajouter un professeur
                </h1>

                <div className="form__group">
                    <label for="email" className="form__label" >
                        Email :
                    </label>
                    <input type="text" id="email" className="form__input bolder" />
                </div>

                <div className="form__group">
                    <label for="first_name" className="form__label" >
                        Prénom :
                    </label>
                    <input type="text" id="first_name" className="form__input bolder" />
                </div>

                <div className="form__group">
                    <label for="filieres" className="form__label" >
                        Nom :
                    </label>
                    <input type="text" id="last_name" className="form__input bolder" />
                </div>


                <div className="form__group">
                    <input type="submit" value="Ajouter" />
                </div>
            </form>
        </div>
    )
}

export default DashFour
