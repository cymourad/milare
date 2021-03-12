/**
 * This simple list shows the translations of all languages of this node to the admin.
 *
 * Props:
 * - englishText [string]
 * - nodeID
 *
 * nodeID will be used to get:
 * - translations [array of objects] where each object has
 * -- language [string]
 * -- translationsPerRegion [array of objects] where each object has
 * --- regionName [string]
 * --- translations [array of strings] where each string is a translation
 *
 * // TODO make the regions collapsable
 * // TODO add icons to the regions
 */

import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}));

const ListOfTranslations = ({ englishText, nodeID }) => {
	const classes = useStyles();

	const [isLoading, setIsLoading] = useState(true); // start by loading till we fetch translations
	const [translations, setTranslations] = useState([]);

	useEffect(
		() => {
			// TODO get the translations of this node
			setTranslations(t);
			setIsLoading(false);
		},
		[] // load only once when you first render the object
	);

	// objects to control the state of different languages being opened/closed
	// a property is the name of the language
	// the value a boolean indicating whether the language is expanded or not
	const [open, setOpen] = useState(
		translations.reduce(
			(acc, translationsForLanguage) => (
				(acc[translationsForLanguage.language] = false), acc
			),
			{}
		)
	);

	const handleClick = (language) => {
		const isOpen = open[language];
		setOpen({ ...open, [language]: !isOpen });
	};

	if (isLoading) return <CircularProgress />;

	return (
		<div>
			<Typography>{englishText}</Typography>
			<List
				component="nav"
				aria-labelledby="nested-list-subheader"
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Translations
					</ListSubheader>
				}
				className={classes.root}
			>
				{translations.map((translationsForLanguage) => {
					const { language, translationsPerRegion } = translationsForLanguage;
					return (
						<div>
							<ListItem button onClick={() => handleClick(language)}>
								<ListItemText primary={language} />
								{open[language] ? <ExpandLess /> : <ExpandMore />}
							</ListItem>
							<Collapse in={open[language]} timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									{translationsPerRegion.map((region) => (
										<ListItem button className={classes.nested}>
											<ListItemText primary={region.user_message} />
											<List component="div" disablePadding>
												{region.translations.map((translation) => (
													<ListItemText primary={translation} />
												))}
											</List>
										</ListItem>
									))}
								</List>
							</Collapse>
						</div>
					);
				})}
			</List>
		</div>
	);
};

export default ListOfTranslations;

const t = [
	{
		language: "Arabic",
		translationsPerRegion: [{ regionName: "Egypt", translations: ["1", "2"] }],
	},
];
