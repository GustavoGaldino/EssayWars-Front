import { Route, Router, Switch } from 'react-router-dom'

import React, { useState } from 'react'

import history from './history'

import Home from './pages/Home/Home.js'

import Rooms from './pages/Rooms/Rooms.js'

import "./styles/global.css"

function App() {

	const [username, setUsername] = useState()

	const [playerID, setPlayerID] = useState()

	return (
		<Router history={history}>
			<Switch>
				<Route exact path = "/">
					<Home setUsername={setUsername} setPlayerID={setPlayerID} />
				</Route>
				
				<Route exact path="/rooms" component={Rooms} />
			</Switch>
		</Router>
  	);
}

export default App;
