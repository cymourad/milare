/**
 * This file exports an object that has all the front-end routes.
 */
const BASE_URL = "/milare";

const FRONT_END_ROUTE = {
	/**
	 * Lets user sign in with email and password.
	 * Based on creds, sets their privileges to know if they will edit graphs or add translation.
	 */
	LOGIN: BASE_URL + "/log-in",

	/**
	 * Lets the user sign up and potentially pick a role.
	 *
	 */
	SIGN_UP: BASE_URL + "/sign-up",

	/**
	 * Landing page before user logis in.
	 * Advertizes the project and the app.
	 */
	HOME: BASE_URL + "/",

	/**
	 * Where user can pick what graph to work on.
	 * Doctors/admin also have the ability to add a graph.
	 */
	AVAILABLE_GRAPHS: BASE_URL + "/available-graphs",

	/**
	 * Where user picks language and region/dialect
	 */
	AVAILABLE_LANGUAGES: BASE_URL + "/available-languages",

	/**
	 * Where user can edit (a single) graph.
	 * Takes the name of the graph after /graph/<NAME_OF_GRAPH>
	 */
	GRAPH: BASE_URL + "/graph",
};

export default FRONT_END_ROUTE;
