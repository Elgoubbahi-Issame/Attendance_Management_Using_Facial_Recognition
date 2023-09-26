import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'

const DashOne = () => {
    const [students, setStudents] = useState([])
    const [waitStudents, setWaitStudents] = useState(true)
    const [updated, setUpadated] = useState(false)
    /*
        useEffect(()=>{
            const STUDENT_URL = 'http://127.0.0.1:8000/api/nonVildatedStudents'
            axios.get(STUDENT_URL)
            .then((res)=>{
                setStudents(res.data.students)
                setWaitStudents(false)
                console.log(res.data.students)
            })
            .catch(err=>console.log('err',err))
        },[])*/
    useEffect(() => {
        const STUDENT_URL = 'http://127.0.0.1:8000/api/nonVildatedStudents'
        axios.get(STUDENT_URL)
            .then((res) => {
                setStudents(res.data.students)
                setWaitStudents(false)
                console.log(res.data.students)
            })
            .catch(err => console.log('err', err))
    }, [updated])

    if (waitStudents) {
        return 'loading.....'
    }
    return (
        <div class="dashboard__users">
            {students.length === 0 ?
                <div className='centerXY'>
                    <h1 className='primary-heading center-x color-primary'>There is no students to validate</h1>
                </div> :
                students.map(student => {
                    return <div>
                        <img src={'http://i.ibb.co/' + student.image + '/' + student.first_name + '-' + student.last_name + '.png'} alt="userimage" />
                        <div>
                            <ul>
                                <li>
                                    <span className="title bolder">Nom :</span>
                                    <span className="value bolder">{student.last_name}</span>
                                </li>
                                <li>
                                    <span className="title bolder">Prénom :</span>
                                    <span className="value bolder">{student.first_name}</span>
                                </li>
                                <li>
                                    <span className="title bolder">Cne :</span>
                                    <span className="value bolder">{student.CIN}</span>
                                </li>
                                <li>
                                    <span className="title bolder">Filiere :</span>
                                    <span className="value bolder">{student.classroom.name}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="btns">
                            <button className="btn1 btn--succes"
                                data-cin={student.CIN}
                                onClick={
                                    (e) => {
                                        let cin = e.target.dataset.cin
                                        if (e.target.tagName === "I") {
                                            cin = e.target.parentElement.dataset.cin
                                        }
                                        console.log(cin)
                                        axios.post(`http://127.0.0.1:8000/api/validerStudent/${cin}`)
                                            .then(res => {
                                                console.log('user has been validated')
                                                setUpadated(!updated)
                                            })
                                            .catch(err => console.log('something bad happened'))
                                    }
                                }>
                                <i className="fas fa-check"></i>
                            </button>

                            <button className="btn1 btn--danger"
                                data-cin={student.CIN}
                                onClick={
                                    (e) => {
                                        let cin = e.target.dataset.cin
                                        if (e.target.tagName === "I") {
                                            cin = e.target.parentElement.dataset.cin
                                        }
                                        axios.post(`http://127.0.0.1:8000/api/student/delete/${cin}`)
                                            .then(res => {
                                                console.log('user has been deleted')
                                                setUpadated(!updated)
                                            })
                                            .catch(err => console.log('something bad happened'))
                                    }
                                }>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}





export default DashOne
