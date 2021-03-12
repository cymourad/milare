/**
 * This menu form appears in the side bar of the graph page for translators.
 * It shows the existing text in English.
 * It has a TextField to let the user write a translation or update the existing translation.
 *
 * TODO add the google translate translation as a suggestion
 */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const TranslateForm = ({
	nodeID,
	englishText,
	translationLanguage,
	translatedText,
}) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [translation, setTranslation] = useState(translatedText);

	const updateTranslation = () => {
		setIsLoading(true);

		// TODO add new translation to backEnd

		setIsLoading(false);
	};

	if (!nodeID)
		return (
			<Typography style={{ margin: 20 }}>
				Please select a node to translate...
			</Typography>
		);

	if (isLoading) return <CircularProgress />;

	return (
		<div style={{ margin: 20 }}>
			<Typography variant="body2">Please translate the following: </Typography>
			<Typography style={{ margin: 10 }}>" {englishText} "</Typography>
			<TextField
				value={translation}
				label={"Translation in " + translationLanguage}
				onChange={(event) => setTranslation(event.target.value)}
			/>
			<br />
			{error}
			<Button
				variant="contained"
				color="primary"
				style={{ marginTop: 10 }}
				onClick={() => updateTranslation()}
			>
				Save
			</Button>
		</div>
	);
};

export default TranslateForm;
