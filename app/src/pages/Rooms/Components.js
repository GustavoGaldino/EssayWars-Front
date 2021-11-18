import React from 'react'

const Joining = ({ setJoining }) => {
    return (
        <h1>Joining</h1>
    )
}

const Creating = ({ setCreating }) => {
    return (
        <h1>Creating</h1>
    )
}

const Select = ({ setJoining, setCreating }) => {
    return (
        <div className="side-by-side-container">
            <button className="btn" onClick={() => {setJoining(true)}}>Join</button>
            <button className="btn" onClick={() => {setCreating(true)}}>Create</button>
        </div>
    )
}

export { Joining, Creating, Select }