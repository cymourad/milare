import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./style/theme";

import FRONT_END_ROUTE from "./resources/routes/frontEndRoutes";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import AvailableGraphs from "./pages/AvailableGraphs";
import NotFound from "./pages/NotFound";

function App() {
	const [userProfile, setUserProfile] = useState({
		username: "",
		isAdmin: false,
		isDoctor: false,
		isTranslator: false,
	});

	const isLoggedIn = () => {
		return userProfile.username != "";
	};

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path={FRONT_END_ROUTE.HOME} component={Home} />
					<Route exact path={FRONT_END_ROUTE.LOGIN}>
						<LogIn setUserProfile={setUserProfile} userProfile={userProfile} />
					</Route>
					<Route exact path={FRONT_END_ROUTE.AVAILABLE_GRAPHS}>
						<AvailableGraphs
							canAddGraph={userProfile.isAdmin || userProfile.isDoctor}
						/>
					</Route>
					{/* <Route exact path={FRONT_END_ROUTE.AVAILABLE_GRAPHS}>
						{isLoggedIn() ? (
							<AvailableGraphs
								canAddGraph={userProfile.isAdmin || userProfile.isDoctor}
							/>
						) : (
							<Redirect to={FRONT_END_ROUTE.LOGIN} />
						)}
					</Route> */}
					{/* <Route path={FRONT_END_ROUTE.GRAPH + "/:title"}>
					{isLoggedIn() ? <Graph
						canEdit={userProfile.isDoctor}
						canTranslate={userProfile.isTranslator}
						isAdmin={userProfile.isAdmin}
						id={}
					/> : <Redirect to={FRONT_END_ROUTE.LOGIN} />}
				</Route> */}
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
