import axios from "axios";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import React, { useEffect, useState, Fragment } from "react";
import Row from "react-bootstrap/Row";

import AddTagModal from "./Modals/AddTagModal";
import DeleteTagModal from "./Modals/DeleteTagModal";
import EditTaskModal from "./Modals/EditTaskModal";

const TaskComponent = (props) => {
	const [name, setName] = useState();
	const [id, setId] = useState();
	const [isCompleted, setIsCompleted] = useState();
	const [tags, setTags] = useState([]);

	// Edit modal
	const [showAddTagModal, setShowAddTagModal] = useState(false);
	const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);

	const handleShowAddTagModal = () => {
		setShowAddTagModal(true);
	};

	const handleCloseAddTagModal = () => {
		setShowAddTagModal(false);
	};

	const handleShowDeleteTagModal = () => {
		setShowDeleteTagModal(true);
	};

	const handleCloseDeleteTagModal = () => {
		setShowDeleteTagModal(false);
	};

	const handleCloseEditModal = () => {
		setShowEditModal(false);
	};

	const handleShowEditModal = () => {
		setShowEditModal(true);
	};

	useEffect(() => {
		setName(props.item.attributes.name);
		setId(props.item.id);
		setIsCompleted(props.item.attributes.isCompleted);
		setTags(props.tags.filter((task) => task.attributes.task_id == id));
	}, [name, props.tags.length]);

	const getClassName = (status) => {
		return status ? "dark" : "light";
	};

	// need to talk to API to update completed status
	const handleClick = () => {
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
		return <Badge bg="info">{item.attributes.tagName}</Badge>;
	});

	// method calls to backend
	const handleAddTag = (name) => {
		axios
			.post("api/v1/tags", { tagName: name, task_id: id })
			.then((res) => {
				setTags([...tags, res.data.data]);
			});
	};

	const handleDeleteTag = (name) => {
		// find the id from name
		const taglist = [...tags];
		// maybe a method to remove white space here
		const index = taglist.findIndex(
			(data) => data.attributes.tagName == name
		);
		const id = taglist[index].id;

		const url = "/api/v1/tags/" + id;
		axios.delete(url).then((data) => {
			taglist.splice(index, 1);
			setTags(taglist);
		});
	};

	const handleDeleteTask = () => {
		const tagList = [...tags];
		tagList.forEach((ele) => {
			const tagId = ele.id;
			const url = "/api/v1/tags/" + tagId;
			axios.delete(url);
		});
		setTags([]);
		props.handleDelete(id);
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
						{listTags}{" "}
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
				<Button onClick={handleShowAddTagModal}>+</Button>
				<Button onClick={handleShowDeleteTagModal}> -</Button>
				<div className="vr" />
				{/* <Button onClick={() => handleDeleteTag("test tag")}> -</Button> */}
				<Button onClick={handleShowEditModal}>Edit</Button>
				<Button
					onClick={() => {
						handleDeleteTask();
					}}
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
			<DeleteTagModal
				show={showDeleteTagModal}
				onHide={handleCloseDeleteTagModal}
				handleDeleteTag={handleDeleteTag}
				handleDeleteAllTags={handleDeleteTask}
			></DeleteTagModal>
		</Row>
	);
};

export default TaskComponent;
