import React, { Fragment } from "react";
import Tasks from "../components/Tasks/Tasks";


const App = () => {
	return (
		<Fragment>
			<h1 className="d-flex justify-content-center">Task List</h1>
			<Tasks />
		</Fragment>
	);
};

export default App;
