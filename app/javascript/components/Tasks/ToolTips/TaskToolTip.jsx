import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const TaskToolTip = () => {
  
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	return (
		<div ref={ref}>
			<Button onClick={handleClick}>Help Task</Button>

			<Overlay
				show={show}
				target={target}
				placement="bottom"
				container={ref}
				containerPadding={20}
			>
				<Popover id="popover-contained">
					<Popover.Header as="h3">Help: Task</Popover.Header>
					<Popover.Body>
						Click on the Blue "Add Task" button on top to add a
						Task!
						<br />
						Enter the task name and hit that submit button!
						<br />
						To edit or delete your tasks, click on the buttons below
						"Task Buttons" <br />
						To mark a task as complete, just click on the task!{" "}
						<br />
						<strong>Note</strong> If task does not appear after
						hitting submit, please refresh the page
					</Popover.Body>
				</Popover>
			</Overlay>
		</div>
	);
};

export default TaskToolTip;
