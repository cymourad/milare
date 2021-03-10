/**
 * This component renders a graph card that shows the summary of a graph.
 * - name of case
 * - tags
 * - image
 * - quick summary
 */

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FRONT_END_ROUTE from "../resources/routes/frontEndRoutes";

const useStyles = makeStyles({
	root: {
		width: 345,
		margin: 50,
	},
	media: {
		height: 140,
	},
});

const GraphCard = ({ title, tags, imageURL, summary, editGraphMetaData }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardMedia className={classes.media} image={imageURL} title={title} />
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{title}
					</Typography>
					{tags.length > 0 &&
						tags.map((tag) => (
							<Chip
								size="small"
								label={tag}
								color="secondary"
								style={{ margin: 5 }}
							/>
						))}
					<Typography variant="body2" color="textSecondary" component="p">
						{summary}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Link
					to={
						FRONT_END_ROUTE.GRAPH +
						"/" +
						title.toLowerCase().split(" ").join("-")
					}
				>
					<Button
						size="small"
						color="primary"
						style={{ textDecoration: "none" }}
					>
						Edit Graph
					</Button>
				</Link>
				<Button size="small" color="primary" onClick={editGraphMetaData}>
					Edit Meta-data
				</Button>
			</CardActions>
		</Card>
	);
};

export default GraphCard;
