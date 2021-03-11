/**
 * This file has dummy functions that mimic the behavior of the app talking to the back-end.
 */

export const getAllGraphs = () => {
	return GRAPHS;
};

export const addNewGraph = (title, summary, imageURL, tags = []) => {
	graphIDcounter++;

	GRAPHS.append({
		id: graphIDcounter,
		title,
		summary,
		imageURL,
		tags,
	});

	return {
		id: graphIDcounter,
		title,
		summary,
		imageURL,
		tags,
	};
};

export const updateGraph = (id, title, summary, imageURL, tags) => {
	const graphIndex = GRAPHS.findIndex((graph) => graph.id == id);

	GRAPHS[graphIndex].title = title;
	GRAPHS[graphIndex].summary = summary;
	GRAPHS[graphIndex].imageURL = imageURL;
	GRAPHS[graphIndex].tags = tags;

	return GRAPHS[graphIndex];
};

const TAG = {
	CHILDREN: "children",
	SEASONAL: "seasonal",
	CHRONIC: "chronic",
};

const GRAPHS = [
	{
		id: 1,
		title: "Back Pain",
		summary:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In volutpat felis sed sapien molestie, in aliquet tellus vulputate. Curabitur eget iaculis quam, id cursus tortor. Nullam consequat sem non nibh aliquam consectetur.",

		imageURL:
			"https://cornerstonephysio.com/wp-content/uploads/2019/07/back-pain.jpg",
		tags: [TAG.CHRONIC],
	},
	{
		id: 2,
		title: "Fever",
		summary:
			"Nulla sed lectus at nulla scelerisque molestie. Maecenas fringilla enim id purus commodo, in pharetra mi bibendum. Integer ac enim nec tortor hendrerit tempus. Cras sed elementum lectus, a viverra sem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
		imageURL:
			"https://health.clevelandclinic.org/wp-content/uploads/sites/3/2019/02/bodyHappenFever-1006577818-770x553.jpg",
		tags: [TAG.CHILDREN, TAG.SEASONAL],
	},
	{
		id: 3,
		title: "Cough",
		summary:
			"Duis lacus tellus, congue maximus augue sit amet, fermentum tristique massa. Pellentesque aliquet eleifend pellentesque. Maecenas lacinia, odio sit amet fermentum volutpat, sem turpis fringilla risus, ac porta leo purus eu lectus.",
		imageURL:
			"https://www.clevelandclinic.org/healthinfo/ShowImage.ashx?PIC=4486",
		tags: [TAG.SEASONAL],
	},
];

const graphIDcounter = 3;

export const getGraphWithID = (id) => {
	return nodesAndLinksForGraph[id];
};

const nodesAndLinksForGraph = {
	1: [
		{
			id: "1",
			type: "input", // input node
			data: { label: "Back Pain" },
			position: { x: 350, y: 25 },
		},
		// default node
		{
			id: "2",
			// you can also pass a React component as a label
			data: { label: <div>First Question</div> },
			position: { x: 50, y: 125 },
		},
		{
			id: "3",
			// you can also pass a React component as a label
			data: { label: <div>Second Question</div> },
			position: { x: 350, y: 125 },
		},
		{
			id: "4",
			// you can also pass a React component as a label
			data: { label: <div>Third Question</div> },
			position: { x: 650, y: 125 },
		},
		{
			id: "5",
			type: "output", // output node
			data: { label: "Final Asnwer" },
			position: { x: 250, y: 250 },
		},
		// animated edge
		{ id: "e1-2", source: "1", target: "2", animated: true },
		{ id: "e1-3", source: "1", target: "3", animated: true },
		{ id: "e1-4", source: "1", target: "4", animated: true },
		{ id: "e2-5", source: "2", target: "5" },
	],
	2: [
		{
			id: "1",
			type: "input", // input node
			data: { label: "Input Node" },
			position: { x: 250, y: 25 },
		},
		// default node
		{
			id: "2",
			// you can also pass a React component as a label
			data: { label: <div>Default Node</div> },
			position: { x: 100, y: 125 },
		},
		{
			id: "3",
			type: "output", // output node
			data: { label: "Output Node" },
			position: { x: 250, y: 250 },
		},
		// animated edge
		{ id: "e1-2", source: "1", target: "2", animated: true },
		{ id: "e2-3", source: "2", target: "3" },
	],
	3: [
		{
			id: "1",
			type: "input", // input node
			data: { label: "Input Node" },
			position: { x: 250, y: 25 },
		},
		// default node
		{
			id: "2",
			// you can also pass a React component as a label
			data: { label: <div>Default Node</div> },
			position: { x: 100, y: 125 },
		},
		{
			id: "3",
			type: "output", // output node
			data: { label: "Output Node" },
			position: { x: 250, y: 250 },
		},
		// animated edge
		{ id: "e1-2", source: "1", target: "2", animated: true },
		{ id: "e2-3", source: "2", target: "3" },
	],
};
