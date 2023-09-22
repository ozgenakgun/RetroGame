import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/taskList.css';
import BackArrow from "../resources/backArrow.png";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../actions/alert';
import { getUserTasks } from '../actions/tasks';
import Spinner from './spinner';
import TaskCard from './TaskCard';

function TaskListPage({ auth, setAlert, getUserTasks, tasks: {tasks, loading} }) {

  useEffect(() => {
    getUserTasks();
  }, []);

  // this array has details of all tasks
  var tasksArray = [];
  tasks.category.map(cat => {
    cat.tasks.map(t => {
      tasksArray.push(t);
      //console.log(t);
    })
  })

    return (
      <Fragment>
        { loading ? <Spinner /> : 
        <Fragment>
          <Link to={"/main"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
          <img id="backArrow_none" src={BackArrow} alt="backArrow" />
   
          <p id="tlheader"><span className="text">task list</span></p>
          <div id="taskContainer">
          { tasksArray.map(task => (
            <TaskCard task={task} key={task.taskID}/>
          )) }
          </div>
  
        </Fragment>}
      
      
     {/*this part may be shown with js after connecting to db */}
    </Fragment>
    );
  }

  TaskListPage.prototypes = {
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getUserTasks: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    tasks: state.tasks
  });
  
  export default connect(mapStateToProps, { setAlert, getUserTasks })(TaskListPage);
  