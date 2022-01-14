import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";

const AddTaskModal = (props) => {
	const [newTaskName, setNewTaskName] = useState();

	const handleOnChange = (e) => {
		setNewTaskName(e.target.value);
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add a Task!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formAddTask">
						<Form.Label>Task name</Form.Label>
						<Form.Control
							onChange={handleOnChange}
							type="name"
							placeholder="Enter task name"
						/>
					</Form.Group>
					<Stack>
						<Button
							onClick={() => props.onClickAddTask(newTaskName)}
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default AddTaskModal;
