import React, { useContext, useEffect } from 'react'

import { Context } from '../../Context/UserProvider';

import history from '../../history';

import api from '../../api/api'

const Join = () => {

    const { joinRoom } = api()

    const { setMatch, setPlayer, clientId } = useContext(Context)

    useEffect(() => {
        if(!clientId) history.push("/")
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roomCode = document.getElementById("session-id").value
        const { successful, player, match } = await joinRoom(clientId, roomCode)
        if(!successful){
            alert("Invalid session ID")
            return
        }
        setPlayer(player)
        setMatch(match)
        history.push("/game")
    }

    return(
        <div className="full-screen-container">
            <div className="side-by-side-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Session ID" id="session-id"/>
                    <button className="btn" type="submit" >Enter Session</button>
                </form>
            </div>
        </div>
    )
}

export default Join