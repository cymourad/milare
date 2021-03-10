/**
 * Lets user logout, or go to all-graphs page.
 */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import FRONT_END_ROUTE from "../resources/routes/frontEndRoutes";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

const Navbar = ({ isLoggedIn, logout }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Link
						to={FRONT_END_ROUTE.HOME}
						style={{ textDecoration: "none", color: "white" }}
						className={classes.title}
					>
						<Typography variant="h6">Milare</Typography>
					</Link>

					{isLoggedIn ? (
						<>
							<Link
								to={FRONT_END_ROUTE.AVAILABLE_GRAPHS}
								style={{ textDecoration: "none", color: "white" }}
							>
								<Button>Graph Menu</Button>
							</Link>
							<Button color="inherit" onClick={() => logout()}>
								Logout
							</Button>
						</>
					) : (
						<Link
							to={FRONT_END_ROUTE.LOGIN}
							style={{ textDecoration: "none", color: "white" }}
						>
							<Button color="inherit">Login</Button>
						</Link>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
