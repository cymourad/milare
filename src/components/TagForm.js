/**
 * This form appears as a side menu on the graph page.
 * It shows the user the tags available for the current chief complaint.
 * It lets the user add tags to the chief complaint that they are working in.
 * The user can then tag questions with this tag.
 */

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import { Divider, Typography } from "@material-ui/core";

const TagForm = ({ availableTags, chiefCompaintID }) => {
	const [newTag, setNewTag] = useState("");

	const addNewTag = () => {
		// send a request to the back-end to add this tag to the chief complaint
	};

	return (
		<div style={{ margin: 20 }}>
			<Divider />
			<br />
			<Typography>Available Categories of Questions</Typography>
			<br />
			{availableTags.map((tag) => (
				<Chip label={tag.tag} style={{ margin: 10 }} color="secondary" />
			))}
			<br />
			<TextField
				style={{ marginBottom: 20 }}
				value={newTag}
				onChange={(event) => setNewTag(event.target.value)}
				label="New Question Category"
			/>
			<br />
			<Button variant="contained" color="primary" onClick={() => addNewTag()}>
				Add Tag
			</Button>
		</div>
	);
};

export default TagForm;
