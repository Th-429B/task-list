import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";

const TagToolTip = () => {
  
	const [show, setShow] = useState(false);
	const [target, setTarget] = useState(null);
	const ref = useRef(null);

	const handleClick = (event) => {
		setShow(!show);
		setTarget(event.target);
	};

	return (
		<div ref={ref}>
			<Button onClick={handleClick}>Help Tag</Button>

			<Overlay
				show={show}
				target={target}
				placement="bottom"
				container={ref}
				containerPadding={20}
			>
				<Popover id="popover-contained">
					<Popover.Header as="h3">Help: Tag</Popover.Header>
					<Popover.Body>
						Click on the '+' and '-' buttons under "Tag Button" to
						add or delete your tags
						<br />
						Deleting tags require you to specify the tag name to be
						deleted. Do note that it is case sensitive!
						<br />
						<strong>Note</strong> If task does not appear after
						hitting submit, please refresh the page
					</Popover.Body>
				</Popover>
			</Overlay>
		</div>
	);
};

export default TagToolTip;
