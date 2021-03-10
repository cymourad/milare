/**
 * This page is displayed if the user enters an unknown (a.k.a. wrong) URL.
 */

import React from "react";
import { Link } from "react-router-dom";

import FRONT_END_ROUTE from "../resources/routes/frontEndRoutes";

const NotFound = () => {
	return (
		<div>
			<h1>Oops!</h1>
			<p>Not too sure what you are looking for :/</p>
			<p>
				Try going to <Link to={FRONT_END_ROUTE.HOME}>our home page</Link>, maybe
				you will find what you are looking for there ;)
			</p>
		</div>
	);
};

export default NotFound;
