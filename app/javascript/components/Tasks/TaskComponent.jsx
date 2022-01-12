import React, { useEffect, useState, Fragment } from "react";
import Badge from "react-bootstrap/Badge";
// import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const TaskComponent = (props) => {
	const [name, setName] = useState();
	const [id, setId] = useState();
	const [isCompleted, setIsCompleted] = useState();

	useEffect(() => {
		setName(props.item.attributes.name);
		setId(props.item.id);
		setIsCompleted(props.item.attributes.isCompleted);
	}, [name]);

	const getClassName = (status) => {
		return status ? "dark" : "light";
	};

	// need to talk to API to update completed status
	const handleClick = () => {
		console.log("buttong clicked");
		console.log(id);
		// console.log(item);
		// console.log(isCompleted);
		setIsCompleted(!isCompleted);
		console.log(isCompleted);
		// console.log(item);
	};

	const getTaskStatus = (status) => {
		return status ? "Completed!" : "Not Completed";
	};

	const getPillColor = (status) => {
		return status ? "success" : "warning";
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

					<Badge bg={getPillColor(isCompleted)} pill>
						{getTaskStatus(isCompleted)}
					</Badge>
				</ListGroup.Item>
			</Col>
			<Col xs={2} className="d-flex justify-content-around align-items-center">
				<Button>Edit</Button>
				<Button
				onClick={() => props.handleDelete(id)} 
				variant="danger"
				type="submit"
				>Delete</Button>
			</Col>
		</Row>
	);
};

export default TaskComponent;
