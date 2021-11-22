import React, { useEffect, useContext, useState } from 'react'

import socketIOClient from 'socket.io-client'

import history from '../../history'

import { Context } from '../../Context/UserProvider'

import InvitePlayer from '../InvitePlayer/InvitePlayer'

require("dotenv").config()

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || "http://localhost:3000"

const Game = () => {

    const { match, clientId, player } = useContext(Context)

    const [gameStarted, setGameStarted] = useState(false)

    useEffect(() => {
        if(!clientId) history.push("/")
        const socket = socketIOClient(`${SOCKET_ENDPOINT}/match/${match.id}`)
        
        socket.on("start_match", () => {
            setGameStarted(true)
        })
        
    }, [])

    return(
        <div className="full-screen-container">
            { gameStarted ? 
            <>
                <h1>Game</h1>
            </>
            : <InvitePlayer /> }
        </div>
    )
}

export default Game