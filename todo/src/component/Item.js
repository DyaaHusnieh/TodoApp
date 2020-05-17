import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

import '../style/index.css';

export default function Item(props) {
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();

	return (
		<Card id={props.id} className="Cards" variant="outlined">
			<IconButton onClick={props.deleteItem} aria-label="delete" className={classes.margin}>
				<DeleteIcon fontSize="large" />
			</IconButton>
			<button onClick={props.editPost}>Edit</button>
			<CardContent>
				<Typography className="title" color="textSecondary" gutterBottom contentEditable="false">
					Title
				</Typography>
				<Typography variant="h5" component="h2">
					{props.Title}
				</Typography>
				<Typography className="pos" color="textSecondary" contentEditable="false">
					Completed
				</Typography>
				<Typography variant="body2" component="p">
					{props.completed}
				</Typography>
			</CardContent>
		</Card>
	);
}
