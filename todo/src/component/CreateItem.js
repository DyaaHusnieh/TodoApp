import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import '../style/index.css';

const CreateItem = (props) => {
	const [Title, setTitle] = useState('');
	const [body, setBody] = useState('');

	const handleAddItem = () => {
		const userId = localStorage.getItem('userid');
		props.onAddItem(userId, Title, body);
	};

	const useStyles = makeStyles((theme) => ({
		root: {
			width: '100%',
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			flexBasis: '33.33%',
			flexShrink: 0,
		},
		secondaryHeading: {
			fontSize: theme.typography.pxToRem(15),
			color: theme.palette.text.secondary,
		},
	}));

	const classes = useStyles();
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			<ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<ExpansionPanelSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1bh-content"
					id="panel1bh-header"
				>
					<Typography className={classes.heading}>Add new item to your list</Typography>
					<Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails className="addItem">
					<Typography>
						<div>
							<TextField
								id="title"
								label="Title"
								type="text"
								onChange={(e) => setTitle(e.target.value)}
							/>
							<br />
							<TextField id="body" label="Body" type="text" onChange={(e) => setBody(e.target.value)} />
							<br />
							<br />

							<Button variant="contained" color="primary" onClick={handleAddItem}>
								Add
							</Button>
						</div>
					</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		todoList: state.todoList.todoList,
	};
};

const DispatchToProps = (dispatch) => {
	return {
		onAddItem: (userId, title, body) =>
			dispatch({
				type: 'ADD_ITEM',
				newUserId: userId,
				newTitle: title,
				newBody: body,
			}),
	};
};

export default connect(mapStateToProps, DispatchToProps)(CreateItem);
