import React from 'react'
import Img1 from './log.svg'
import Img2 from './register.svg'

function panel() {
    return (
        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>Student ?</h3>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                        ex ratione. Aliquid!
                    </p>
                    <button className="btn transparent" id="sign-up-btn">
                        Sign up
                    </button>
                </div>
                <img src={Img2} className="image" alt="" />
            </div>
            <div className="panel right-panel">
                <div className="content">
                    <h3>Teacher ?</h3>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                        laboriosam ad deleniti.
                    </p>
                    <button className="btn transparent" id="sign-in-btn">
                        Sign in
                    </button>
                </div>
                <img src={Img1} className="image" alt="" />
            </div>
        </div>
    )
}

export default panel
