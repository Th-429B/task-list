import React, { useEffect, useState, Fragment } from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditTaskModal from "./EditTaskModal";
import AddTagModal from "./AddTagModal";
import axios from "axios";

const TaskComponent = (props) => {
	const [name, setName] = useState();
	const [id, setId] = useState();
	const [isCompleted, setIsCompleted] = useState();
	const [tags, setTags] = useState([]);

	// Edit modal
	const [showEditModal, setShowEditModal] = useState(false);

	const handleCloseEditModal = () => setShowEditModal(false);
	const handleShowEditModal = () => setShowEditModal(true);

	useEffect(() => {
		// console.log(props.item.relationships.tags.data)
		setName(props.item.attributes.name);
		setId(props.item.id);
		setIsCompleted(props.item.attributes.isCompleted);
		// setTags(props.item.relationships.tags.data)
		// console.log("this is the tags i sent to task component", props.tags)
		setTags(props.tags.filter((task) => task.attributes.task_id == id));
		// console.log("this is the tags in each task component", tags)
	}, [name, props.tags.length]);

	const getClassName = (status) => {
		return status ? "dark" : "light";
	};

	// need to talk to API to update completed status
	const handleClick = () => {
		console.log("buttong clicked");
		console.log(id);

		setIsCompleted(!isCompleted);
		props.onClickChangeStatus(id, !isCompleted);
	};

	const getTaskStatus = (status) => {
		return status ? "Completed!" : "Not Completed";
	};

	const getPillColor = (status) => {
		return status ? "success" : "warning";
	};

	const listTags = tags.map((item) => {
		return <Badge>{item.attributes.tagName}</Badge>;
	});

	const handleAddTag = () => {
		axios
			.post("api/v1/tags", { tagName: "test tag", task_id: id })
			.then((res) => {
				setTags([...tags, res.data.data]);
			});
			
	};

	const [newTaskName, setNewTaskName] = useState();
	const [showAddTagModal, setShowAddTagModal] = useState(false);

	const handleShowAddTagModal = () => {
		setShowAddTagModal(true);
	};

	const handleCloseAddTagModal = () => {
		setShowAddTagModal(false);
	};

	return (
		<Row>
			<Col>
				<ListGroup.Item
					action
					onClick={() => handleClick()}
					variant={getClassName(isCompleted)}
					className="d-flex justify-content-between align-items-start"
				>
					{name}
					<Col xs={2}>
						{listTags}
						<Badge bg={getPillColor(isCompleted)} pill>
							{getTaskStatus(isCompleted)}
						</Badge>
					</Col>
				</ListGroup.Item>
			</Col>
			<Col
				xs={3}
				className="d-flex justify-content-around align-items-center"
			>
				<Button onClick={handleShowAddTagModal}>Add Tags</Button>
				<Button onClick={handleShowEditModal}>Edit</Button>
				<Button
					onClick={() => props.handleDelete(id)}
					variant="danger"
					type="submit"
				>
					Delete
				</Button>
			</Col>
			<EditTaskModal
				show={showEditModal}
				onHide={handleCloseEditModal}
				onClickEditTask={props.handleEdit}
				taskId={id}
			></EditTaskModal>
			<AddTagModal
				show={showAddTagModal}
				onHide={handleCloseAddTagModal}
				handleAddTag={handleAddTag}
			></AddTagModal>
		</Row>
	);
};

export default TaskComponent;
