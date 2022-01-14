import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";

const DeleteTagModal = (props) => {
	const [newTagName, setNewTagName] = useState();

	const handleOnChange = (e) => {
		setNewTagName(e.target.value);
	};

	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title>Delete a tag</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3" controlId="formDeleteTag">
						<Form.Label>Tag name</Form.Label>
						<Form.Control
							onChange={handleOnChange}
							type="name"
							placeholder="Enter tag name"
						/>
					</Form.Group>
					<Form.Text id="deleteTagHelpBlock" muted>
						Enter the name of the tag you want to delete!. Tag names
						are case sensitive!
					</Form.Text>
					<Stack gap={0}>
						<Button
							onClick={() => props.handleDeleteTag(newTagName)}
							// onClick={props.handleDeleteAllTags}
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

export default DeleteTagModal;
