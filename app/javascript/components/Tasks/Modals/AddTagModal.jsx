import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";


const AddTagModal = (props) => {
	const [newTagName, setNewTagName] = useState();

	const handleOnChange = (e) => {
		setNewTagName(e.target.value);
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Add a tag</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formAddTag">
						<Form.Label>Tag name</Form.Label>
						<Form.Control
							onChange={handleOnChange}
							type="name"
							placeholder="Enter tag name"
						/>
					</Form.Group>
					<Stack gap={0}>
						<Button
							onClick={() => props.handleAddTag(newTagName)}
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

export default AddTagModal;
