import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Item from '../component/Item';
import { useHistory } from 'react-router-dom';
import CreateItem from '../component/CreateItem';
import { Button } from '@material-ui/core';
import '../style/index.css';

const TodoList = (props) => {
	let history = useHistory();
	let editable = false;
	const [Cards, setCards] = useState('');

	useEffect(() => {
		let id = localStorage.getItem('userid');
		
		const res = id === props.match.params.userid;
		if (!res) {
			history.replace('/');
		}

		if (id) {
			props.onRequestApiData();
		} else {
			history.replace('/');
		}
	}, []);

	useEffect(() => {
		let List;

		if (props.todoList.length > 1) {
			List = props.todoList.filter((element) => {
				return element.userId + '' === localStorage.getItem('userid');
			});

			const items = List.map((item, index) => {
				return (
					<Item
						Title={item.title}
						completed={item.completed + ''}
						key={index}
						deleteItem={() => handelDeleteItem(item.id)}
						editPost={() => handelEditPost(item.userId, item.id, index)}
						id={'todoList-' + item.id}
						test = {'todoList-' + item.id}
						testTitle = {'post-title-' + item.id}
						testBody = {'post-body-' + item.id}
					/>
				);
			});
			setCards(items);
		}
	}, [props.todoList]);

	const handelDeleteItem = (id) => {
		props.onDleleteItem(id);
	};

	const handelEditPost = (userid, id, index) => {
		let doc = document.getElementById(`todoList-${id}`).getElementsByClassName('toEdit');
		doc[0].contentEditable = false;
		doc[1].contentEditable = false;

		if (editable === true) {
			editable = false;
			doc[0].style.color = 'black';
			doc[1].style.color = 'black';
			const val = doc;
			const title = val[0].innerHTML;
			const body = val[1].innerHTML;

			props.onEditPost(userid, id, title, body, index);
		} else {
			doc[0].contentEditable = true;
			doc[1].contentEditable = true;
			doc[0].style.color = 'red';
			doc[1].style.color = 'red';

			editable = true;
		}
	};

	const handelLogout = () => {
		localStorage.clear();
		history.push('/');
	};
	return (
		<div>
			<Button
				className="logout"
				variant="contained"
				color="secondary"
				onClick={handelLogout}
				data-testid="logout"
			>
				Logout
			</Button>
			<CreateItem/>

			<div data-testid="Cards" className="items">{Cards}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		Count: state.todoList.counter,
		todoList: state.todoList.todoList,
	};
};

const DispatchToProps = (dispatch) => {
	return {
		onRequestApiData: () => dispatch({ type: 'REQUEST_API_TODOLIST' }),
		onDleleteItem: (id) => dispatch({ type: 'DELETE_ITEM', resultId: id }),
		onEditPost: (userid, id, title, body, index) =>
			dispatch({
				type: 'EDIT_POST',
				currUserid: userid,
				currId: id,
				currTitle: title,
				currBody: body,
				currIndex: index,
			}),
	};
};

export default connect(mapStateToProps, DispatchToProps)(TodoList);
