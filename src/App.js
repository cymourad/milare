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
import SignUp from "./pages/SignUp";
import AvailableGraphs from "./pages/AvailableGraphs";
import Graph from "./pages/Graph";
import NotFound from "./pages/NotFound";

function App() {
	const loggedOutPorfile = {
		username: "",
		isAdmin: false,
		isDoctor: false,
		isTranslator: false,
	};

	const [userProfile, setUserProfile] = useState(loggedOutPorfile);

	const isLoggedIn = () => {
		return userProfile.username != "";
	};

	const logout = () => {
		setUserProfile(loggedOutPorfile);
	};

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Navbar isLoggedIn={isLoggedIn()} logout={logout} />
				<Switch>
					<Route exact path={FRONT_END_ROUTE.HOME} component={Home} />
					<Route exact path={FRONT_END_ROUTE.LOGIN}>
						<LogIn setUserProfile={setUserProfile} userProfile={userProfile} />
					</Route>
					<Route exact path={FRONT_END_ROUTE.SIGN_UP}>
						<SignUp setUserProfile={setUserProfile} isLoggedIn={isLoggedIn()} />
					</Route>
					{/* <Route exact path={FRONT_END_ROUTE.AVAILABLE_GRAPHS}>
						<AvailableGraphs
							canAddGraph={userProfile.isAdmin || userProfile.isDoctor}
						/>
					</Route>
					<Route path={FRONT_END_ROUTE.GRAPH + "/:title"}>
						<Graph
							canEdit={userProfile.isDoctor || userProfile.isAdmin}
							canTranslate={userProfile.isTranslator || userProfile.isAdmin}
						/>
					</Route> */}
					<Route exact path={FRONT_END_ROUTE.AVAILABLE_GRAPHS}>
						{isLoggedIn() ? (
							<AvailableGraphs
								canAddGraph={userProfile.isAdmin || userProfile.isDoctor}
							/>
						) : (
							<Redirect to={FRONT_END_ROUTE.LOGIN} />
						)}
					</Route>
					<Route path={FRONT_END_ROUTE.GRAPH + "/:title"}>
						{isLoggedIn() ? (
							<Graph
								canEdit={userProfile.isDoctor || userProfile.isAdmin}
								canTranslate={userProfile.isTranslator}
								isAdmin={userProfile.isAdmin}
								translationLanguage={
									userProfile.isTranslator ? userProfile.language : null
								}
							/>
						) : (
							<Redirect to={FRONT_END_ROUTE.LOGIN} />
						)}
					</Route>
					<Route component={NotFound} />
				</Switch>
			</Router>
		</ThemeProvider>
	);
}

export default App;
