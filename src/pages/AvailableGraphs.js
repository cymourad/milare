/**
 *
 */
import React, { useEffect, useState, Fragment } from "react";
import Button from "@material-ui/core/Button";
import GraphCard from "../components/GraphCard";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import GraphForm from "../components/GraphForm";
import Drawer from "@material-ui/core/Drawer";

import { getAllGraphs } from "../dummy/API";

const AvailableGraphs = ({ canAddGraph }) => {
	const [graphs, setGraphs] = useState([]);
	const [error, setError] = useState(null);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const [selectedGraph, setSelectedGraph] = useState({}); // to be passed to GraphForm

	const fetchGraphs = () => {
		const graphSummaries = getAllGraphs();
		setGraphs(graphSummaries);
	};

	useEffect(
		() => {
			fetchGraphs();
		},
		[] // only run this once when you start
	);

	const openGraphForm = (graph = {}) => {
		setSelectedGraph(graph);
		setDrawerIsOpen(true);
	};

	return (
		<Fragment>
			<div>
				<Drawer
					anchor="right"
					open={drawerIsOpen}
					onClose={() => setDrawerIsOpen(false)}
				>
					<GraphForm
						graphData={selectedGraph}
						setDrawerIsOpen={setDrawerIsOpen}
					/>
				</Drawer>
				{canAddGraph && (
					<div
						style={{
							marginTop: 30,
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<Button
							startIcon={<AddCircleOutlineIcon />}
							color="secondary"
							variant="contained"
							onClick={() => {
								openGraphForm();
							}}
						>
							Add New Graph
						</Button>
					</div>
				)}

				<div
					style={{
						display: "flex",
						flexWrap: "wrap",
						flexDirection: "row",
						justifyContent: "center",
					}}
				>
					{graphs.map((graph) => (
						<GraphCard
							id={graph.id}
							title={graph.title}
							summary={graph.summary}
							imageURL={graph.imageURL}
							tags={graph.tags}
							editGraphMetaData={() => {
								openGraphForm(graph);
							}}
						/>
					))}
				</div>
			</div>
		</Fragment>
	);
};

export default AvailableGraphs;
