import React from 'react'

import { BsFillSuitHeartFill } from 'react-icons/bs'

const PlayerInfo = ({username, hp, float}) => {
    return (
        <div style={{
            fontSize: "1.5rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            float: float || "left",
            marginRight: float ? "2rem" : "0"
        }}>
            <span style={{margin: "0 1rem"}}>{username}</span>
            <BsFillSuitHeartFill color="red" size="3rem"/>
            <span style={{marginLeft: "1rem"}}>{hp}</span>
        </div>
    )
}

export default PlayerInfo;