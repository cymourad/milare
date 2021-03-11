/**
 * This the page where the bulk of the work happens.
 * Depending on the privivliges of the user, they can either edit the graph or add translation to it.
 * We use side menus to let the user insert a new node.
 * When the user clicks on a node, they can open up a side meny to edit the text on it, or translate.
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Drawer from "@material-ui/core/Drawer";
import ReactFlow, {
	removeElements,
	addEdge,
	MiniMap,
	Controls,
	Background,
} from "react-flow-renderer";

import { getGraphWithID } from "../dummy/API";

const onLoad = (reactFlowInstance) => {
	console.log("flow loaded:", reactFlowInstance);
	reactFlowInstance.fitView();
};

const Graph = ({ canEdit, canTranslate }) => {
	const location = useLocation();
	console.log(location);
	const [isLoading, setIsLoading] = useState(true);
	const [elements, setElements] = useState([]);

	const fetchGraphData = () => {
		const graphData = getGraphWithID(location.state.id);
		console.log(graphData);
		setElements(graphData);
		setIsLoading(false);
	};

	useEffect(
		() => {
			fetchGraphData();
		},
		[] // fetch graoh data only once when you first load the graph
	);

	const onElementsRemove = (elementsToRemove) =>
		setElements((els) => removeElements(elementsToRemove, els));
	const onConnect = (params) => setElements((els) => addEdge(params, els));

	if (isLoading)
		return (
			<div style={{ textAlign: "center" }}>
				<CircularProgress style={{ margin: 50 }} />
			</div>
		);

	return (
		<div style={{ display: "flex", height: "90vh" }}>
			<ReactFlow
				elements={elements}
				onElementsRemove={onElementsRemove}
				onConnect={onConnect}
				onLoad={onLoad}
				snapToGrid={true}
				snapGrid={[15, 15]}
				deleteKeyCode={46} /* delete-key */
			>
				<MiniMap
					nodeStrokeColor={(n) => {
						if (n.style?.background) return n.style.background;
						if (n.type === "input") return "#0041d0";
						if (n.type === "output") return "#ff0072";
						if (n.type === "default") return "#1a192b";

						return "#eee";
					}}
					nodeColor={(n) => {
						if (n.style?.background) return n.style.background;

						return "#fff";
					}}
					nodeBorderRadius={2}
				/>
				<Controls />
				<Background color="#aaa" gap={16} />
			</ReactFlow>
		</div>
	);
};

export default Graph;

const initialElements = [
	{
		id: "1",
		type: "input",
		data: { label: "Node 1" },
		position: { x: 250, y: 5 },
	},
	// you can also pass a React Node as a label
	{ id: "2", data: { label: <div>Node 2</div> }, position: { x: 100, y: 100 } },
	{ id: "e1-2", source: "1", target: "2", animated: true },
];
