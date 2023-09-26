import React, { useEffect, useState } from 'react'
import UseFetch from './Usefetch'
import axios from 'axios'

function Session_card({ ses, clas }) {

    // console.log(clas);
    // console.log(ses);

    return (

        <div class="card">
            <div className="box">
                <div className="content">
                    <h2>{ses.name}</h2>
                    <br />
                    <p>{clas.max_student}</p>
                    <p>{clas.name}</p>
                    {/* <br /> */}
                    <p>{ses.session_date}</p>
                    <p>From {ses.start_hour} to {ses.end_hour}</p>
                    <a href={`Session/${ses.session_id}`}>Start Detection</a>
                    <a onClick={() => {
                        axios.post('http://127.0.0.1:8000/api/session/delete/' + ses.session_id).then(res => {
                            console.log(res)
                            window.location.reload();
                        })
                    }}>Delete Session </a>
                </div>
            </div>

        </div>

    )
}

export default Session_card
