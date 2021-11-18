import React from 'react'

import history from '../../history'

import api from '../../api/api'

const { submitUsername } = api()

const Home = ({ setUsername, setPlayerID }) => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value
        const {successful, playerID} = await submitUsername(username)
        if(successful){
            setUsername(username)
            setPlayerID(playerID)
            history.push("/rooms")
        }
    }

    return (
        <div className="full-screen-container">
            <div className="side-by-side-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" id="username" minLength={3} maxLength={12}/>
                    <button className="btn" type="submit" >Ok</button>
                </form>
            </div>
        </div>
    );
}

export default Home;