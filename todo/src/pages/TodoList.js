import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Item from '../component/Item';
import { useHistory } from 'react-router-dom';
import CreateItem from '../component/CreateItem';
import { Button } from '@material-ui/core';
import "../style/index.css";

const TodoList = (props) => {
	let history = useHistory();
	let editable = false;
	const [Cards, setCards] = useState('');
	useEffect(() => {
		let id = localStorage.getItem('userid');
		// console.log("local storeage todod list ", localStorage.getItem('userid'));
		
		if (id) {
			props.onRequestApiData();
		} else {
			history.replace('/');
		}
	},[] );

	useEffect(() => {
		let List;

		if (props.todoList.length > 1) {
			// console.log('local', localStorage.getItem('userid'));
			List = props.todoList.filter((element) => {
				// console.log(typeof element.userId)
				// console.log(typeof localStorage.getItem('userid'))

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
						id={item.id}
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
		if (editable === true) {
			document.getElementById(`${id}`).contentEditable = false;
			editable = false;
			document.getElementById(`${id}`).style.color = 'black';
			const val = document.getElementById(`${id}`).children;
			const myelements = val[2].children;
			const title = myelements[1].innerHTML;
			const body = myelements[3].innerHTML;

			// console.log("myelements[1]" , myelements[1].innerHTML)
			// console.log("myelements[1]" , myelements[3].innerHTML)

			props.onEditPost(userid, id, title, body, index);
		} else {
			
			document.getElementById(`${id}`).contentEditable = true;
			document.getElementById(`${id}`).style.color = 'red';
			editable = true;
		}
	};

	const handelLogout = () =>{
		localStorage.clear();
		history.push('/');
	}
	return (
		<div>
			{/* <h1>Todo List {console.log("params" , props.match.params)} </h1> */}
			<Button className='logout' variant="contained" color="secondary" onClick={handelLogout}>
				Logout
			</Button>
			<CreateItem/>
		
			<div className="items">{Cards}
			</div>
			
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
