import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const AddTaskModal = (props) => {

	const [newTaskName, setNewTaskName] = useState();

	const handleOnChange = (e) => {
		console.log(e.target.value);
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
						<Button
							onClick={() => props.onClickAddTask(newTaskName)}
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				</Modal.Body>
		</Modal>
	);
};

export default AddTaskModal;
