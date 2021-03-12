/**
 * This menu goes in the Sidebar for a graph.
 * It allows a user to drag a new node into the graph
 */

import React from "react";

const InsertNodeSidebar = () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<div>
			<div style={{ margin: 20 }}>
				You can drag these nodes to the pane on the right.
			</div>
			{/* <div
				className="dndnode input"
				onDragStart={(event) => onDragStart(event, "input")}
				draggable
			>
				Input Node
			</div> */}
			<div
				style={{
					margin: 20,
					padding: 10,
					borderStyle: "solid",
					borderRadius: 3,
					borderColor: "black",
					borderWidth: 2,
					textAlign: "center",
					width: 200,
				}}
				onDragStart={(event) => onDragStart(event, "default")}
				draggable
			>
				Question/Answer
			</div>
			<div
				style={{
					margin: 20,
					padding: 10,
					borderStyle: "solid",
					borderRadius: 3,
					borderColor: "#ff0072",
					borderWidth: 2,
					textAlign: "center",
					width: 200,
				}}
				onDragStart={(event) => onDragStart(event, "output")}
				draggable
			>
				Final Answer
			</div>
		</div>
	);
};

export default InsertNodeSidebar;
