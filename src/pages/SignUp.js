/**
 * This is where a new user signs up.
 * They must insert:
 * - email
 * - password
 * - choice of doctor/translator
 * - if doctor
 * -- doctor token (given by us, so random ppl don't sign up as doctors)
 * - if translator
 * -- language
 * -- region
 */

import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FRONT_END_ROUTE from "../resources/routes/frontEndRoutes";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

const SignUp = ({ setUserProfile, isLoggedIn }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null); // when trying to sign the user up with the back-end
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(
		false
	);
	const [doctorToken, setDoctorToken] = useState("");
	const [language, setLanguage] = useState(null); // TODO make this the language ID
	const [region, setRegion] = useState(null); // TODO make this the region ID
	const [availableLanguages, setAvailableLanguages] = useState([]);
	const [availableRegions, setAvailableRegions] = useState({});
	const [isTranslator, setIsTranslator] = useState(true); // if false, then doctor

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const fetchAvailableLanguagesAndRegions = () => {
		// TODO get them from the back-end
		setAvailableLanguages(dummyLanguages);
		setAvailableRegions(dummyRegions);
	};

	useEffect(
		() => {
			fetchAvailableLanguagesAndRegions();
		},
		[] // do it once when component first renders
	);

	const signUp = () => {
		// validate emai/username and password before
		if (username.length < 1) {
			setError(<ErrorMessage message={"Please enter a username!"} />);
		} else if (password.length < 5) {
			setError(
				<ErrorMessage message={"Password is less than 5 characters long!"} />
			);
		} else if (password != passwordConfirmation) {
			setError(
				<ErrorMessage
					message={"Password and confirmed password do not match!"}
				/>
			);
		} else if (isTranslator) {
			if (!language) {
				setError(
					<ErrorMessage message={"Please select a language and a region!"} />
				);
			} else if (!region) {
				setError(<ErrorMessage message={"Please select a region!"} />);
			} else {
				sendSignUpReqToBackEnd();
			}
		} else {
			// user is a doctor
			sendSignUpReqToBackEnd();
		}
	};

	const sendSignUpReqToBackEnd = () => {
		setUserProfile({
			username,
			isAdmin: false,
			isDoctor: !isTranslator,
			isTranslator,
		});
	};

	// once user is signed up and logged in, redirect to main page
	if (isLoggedIn) return <Redirect to={FRONT_END_ROUTE.AVAILABLE_GRAPHS} />;

	return (
		<div
			style={{
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h1 style={{ marginTop: 30 }}>Sign Up</h1>
			{error}
			<form>
				<TextField
					label="Username"
					value={username}
					onChange={(event) =>
						setUsername(event.target.value.replace(/[^a-z0-9]/gi, ""))
					}
					style={{ margin: 40, marginTop: 20, width: 300 }}
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
						onChange={(event) =>
							setPassword(event.target.value.replace(/[^a-z0-9]/gi, ""))
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={handleMouseDownPassword}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						}
					/>
					<FormHelperText>Only use letters and numbers</FormHelperText>
				</FormControl>
				<br />
				<FormControl style={{ width: 300, margin: 40 }}>
					<InputLabel htmlFor="standard-adornment-password">
						Confirm Password
					</InputLabel>
					<Input
						id="standard-adornment-password"
						type={showPasswordConfirmation ? "text" : "password"}
						value={passwordConfirmation}
						onChange={(event) =>
							setPasswordConfirmation(
								event.target.value.replace(/[^a-z0-9]/gi, "")
							)
						}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() =>
										setShowPasswordConfirmation(!showPasswordConfirmation)
									}
									onMouseDown={handleMouseDownPassword}
								>
									{showPasswordConfirmation ? (
										<Visibility />
									) : (
										<VisibilityOff />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				<br />
				<FormControl component="fieldset">
					<FormLabel component="legend">Role</FormLabel>
					<RadioGroup
						aria-label="role"
						name="role"
						value={isTranslator ? "translator" : "doctor"}
						onChange={(event) =>
							setIsTranslator(event.target.value == "translator")
						}
					>
						<FormControlLabel
							value="translator"
							control={<Radio />}
							label="Translator"
						/>
						<FormControlLabel
							value="doctor"
							control={<Radio />}
							label="Doctor"
						/>
					</RadioGroup>
				</FormControl>
				<br />
				{isTranslator ? (
					<div>
						<FormControl style={{ width: 130, marginRight: 40 }}>
							<InputLabel id="language">Language</InputLabel>
							<Select
								labelId="language"
								id="language"
								value={language}
								onChange={(event) => setLanguage(event.target.value)}
							>
								{availableLanguages.map((l) => (
									<MenuItem value={l.id}>{l.language}</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl style={{ width: 130 }}>
							<InputLabel id="region">Region</InputLabel>
							<Select
								labelId="region"
								id="region"
								value={region}
								onChange={(event) => setRegion(event.target.value)}
							>
								{language &&
									availableRegions[language].map((r) => (
										<MenuItem value={r.id}>{r.region}</MenuItem>
									))}
							</Select>
						</FormControl>
					</div>
				) : (
					<TextField
						value={doctorToken}
						label="Token"
						placeholder="Enter token given by recruiter"
						onChange={(event) =>
							setDoctorToken(event.target.value.replace(/[^a-z0-9]/gi, ""))
						}
						style={{ width: 300 }}
					/>
				)}
				<br />
				<Button
					variant="contained"
					color="primary"
					onClick={signUp}
					style={{ margin: 30 }}
				>
					Sign Up
				</Button>
			</form>
		</div>
	);
};

export default SignUp;

const dummyLanguages = [
	{ language: "Arabic", id: 1 },
	{ language: "French", id: 2 },
];
const dummyRegions = {
	1: [
		{ region: "Egypt", id: 11 },
		{ region: "Saudi", id: 12 },
	],
	2: [
		{ region: "Congo", id: 21 },
		{ region: "Paris", id: 22 },
	],
};

const ErrorMessage = ({ message }) => (
	<p style={{ margin: 10, color: "red" }}>{message}</p>
);
