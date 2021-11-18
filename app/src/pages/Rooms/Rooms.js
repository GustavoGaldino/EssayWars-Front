import React, { useState } from 'react'

import { Joining, Creating, Select } from './Components'

const Rooms = () => {

    const [joining, setJoining] = useState(false)
    const [creating, setCreating] = useState(false)

    return (
        <div className="full-screen-container">
            {joining ? 
                ( <Joining setJoining={setJoining} /> )
                :
                ( creating ? <Creating setCreating={setCreating} />
                :
                <Select setCreating={setCreating} setJoining={setJoining} /> )
            }
        </div>
    );
}

export default Rooms;