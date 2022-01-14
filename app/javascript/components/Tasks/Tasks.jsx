import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState } from "react";

import TaskComponent from "./TaskComponent";
import AddTaskModal from "./Modals/AddTaskModal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import TaskToolTip from "./ToolTips/TaskToolTip";
import TagToolTip from "./ToolTips/TagToolTip";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [tags, setTags] = useState([]);
	
	// Add modal
	const [showAddModal, setShowAddModal] = useState(false);
	
	const handleCloseAddModal = () => setShowAddModal(false);
	const handleShowAddModal = () => setShowAddModal(true);

	useEffect(() => {
		// get all my tasks
		// update the tasks if there is change
		axios
			.get("/api/v1/tasks.json")
			.then((res) => {
				setTasks(res.data.data);
				setTags(res.data.included);
			})
			.catch((res) => console.log(res));
	}, [tasks.length, tags.length]);

	const styles = {
		fontWeight: "bold",
	};

	// create a new task
	const onClickAddTask = (taskName) => {
		axios
			.post("api/v1/tasks", { name: taskName, isCompleted: false })
			.then((res) => {
				setTasks([...tasks, res.data.data]);
			});
	};

	// delete a task
	const onClickDeleteTask = (id) => {
		const url = "/api/v1/tasks/" + id;
		axios
			.delete(url)
			.then((data) => {
				// console.log("this is the id of the task to be deleted", id)
				const taskslist = [...tasks];
				const index = taskslist.findIndex((data) => data.id == id);
				// console.log("this is the index of the tasks to be deleted", index)
				taskslist.splice(index, 1);
				// console.log("this is the tasklist", taskslist)
				setTasks([taskslist]);
				// console.log("this is the tasks", tasks)
				// console.log(index)
			})
			.catch((data) => console.log("Error", data));
	};

	// edit a task
	const onClickEditTask = (taskName, id) => {
		const url = "/api/v1/tasks/" + id;
		axios
			.patch(url, { name: taskName })
			.then((data) => {
				const taskslist = [...tasks];
				const index = taskslist.findIndex((data) => data.id == id);
				taskslist[index].attributes.name = taskName;
				setTasks(taskslist);
			})
			.catch((data) => console.log("Error", data));
	};

	// update status
	const onClickChangeStatus = (id, status) => {
		const url = "/api/v1/tasks/" + id;
		axios
			.patch(url, { isCompleted: status })
			.then((data) => {
				const taskslist = [...tasks];
				const index = taskslist.findIndex((data) => data.id == id);
				taskslist[index].attributes.isCompleted = status;
				setTasks(taskslist);
			})
			.catch((data) => console.log("Error", data));
	};

	// list all tasks
	const listTasks = tasks.map((item) => {
		return (
			<TaskComponent
				onClickChangeStatus={onClickChangeStatus}
				handleDelete={onClickDeleteTask}
				handleEdit={onClickEditTask}
				item={item}
				tags={tags}
			></TaskComponent>
		);
	});


	const sortName = () => {
		const taskslist = [...tasks];
		taskslist.sort(function (a, b) {
			var nameA = a.attributes.name.toUpperCase(); // ignore upper and lowercase
			var nameB = b.attributes.name.toUpperCase(); // ignore upper and lowercase
			if (nameA < nameB) {
				return -1;
			}
			if (nameA > nameB) {
				return 1;
			}

			// names must be equal
			return 0;
		});
		setTasks(taskslist);
		console.log(tasks);
		console.log(taskslist);
	};

	return (
		<Container>
			<Row>
				<Col>
					<Button variant="outline-primary" disabled>
						Here are your tasks!
					</Button>{" "}
				</Col>
				<Col xs={2} className="d-flex justify-content-end">
					<Button onClick={handleShowAddModal}>Add A Task Here!</Button>
				</Col>
				<Col
					xs={3}
					className="d-flex justify-content-around align-items-center"
				>
					<Badge bg="secondary">Tag Button</Badge>
					<Badge bg="secondary">Task Button</Badge>
				</Col>
			</Row>

			{/* <p>&nbsp;</p> */}
			<ListGroup>{listTasks}</ListGroup>

			<AddTaskModal
				show={showAddModal}
				onHide={handleCloseAddModal}
				onClickAddTask={onClickAddTask}
			></AddTaskModal>
			<p>&nbsp;</p>
			<Row>
				<Col xs={3}
				className="d-flex justify-content-around">
					<TaskToolTip />
					<TagToolTip />
				</Col>
			</Row>
		</Container>
	);
};

export default Tasks;
