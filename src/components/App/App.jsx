import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Player from "../Player/Player";
import Presenter from "../Presenter/Presenter";

const App = () => (
	<>
		<h1>React test</h1>
		<BrowserRouter>
			<Switch>
				<Route path="/" exact>
					<Player />
				</Route>
				<Route path="/presenter" exact>
					<Presenter />
				</Route>
			</Switch>
		</BrowserRouter>
	</>
);

export default App;
