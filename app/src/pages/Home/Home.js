import React, { useContext } from 'react'

import history from '../../history'

import api from '../../api/api'

import { Context } from '../../Context/UserProvider'

const { submitUsername } = api()

const Home = () => {

    const { setUsername, setClientId } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value
        const {successful, clientId} = await submitUsername(username)
        if(successful){
            setUsername(username)
            setClientId(clientId)
            history.push("/rooms")
        }

    }

    return (
        <div className="full-screen-container">
            <div className="side-by-side-container">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Username" id="username" minLength={2} maxLength={16}/>
                    <button className="btn" type="submit" >Ok</button>
                </form>
            </div>
        </div>
    );
}

export default Home;