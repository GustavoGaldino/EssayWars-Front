require("dotenv").config()

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:8080"

const testing = true;

const API_MOCK_RESPONSE = {
    status: 200,
    id: "helloWorld"
}

const api = () => {
    const submitUsername = async (username) => {
        const response = testing ? API_MOCK_RESPONSE : await fetch(`${API_ENDPOINT}/username`, {
            method: "POST",
            body: JSON.stringify({
                username: username
            })
        }).catch(err => console.log(err))

        if(response.status != 200){
            return {successful: false, playerID: undefined}
        }

        const resJson = testing ? API_MOCK_RESPONSE : await response.json()

        return {
            successful: true,
            playerID: resJson.id
        }
    }

    return { submitUsername }
}

export default api