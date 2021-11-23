import { Route, Router, Switch } from 'react-router-dom'

import React from 'react'

import history from './history'

import { UserProvider } from './Context/UserProvider'
import Home from './pages/Home/Home.js'
import Rooms from './pages/Rooms/Rooms.js'
import Join from './pages/Join/Join.js'
import Game from './pages/Game/Game.js'

import "./styles/global.css"

function App() {
	return (
		<UserProvider>
			<Router history={history}>
				<Switch>
					<Route exact path = "/">
						<Home/>
					</Route>
					<Route exact path="/rooms">
						<Rooms/>
					</Route>
					<Route exact path="/join" component={Join} />
					<Route exact path="/game">
						<Game />
					</Route>
				</Switch>
			</Router>
		</UserProvider>
  	);
}

export default App;
