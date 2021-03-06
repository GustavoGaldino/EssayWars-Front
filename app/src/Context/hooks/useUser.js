import { useState } from "react"

export default function useUser(){

    const [username, setUsername] = useState("")

    const [clientId, setClientId] = useState("")

    const [player, setPlayer] = useState({})

    const [match, setMatch] = useState({})

    const [hosting, setHosting] = useState("")

    return {username, setUsername, clientId, setClientId, match, player, setPlayer, setMatch, hosting, setHosting}
}