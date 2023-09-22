import React, { Fragment } from "react";
import { Link, Redirect, useLocation } from "react-router-dom";
import '../design/taskListDetail.css';
import BackArrow from "../resources/backArrow.png";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';

function TaskDetailPage() {

  const location = useLocation();
  const taskName = location.state?.taskName;
  const taskID = location.state?.taskID;
  const taskDesc = location.state?.taskDesc;
  const taskComplete = location.state?.taskComplete;

  if (taskComplete) {
    var completeText = "COMPLETE";
  } else{
    var completeText = "NOT COMPLETE";
  }

    return (
      <Fragment>
        <Link to={"/taskList"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
        <img id="backArrow_none" src={BackArrow} alt="backArrow" />
        
        <p id="tldetheader"><span className="text">{taskName}</span></p>
        <p id="tldetheader"><span className="text">{completeText}</span></p>
        <p id="dettable">
          {taskDesc}
        </p>

        {/*<button id="tldetbtn1">upload</button>*/}
      </Fragment>
    );
  }

  TaskDetailPage.prototypes = {
    
  };
  
  export default TaskDetailPage;
  