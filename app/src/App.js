import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './pages/Home.js'

import "./styles/global.css"

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
  	);
}

export default App;
