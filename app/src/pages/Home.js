import React from 'react'

import { Redirect } from 'react-router-dom'

const Home = () => {

    const handleClick = () => {
        console.log("TODO")
    }

    return (
        <div className="App">
            <div className="full-screen-container">
                <div className="side-by-side-container">
                    <input type="text" placeholder="Username"/>
                    <button className="btn" onClick={handleClick} >Ok</button>
                </div>
            </div>
        </div>
    );
}

export default Home;