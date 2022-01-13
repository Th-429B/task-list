import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AddTagModal from "./AddTagModal";

const EditTaskModal = (props) => {


	const handleOnChange = (e) => {
		console.log(e.target.value);
		setNewTaskName(e.target.value);
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Edit the task {}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formEditTask">
						<Form.Label>Task name</Form.Label>
						<Form.Control
							onChange={handleOnChange}
							type="name"
							placeholder="Enter task name"
						/>
					</Form.Group>
					<Button
						onClick={() =>
							props.onClickEditTask(newTaskName, props.taskId)
						}
						variant="primary"
						type="submit"
					>
						Submit
					</Button>
					<Button onClick={props.handleShowModal} variant="primary">
						Edit tags
					</Button>

				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditTaskModal;
