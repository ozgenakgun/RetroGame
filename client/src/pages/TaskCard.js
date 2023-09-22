// this might be useful to transfer task details as a prop to the next component

import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from "react-router-dom";

const TaskCard = ({ task: { taskName, taskID, taskDesc, taskComplete } }) => {
    if (taskComplete) {
        var cName = "completedTask"
    } else {
        var cName = "taskListButn"
    }
  return (
    <div className="taskCard">
        <Link to={{pathname:"/taskListDetail", state: {taskName, taskID, taskDesc, taskComplete} }}><button className={"taskListBtn"} id={cName}>{taskName}</button></Link>
        
    </div>
    
  )
}

TaskCard.propTypes = {
    task: PropTypes.object.isRequired
}

export default TaskCard
