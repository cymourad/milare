/**
 * This file exports an object that has all the front-end routes.
 */
const FRONT_END_ROUTE = {
	/**
	 * Lets user sign in with email and password.
	 * Based on creds, sets their privileges to know if they will edit graphs or add translation.
	 */
	LOGIN: "/log-in",

	/**
	 * Lets the user sign up and potentially pick a role.
	 *
	 */
	SIGN_UP: "/sign-up",

	/**
	 * Landing page before user logis in.
	 * Advertizes the project and the app.
	 */
	HOME: "/",

	/**
	 * Where user can pick what graph to work on.
	 * Doctors/admin also have the ability to add a graph.
	 */
	AVAILABLE_GRAPHS: "/available-graphs",

	/**
	 * Where user picks language and region/dialect
	 */
	AVAILABLE_LANGUAGES: "/available-languages",

	/**
	 * Where user can edit (a single) graph.
	 * Takes the name of the graph after /graph/<NAME_OF_GRAPH>
	 */
	GRAPH: "/graph",
};

export default FRONT_END_ROUTE;
