/**
 * This component lets the doctor edit the label of the node (i.e. the answer or the question).
 * The doctor can:
 * - change text (through text field)
 * - define whether it is a question or an answer (through radio buttons)
 * - add tag if it is a question (through checkboxes)
 *
 */

import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";

const EditNodeForm = ({
	nodeID,
	nodeEnglishText,
	nodeIsQuestion,
	availableTags, // array of object, each object has id and tag [string]
	nodeTags, // array of integers representing tag IDs
}) => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const [text, setText] = useState("");
	const [isQuestion, setIsQuestion] = useState(null);

	const allTags = availableTags.reduce(
		(acc, curr) => ((acc[curr.id] = false), acc),
		{}
	);

	const [tags, setTags] = useState({});

	useEffect(() => {
		setText(nodeEnglishText);
		setIsQuestion(nodeIsQuestion);
		setTags(
			nodeTags
				? {
						...allTags,
						...nodeTags.reduce((acc, curr) => ((acc[curr] = true), acc), {}),
				  }
				: {}
		);
	}, [nodeID]);

	const save = () => {
		setIsLoading(true);

		// TODO send the update to the backend

		setIsLoading(false);
	};

	if (!nodeID)
		return (
			<Typography style={{ margin: 20 }}>
				Please select a node to edit...
			</Typography>
		);

	if (isLoading) return <CircularProgress />;

	console.log(nodeIsQuestion);

	return (
		<div style={{ margin: 20 }}>
			<Divider />
			<br />
			<Typography>Edit Question / Asnwer</Typography>
			<br />
			<FormControl component="fieldset">
				<FormLabel component="legend">Type</FormLabel>
				<RadioGroup
					aria-label="type"
					name="type"
					value={isQuestion ? "question" : "asnwer"}
					onChange={(event) => {
						setIsQuestion(event.target.value == "question");
					}}
				>
					<FormControlLabel
						value="question"
						control={<Radio />}
						label="Question"
					/>
					<FormControlLabel value="answer" control={<Radio />} label="Asnwer" />
				</RadioGroup>
			</FormControl>
			{isQuestion && (
				<FormControl component="fieldset" style={{ marginLeft: 20 }}>
					<FormLabel component="tag">Tag(s)</FormLabel>
					<FormGroup>
						{availableTags.map((tag) => (
							<FormControlLabel
								control={
									<Checkbox
										checked={tags[tag.id]}
										onChange={(event) =>
											setTags({ ...tags, [tag.id]: event.target.checked })
										}
										name={tag.tag}
										value={tag.id}
									/>
								}
								label={tag.tag}
							/>
						))}
					</FormGroup>
				</FormControl>
			)}
			<br />
			<TextField
				value={text}
				onChange={(event) => setText(event.target.value)}
				label="Text"
				style={{ marginBottom: 20 }}
			/>
			<br />
			{error}
			<Button variant="contained" color="primary" onClick={save}>
				Save Changes
			</Button>
		</div>
	);
};

export default EditNodeForm;
