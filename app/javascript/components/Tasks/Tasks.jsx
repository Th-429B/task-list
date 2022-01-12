import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import TaskComponent from "./TaskComponent";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Tasks = () => {
	const [tasks, setTasks] = useState([]);
	const [newTaskName, setNewTaskName] = useState();

	useEffect(() => {
		// get all my tasks
		// update the tasks if there is change
		axios
			.get("/api/v1/tasks.json")
			.then((res) => setTasks(res.data.data))
			.catch((res) => console.log(res));
		console.log("this is the tasks in useEffect",tasks)
	}, [tasks.length]);

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
		const url = "/api/v1/tasks/" + id
		axios.delete(url)
		.then((data) => {
			console.log("this is the id of the task to be deleted", id)
			const taskslist = [...tasks]
			const index = taskslist.findIndex((data) => data.id == id)
			console.log("this is the index of the tasks to be deleted", index)
			taskslist.splice(index, 1)
			console.log("this is the tasklist", taskslist)
			setTasks([taskslist])
			console.log("this is the tasks", tasks)
			// console.log(index)
		})
		.catch(data => console.log('Error', data))
		// const taskslist = [...tasks];
		
		// console.log("delete function called")
	}

	const handleOnChange = (e) => {
		console.log(e.target.value);
		setNewTaskName(e.target.value);
	};

	const List = tasks.map((item) => {
		return <TaskComponent handleDelete={onClickDeleteTask} item={item}></TaskComponent>;
	});

	// modal
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<Container>
			<div>This is where the tasks shld go</div>
			{/* <Button onClick={() => onClickAddTask()}>Add Task</Button> */}
			<Button onClick={handleShow}>Add Task</Button>
			<ListGroup>{List}</ListGroup>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a Task!</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label>Task name</Form.Label>
							<Form.Control
								onChange={handleOnChange}
								type="name"
								placeholder="Enter task name"
							/>
							{/* <Form.Text className="text-muted">
								We'll never share your email with anyone else.
							</Form.Text> */}
						</Form.Group>
						<Button
							onClick={() => onClickAddTask(newTaskName)}
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</Container>
	);
};

export default Tasks;
