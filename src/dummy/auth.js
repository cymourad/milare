/**
 * dummy functions to mimic behavior of authentication.
 */

export const login_DUMMY = (username, password) => {
	if (user[username].password == password) return user[username];
	return { error: "I can't authenticate you" };
};

export const signup_DUMMY = (
	username,
	password,
	isDoctor,
	isTranslator,
	doctorToken = ""
) => {
	if (isDoctor) {
		if (doctorToken == DOCTOR_TOKEN) {
			user[username] = {
				username,
				password,
				isAdmin: false,
				isDoctor: true,
				isTranslator: false,
			};
			return user[username];
		}
	} else if (isTranslator) {
		user[username] = {
			username,
			password,
			isAdmin: false,
			isDoctor: false,
			isTranslator: true,
		};
		return user[username];
	}
};

/**
 * dummy object to represent data base.
 */
const user = {
	c: {
		username: "c",
		password: "c",
		isAdmin: true,
		isDoctor: false,
		isTranslator: false,
	},
	marina: {
		username: "marina",
		password: "doctors are lovely",
		isAdmin: true,
		isDoctor: false,
		isTranslator: false,
	},
	doctor: {
		username: "doctor",
		password: "doctor",
		isAdmin: false,
		isDoctor: true,
		isTranslator: false,
	},
	translator: {
		username: "translator",
		password: "translator",
		isAdmin: false,
		isDoctor: false,
		isTranslator: true,
		language: "French",
	},
};

const DOCTOR_TOKEN = "doctors do not know everything";
