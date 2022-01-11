import React, { useEffect, useState } from "react";
import axios from 'axios';

const Tasks = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() =>{
        // get all my tasks
        // update the tasks if there is change
        axios.get('/api/v1/tasks.json')
        .then( (res) => console.log(res))
        .catch( res => console.log(res))
    })



    return (
        <div>This is where the tasks shld go</div>
    )
}

export default Tasks