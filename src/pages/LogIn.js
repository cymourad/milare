/**
 * Page where user can log in.
 */

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { login_DUMMY } from "../dummy/auth";
import FRONT_END_ROUTE from "../resources/routes/frontEndRoutes";

const LogIn = ({ userProfile, setUserProfile }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState(null);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const login = () => {
		const userData = login_DUMMY(username, password);
		if (userData[error]) setError(userData[error]);
		else console.log(userData);
		setUserProfile({
			username: userData.username,
			isAdmin: userData.isAdmin,
			isDoctor: userData.isDoctor,
			isTranslator: userData.isTranslator,
			language: userData.isTranslator ? userData.language : "",
		});
	};

	const isLoggedIn = () => {
		return userProfile.username != "";
	};

	if (isLoggedIn()) return <Redirect to={FRONT_END_ROUTE.AVAILABLE_GRAPHS} />;

	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h1 style={{ marginTop: 30 }}>Log In</h1>
			<form>
				<TextField
					label="Username"
					value={username}
					onChange={(event) => setUsername(event.target.value)}
					style={{ margin: 50, marginTop: 20, width: 300 }}
				/>
				<br />
				<FormControl style={{ width: 300 }}>
					<InputLabel htmlFor="standard-adornment-password">
						Password
					</InputLabel>
					<Input
						id="standard-adornment-password"
						type={showPassword ? "text" : "password"}
						value={password}
						onChange={(event) => setPassword(event.target.value)}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<br />
				<Button
					style={{ margin: 50 }}
					onClick={login}
					variant="contained"
					color="primary"
				>
					Login
				</Button>
			</form>
		</div>
	);
};

export default LogIn;
