import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import TaskComponent from "./TaskComponent";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import AddTaskModal from "./AddTaskModal";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTaskName, setNewTaskName] = useState();
	const [tags, setTags] = useState([]);

	useEffect(() => {
		// get all my tasks
		// update the tasks if there is change
		axios
			.get("/api/v1/tasks.json")
			.then((res) => {
				setTasks(res.data.data);
				setTags(res.data.included);
				// console.log(res.data.included);
				// console.log("this is the tags", tags);
			})
			.catch((res) => console.log(res));
		// console.log("this is the tasks in useEffect", tasks);
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

	const onClickDeleteTask = (id) => {
		// console.log(tasks)
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

	const onClickEditTask = (taskName, id) => {
		console.log("edit function called!");
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

	const onClickChangeStatus = (id, status) => {
		const url = "/api/v1/tasks/" + id;
		console.log(status);
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

	// Add modal
	const [showAddModal, setShowAddModal] = useState(false);

	const handleCloseAddModal = () => setShowAddModal(false);
	const handleShowAddModal = () => setShowAddModal(true);

	return (
		<Container>
			<div>This is where the tasks shld go</div>
			{/* <Button onClick={() => onClickAddTask()}>Add Task</Button> */}
			<Button onClick={handleShowAddModal}>Add Task</Button>
			<ListGroup>{listTasks}</ListGroup>

			<AddTaskModal
				show={showAddModal}
				onHide={handleCloseAddModal}
				onClickAddTask={onClickAddTask}
			></AddTaskModal>
		</Container>
	);
};

export default Tasks;
