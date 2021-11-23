import React, { useEffect, useContext, useState, useRef } from 'react'

import socketIOClient from 'socket.io-client'

import history from '../../history'

import { Context } from '../../Context/UserProvider'

import kirby from '../../images/kirby.png'

import InvitePlayer from '../InvitePlayer/InvitePlayer'
import PlayerInfo from './PlayerInfo'
import Word from './Word'

require("dotenv").config()

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT || "http://localhost:3000"

const Game = () => {

    const { match, clientId, player } = useContext(Context)

    const [gameStarted, setGameStarted] = useState(false)

    const [gameMatch, setGameMatch] = useState({})

    const [gamePlayer, setGamePlayer] = useState({})

    const socketRef = useRef()

    var typed = ""

    const handlePress = (e) => {
        const key = e.key

        const isSmallCaseLetter = (k) => {
            return k >= 'a' && k <= 'z'
        }

        const isUpperCaseLetter = (k) => {
            return k >= 'A' && k <= 'Z'
        }

        if(!isSmallCaseLetter(key) && !isUpperCaseLetter(key)) return
        
        const words = document.getElementsByClassName("board-word")

        var match = false

        typed += key

        for(let index = 0 ; index < words.length ; index++){
            const w = words[index].getAttribute("value")
            if(w.length < typed.length) continue
            else if(w.length === typed.length){
                if(w === typed){
                    socketRef.current.emit("word_finished", words[index].id)
                    typed=""
                    break
                }
            }
            else if(w.substr(0, typed.length) === typed){
                match = true
            }
        }

        if(!match){
            typed = ""
        }
    }

    useEffect(() => {
        if(!clientId) history.push("/")

        window.addEventListener("keypress", handlePress)

        const socket = socketIOClient(`${SOCKET_ENDPOINT}/match/${match.id}`, {
            auth: {
                playerId: player.id
            }   
        })

        socket.on("start_match", (match) => {
            setGameMatch(match)
            setGamePlayer(match.players[player.id])
            setGameStarted(true)
        })

        socket.on("update_player", (newPlayerState) => {
            setGamePlayer(newPlayerState)
        })

        socket.on("other_player_update", (newPlayer) => {
            setGameMatch((previous) => {
                return {...previous, players: {...previous.players, [newPlayer.id]: {...previous.players[newPlayer.id], ...newPlayer}}}
            })
        })

        socket.on("message", msg => {
            alert(msg.text)
        }) 

        socketRef.current = socket
    },[])

    return(
        <div className="full-screen-container">
            { gameStarted ? 
            <div className="game-window">
                <div className="header-game-window">
                    <PlayerInfo
                        username={gamePlayer.user.nickname}
                        hp={gamePlayer.hp}
                    />
                    {
                        Object.values(gameMatch.players).map((currentPlayer) => {
                            return (
                                player.created_at === currentPlayer.created_at ? <div key="div"></div> : 
                                <PlayerInfo
                                    username={currentPlayer.user.nickname}
                                    hp={currentPlayer.hp}
                                    key={currentPlayer.created_at}
                                    float="right"
                                />
                            )
                        })
                    }
                </div>
                <div className="main-game-window">
                    <div className="main-game-window-left">
                        <img src={kirby} alt="kirby-fofo" style={{width: "100%", height: "100%"}}/>
                    </div>
                    <div className="main-game-window-right" style={{position: "relative"}}>
                        {
                            gamePlayer.board.words.map((word) => {
                                return(
                                    < Word word={word} y={gamePlayer.board.yMap[word.id]} matchCount={2}/>
                                )
                            })
                        }                   
                    </div>
                </div>
                <div className="footer-game-window"></div>
            </div>
            : <InvitePlayer /> }
        </div>
    )
}

export default Game