require("dotenv").config()

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:3600"

const testing = false;

const API_MOCK_RESPONSE = {
    status: 200,
    id: "helloWorld"
}

const api = () => {
    const submitUsername = async (username) => {
        const response = testing ? API_MOCK_RESPONSE : await fetch(`${API_ENDPOINT}/user`, {
            method: "POST",
            body: JSON.stringify({
                username: username
            })
        }).catch(err => console.log(err))

        if(response.status != 201){
            return {successful: false, clientID: undefined}
        }

        const resJson = testing ? API_MOCK_RESPONSE : await response.json()

        return {
            successful: true,
            clientId: resJson.User.id
        }
    }

    const createRoom = async (clientId) => {

        const myHeader = new Headers({
            authorization: clientId
        })

        const response = await fetch(`${API_ENDPOINT}/match`, {
            method: "POST",
            headers: myHeader
        }).catch(err => console.log(err))

        if(response.status != 201){
            return{
                successful: false,
                player: undefined,
                match: undefined,
            }
        }

        const resJson = await response.json()

        return {
            successful: true,
            player: resJson.player,
            match: resJson.match
        }
    }

    const joinRoom = async (clientId, roomCode) => {

        const myHeader = new Headers({
            authorization: clientId
        })

        const response = await fetch(`${API_ENDPOINT}/match/${roomCode}`, {
            method: "POST",
            headers: myHeader
        }).catch(err => console.log(err))

        if(response.status != 201){
            return {
                successful: false,
                match: undefined,
                player: undefined
            }
        }

        const resJson = await response.json()

        return {
            successful: true,
            match: resJson.match,
            player: resJson.player
        }
    }

    return { submitUsername, createRoom, joinRoom }
}

export default api