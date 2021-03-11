/**
 * This form lets the user add a new graph or edit an existing graph.
 * The form includes the following entires:
 * - title (single line text field)
 * - summary (multiline)
 * - tags (check boxes)
 * - image (pick URL and verify it's there)
 *
 * Props:
 * - graphData  [object]: if empty,     it's a new graph, else, we will edit this data
 * -                      if not empty, it's an existing graph that will be edited and would have the following props
 * -- title     [string]
 * -- summary   [string]
 * -- tags      [array of strings]
 * -- imageURL  [string]
 */

import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const GraphForm = ({ graphData, setDrawerIsOpen }) => {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [tags, setTags] = useState([]);
	const [imageURL, setImageURL] = useState("");

	const [isNewGraph, setIsNewGraph] = useState(true); // will be determined based on the graphData object

	const [error, setError] = useState(null); // to communicate any back-end errors to the user

	useEffect(
		() => {
			if (Object.keys(graphData).length > 0) {
				setTitle(graphData.title);
				setSummary(graphData.summary);
				setTags(graphData.tags);
				setImageURL(graphData.imageURL);
				setIsNewGraph(false);
			}
		},
		[] // only do it once when component first renders
	);

	const saveGraph = () => {
		// talk to back-end to update graph is it is not new or post new graph if it is new
		if (isNewGraph) {
		} else {
		}
		setDrawerIsOpen(false);
	};

	return (
		<form style={{ width: 500, textAlign: "center" }}>
			<TextField
				label="Title"
				value={title}
				onChange={(event) => {
					setTitle(event.target.value);
				}}
				style={{ margin: 50, width: "80%" }}
			/>
			<br />
			<TextField
				label="Summary"
				multiline
				rows={6}
				value={summary}
				placeholder="Write a brief description of this scenario ..."
				onChange={(event) => {
					setSummary(event.target.value);
				}}
				style={{ width: "80%" }}
			/>
			<br />
			<TextField
				label="Image URL"
				multiline
				value={imageURL}
				onChange={(event) => {
					setImageURL(event.target.value);
				}}
				style={{ margin: 50, width: "80%" }}
			/>
			<br />
			<img src={imageURL} alt="image-preview" style={{ maxWidth: "80%" }} />
			<br />
			<Button
				variant="contained"
				color="primary"
				onClick={() => saveGraph()}
				style={{ margin: 50 }}
			>
				Save
			</Button>
		</form>
	);
};

export default GraphForm;
