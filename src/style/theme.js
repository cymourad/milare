/**
 * Material UI relies heavily on the notion of primary and secondary colors.
 * We use this file to control them.
 */

import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

// TODO change these colors to stuff that we actually like
const theme = createMuiTheme({
	palette: {
		primary: {
			main: purple[500],
		},
		secondary: {
			main: green[500],
		},
	},
});

export default theme;
