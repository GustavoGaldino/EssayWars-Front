import React from 'react'

import { BsFillSuitHeartFill } from 'react-icons/bs'

const PlayerInfo = ({username, hp, float}) => {
    return (
        <div style={{
            fontSize: "1.1rem",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            float: float || "left",
            marginRight: float ? "2rem" : "0"
        }}>
            <span style={{margin: "0 .5rem"}}>{username}</span>
            <BsFillSuitHeartFill color="red" size="1.5rem"/>
            <span style={{marginLeft: ".5rem"}}>{hp}</span>
        </div>
    )
}

export default PlayerInfo;