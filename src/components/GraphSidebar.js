/**
 * This is the sidebar that the user sees when they are editing the graph.
 * Depending on their privilieges, the user can either:
 * - translate a node
 * - add a new node
 * - edit a node (its type or its text)
 */

import React, { useState, useEffect } from "react";
import EditNodeForm from "./EditNodeForm";
import InsertNodeSidebar from "./InsertNodeSidebar";
import TranslateForm from "./TranslateForm";
import ListOfTranslations from "./ListOfTranslations";
import { getGrapTagsForID } from "../dummy/API";
import TagForm from "./TagForm";

const GraphSidebar = ({
	canEdit,
	canTranslate,
	isAdmin,
	selectedNode, // object that has {id, data: {label, translation, isQuestion, tags}}
	chiefComplaintID,
	translationLanguage,
}) => {
	const [availableTags, setAvaialbleTags] = useState([]);

	const fetchAvailableTags = () => {
		const data = getGrapTagsForID(chiefComplaintID);
		setAvaialbleTags(data);
	};
	useEffect(
		() => {
			fetchAvailableTags();
		},
		[] // only load once when component first renderes
	);

	return (
		<aside>
			{/* {canEdit && <InsertNodeSidebar />} */}
			{canEdit && (
				<div>
					<InsertNodeSidebar />
					<TagForm
						availableTags={availableTags}
						chiefCompaintID={chiefComplaintID}
					/>
					<EditNodeForm
						nodeID={selectedNode ? selectedNode.id : null}
						nodeEnglishText={selectedNode ? selectedNode.data.label : ""}
						nodeIsQuestion={selectedNode ? selectedNode.data.isQuestion : null}
						nodeTags={selectedNode ? selectedNode.data.tags : null}
						availableTags={availableTags}
					/>
				</div>
			)}
			{canTranslate && (
				<TranslateForm
					nodeID={selectedNode ? selectedNode.id : null}
					englishText={selectedNode ? selectedNode.data.label : ""}
					translationLanguage={translationLanguage}
					translatedText={selectedNode ? selectedNode.data.translation : ""}
				/>
			)}
			{/* {isAdmin && (
				<ListOfTranslations
					englishText={selectedNodeEnglishText}
					nodeID={selectedNodeID}
				/>
			)} */}
		</aside>
	);
};

export default GraphSidebar;
