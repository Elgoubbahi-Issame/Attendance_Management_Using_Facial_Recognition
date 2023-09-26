import React from 'react'
import { useState, useEffect } from 'react'
import DashOne from './dashboard/DashOne'
import DashTwo from './dashboard/DashTwo'
import DashThree from './dashboard/DashThree'
import DashFour from './dashboard/DashFour'
import DashFive from './dashboard/DashFive'
import DashSix from './dashboard/DashSix'
import DashSeven from './dashboard/DashSeven'
import './dashboard.css'
const Dashboard = () => {
    const [page, setPage] = useState(3)
    useEffect(() => {
        document.querySelector(".App").classList.remove("add");
    }, [])
    return (
        // <section className="dashboard">
        //     {/* <link rel="stylesheet" href="style.css" /> */}
        //     <div className="dashboard__navigation">
        //         <div className="open-nav" onClick={
        //             () => {
        //                 const list = document.querySelector('.open-nav')
        //                 const navigation = document.querySelector('.dashboard__navigation')
        //                 list.classList.toggle('open')
        //                 navigation.classList.toggle('open')
        //             }
        //         }>
        //             <i className="fas fa-chevron-right open"></i>
        //             <i className="fas fa-chevron-left close"></i>
        //         </div>
        //         <ul>
        //             <li>
        //                 <button className="btn1 btn--secondary bolder"
        //                     onClick={
        //                         () => {
        //                             setPage(1)
        //                             const list = document.querySelector('.open-nav')
        //                             const navigation = document.querySelector('.dashboard__navigation')
        //                             list.classList.toggle('open')
        //                             navigation.classList.toggle('open')
        //                         }
        //                     }>Valider l'utilisateurs</button>
        //             </li>

        //             <li>
        //                 <button className="btn1 btn--secondary bolder"
        //                     onClick={
        //                         () => {
        //                             setPage(2)
        //                             const list = document.querySelector('.open-nav')
        //                             const navigation = document.querySelector('.dashboard__navigation')
        //                             list.classList.toggle('open')
        //                             navigation.classList.toggle('open')
        //                         }
        //                     }>Créer une salle</button>
        //             </li>

        //             <li>
        //                 <button className="btn1 btn--secondary bolder"
        //                     onClick={
        //                         () => {
        //                             setPage(3)
        //                             const list = document.querySelector('.open-nav')
        //                             const navigation = document.querySelector('.dashboard__navigation')
        //                             list.classList.toggle('open')
        //                             navigation.classList.toggle('open')
        //                         }
        //                     }>voir les salles</button>
        //             </li>

        //             <li>
        //                 <button className="btn1 btn--secondary bolder"
        //                     onClick={
        //                         () => {
        //                             setPage(4)
        //                             const list = document.querySelector('.open-nav')
        //                             const navigation = document.querySelector('.dashboard__navigation')
        //                             list.classList.toggle('open')
        //                             navigation.classList.toggle('open')
        //                         }
        //                     }>Ajouter professeur</button>
        //             </li>
        //         </ul>
        //     </div>

        //     <div className="dashboard__section">
        //         <div className='container'>
        //             {
        //                 page === 1 ? <DashOne /> :
        //                     page === 2 ? <DashTwo /> :
        //                         page === 3 ? <DashThree /> :
        //                             <DashFour />
        //             }
        //         </div>
        //     </div>
        // </section>
        <section className="dashboard">
            <div className="dashboard__navigation">
                <div className="open-nav" onClick={
                    () => {
                        const list = document.querySelector('.open-nav')
                        const navigation = document.querySelector('.dashboard__navigation')
                        list.classList.toggle('open')
                        navigation.classList.toggle('open')
                    }
                }>
                    <i className="fas fa-chevron-right open"></i>
                    <i className="fas fa-chevron-left close"></i>
                </div>
                <ul>
                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(1)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Valider l'utilisateurs</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(2)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Créer une salle</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(3)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>voir les salles</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(4)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Ajouter professeur</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(5)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Ajouter une module</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(6)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Dash 6</button>
                    </li>

                    <li>
                        <button className="btn1 btn--secondary bolder"
                            onClick={
                                () => {
                                    setPage(7)
                                    const list = document.querySelector('.open-nav')
                                    const navigation = document.querySelector('.dashboard__navigation')
                                    list.classList.toggle('open')
                                    navigation.classList.toggle('open')
                                }
                            }>Dash 7</button>
                    </li>
                </ul>
            </div>

            <div className="dashboard__section">
                <div className='container'>
                    {
                        page === 1 ? <DashOne /> :
                            page === 2 ? <DashTwo /> :
                                page === 3 ? <DashThree /> :
                                    page === 4 ? <DashFour /> :
                                        page === 5 ? <DashFive /> :
                                            page === 6 ? <DashSix /> :
                                                <DashSeven />
                    }
                </div>
            </div>
        </section>
    )
}

export default Dashboard
