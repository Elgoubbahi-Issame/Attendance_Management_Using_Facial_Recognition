import React from 'react';
import axios from 'axios'
const DashFive = () => {
    const submit = (e) => {
        e.preventDefault()
        const name = document.querySelector('#module-form #name')
        const MODULE_POST_URL = 'http://127.0.0.1:8000/api/module/store'
        axios.post(MODULE_POST_URL, {
            'name': name.value
        })
            .then(res => {
                console.log('succes')
                e.target.reset()
            })
            .catch(err => {
                console.log('error happend in creating the module')
            })

    }
    return <div className="dashboard__creer_salle">
        <form className="form" id="module-form" onSubmit={submit}>
            <h1 className="primary-heading main-color">Ajouter un module</h1>

            <div className="form__group">
                <label for="name" className="form__label">
                    Name :
                </label>
                <input type="text" id="name" className="form__input bolder" required />
            </div>

            <div className="form__group">
                <input type="submit" value="Ajouter" />
            </div>
        </form>
    </div>
};

export default DashFive;
