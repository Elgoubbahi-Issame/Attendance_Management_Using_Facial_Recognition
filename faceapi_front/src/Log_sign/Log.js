import React, { useEffect } from 'react'
import P1 from './Sign_in_up';
import P2 from './panel';
function Log() {
    useEffect(() => {

        document.querySelector(".App").classList.add("add");
        const show = () => {

            const sign_in_btn = document.querySelector("#sign-in-btn");
            const sign_up_btn = document.querySelector("#sign-up-btn");
            const container = document.querySelector(".add");

            if (sign_in_btn) {
                sign_up_btn.addEventListener("click", () => {
                    container.classList.add("sign-up-mode");
                });

            }
            if (sign_up_btn) {
                sign_in_btn.addEventListener("click", () => {
                    container.classList.remove("sign-up-mode");
                });

            }
        }
        show();
    }, [])
    return (
        <div className='container'>
            <P1 />
            <P2 />
        </div>
    )
}

export default Log
