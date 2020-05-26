import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';


import '../style/index.css';

export default function Item(props) {
	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
	}));
	const classes = useStyles();

	return (
		<Card id={props.id} className="Cards" variant="outlined" data-testid = {props.test}>
			<IconButton onClick={props.deleteItem} aria-label="delete" className={classes.margin}>
				<DeleteIcon fontSize="large" />
			</IconButton>
			<Button onClick={props.editPost}>Edit</Button>
			<CardContent>
				<Typography  name="title" color="textSecondary" gutterBottom >
					Title
				</Typography>
				<Typography variant="h5" data-testid= {props.testTitle}  component="h2" className="toEdit">
					{props.Title}
				</Typography>
				<Typography className="pos" color="textSecondary" >
					Completed
				</Typography>
				<Typography variant="body2" data-testid= {props.testBody} component="p" label='post-body' className="toEdit">
					{props.completed}
				</Typography>
			</CardContent>
		</Card>
	);
}
