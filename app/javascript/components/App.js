import React, { Fragment } from "react";
import Tasks from "../components/Tasks/Tasks";


const App = () => {
	return (
		<Fragment>
			<h1 className="d-flex justify-content-center font-weight-bold">Task List</h1>
			<p className="d-flex justify-content-center">Simple CRUD Task List made with Rails and postgresql</p>
			<Tasks />
		</Fragment>
	);
};

export default App;
