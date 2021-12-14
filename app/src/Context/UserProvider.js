import React, {createContext} from 'react'

import useUser from './hooks/useUser'

const Context = createContext()

const UserProvider = ({ children }) => {

    const {username, setUsername, clientId, player, setPlayer, setClientId, match, setMatch, hosting, setHosting} = useUser();

    return (
        <Context.Provider value={{username, setUsername, match, clientId, setClientId, setMatch, player, setPlayer, hosting, setHosting}} >
            {children}
        </Context.Provider>
    )
}

export { Context, UserProvider }