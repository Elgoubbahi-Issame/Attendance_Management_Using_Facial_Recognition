import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DashTwo = () => {
    const [profs,setProfs] = useState([])
    const [modules,setModules] = useState([])
    const [wait,setWait] = useState(true)

    useEffect(()=>{
        const MODULES_URL = 'http://127.0.0.1:8000/api/module/list'
        const TEACHERS_URL = 'http://127.0.0.1:8000/api/teacher/list'
        axios.get(MODULES_URL)
        .then((res)=>{
            setModules(res.data.list_module)
            console.log(res.data.list_module)
            return axios.get(TEACHERS_URL)
        })
        .then(res=>{
            setProfs(res.data.list_teacher)
            console.log(res.data.list_teacher)
            setWait(false)

        })
        .catch(err=>console.log(err))
    },[])

    const submit = (e)=>{
        e.preventDefault()
        const name = document.getElementById('classname').value
        const prof = document.querySelector('#salle-form #profs').value
        const module = document.querySelector('#salle-form #modules').value
        const max = document.getElementById('maxnumber').value
        const URL = 'http://127.0.0.1:8000/api/classroom/store'
        console.log(name)
        axios.post(URL,
        {
            "name":name,
            'teacher_id':prof,
            'module_id':module,
            'max_student':max
        })
        .then(res=>{
            console.log('class created succesfully')
            e.target.reset()
        })
        .catch(err=>console.log('error happened'))
    }
    if(wait){
        return 'loading ....'
    }
    return (
        <div className="dashboard__creer_salle">
            <form className="form" id="salle-form" onSubmit={submit}>
                <h1 className="primary-heading main-color">Creer une salle</h1>

                <div className="form__group">
                    <label for="name" className="form__label">
                        Name :
                    </label>
                    <input type="text" id="classname" className="form__input bolder" required/>
                </div>

                <div className="form__group">
                    <label for="profs" className="form__label" >
                        professeur :
                    </label>
                    <select id="profs" required>
                        {
                            profs.map(prof=>{
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
                            modules.map(module=>{
                                return <option value={module.module_id}>{module.name}</option>
                            })
                        }
                        
                    </select>
                </div>

                <div className="form__group">
                    <label for="maxStd" className="form__label" required>
                        Effectif :
                    </label>
                    <input type="number" id="maxnumber" className="form__input bolder" placeholder="nombre max des etudiants"/>
                </div>
                
                <div className="form__group">
                    <input type="submit" value="créer la salle" />
                </div>
        </form>
    </div>
    )
}

export default DashTwo
