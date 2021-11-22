import React, { useContext, useEffect } from 'react'

import history from '../../history';

import api from '../../api/api'
import { Context } from '../../Context/UserProvider';

const { createRoom } = api()

const Rooms = () => {

    const { clientId, setMatch, setPlayer } = useContext(Context)

    const handleCreate = async () => {
        const {successful, match, player} = await createRoom(clientId)
        if(successful){
            await setMatch(match)
            await setPlayer(player)
            history.push("/game")
        }
    }

    useEffect(() => {
        if(!clientId) history.push("/")
    }, [])

    return (
        <div className="full-screen-container">
            <div className="side-by-side-container">
                <button className="btn" onClick={() => {history.push('/join')}} >Join Session</button>
                <button className="btn" onClick={handleCreate} >Create Session</button>
            </div>
        </div>
    );
}

export default Rooms;