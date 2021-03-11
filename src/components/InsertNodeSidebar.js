import React from "react";

export default () => {
	const onDragStart = (event, nodeType) => {
		event.dataTransfer.setData("application/reactflow", nodeType);
		event.dataTransfer.effectAllowed = "move";
	};

	return (
		<aside>
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
		</aside>
	);
};
