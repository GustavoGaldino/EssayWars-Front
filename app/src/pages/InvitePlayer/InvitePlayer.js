import React, { useContext, useEffect, useState } from 'react'

import { VscCheck, VscCopy } from 'react-icons/vsc'
import { Context } from '../../Context/UserProvider'

const InvitePlayer = () => {

    const { match } = useContext(Context)

    const [link, setLink] = useState("")

    const [copied, setCopied] = useState(false)

    const handleClick = () => {
        var copyText = document.getElementById("session-id")

        copyText.select();
        copyText.setSelectionRange(0, 99999); /* For mobile devices */

        navigator.clipboard.writeText(copyText.value);

        setCopied(true)
    }

    useEffect(() => {
        setLink(match.code)
    },[])

    return (
        <div className="full-screen-container">
            <div style={{margin: "1rem", display: "flex", justifyContent: "center", alignContent:"center"}}>
                <input id="session-id" defaultValue={link} className="not-selectable-input"/>
                <button className="icon-wrapper" onClick={handleClick} >
                    { copied ? <VscCheck color="white" fontSize="1.5rem"/> : <VscCopy color="white" fontSize="1.5rem"/> }
                </button>
            </div>
            <span>Copy the session ID above and share it with your friends!</span>
            <span>Please wait for the game to start...</span>
        </div>
    )
}

export default InvitePlayer