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
