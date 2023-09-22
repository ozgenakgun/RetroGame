import React, { Fragment, useState }from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/adminPage.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutAdmin } from '../actions/auth';
import { completeTask } from '../actions/tasks';
import { setAlert } from '../actions/alert';

const  AdminPage = ({ auth: { isAdminAuthenticated, loadingAdmin }, logoutAdmin, completeTask, setAlert }) => {

  const [formData, setFormData] = useState({
    studentID: '',
    taskID: '',
    taskComplete: 'true'
  });

  const { studentID, taskID, taskComplete } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    //console.log(studentID + " " + taskID + " " + taskComplete);
    completeTask({studentID, taskID, taskComplete});
    setAlert('Task Completion Notified To Server', 'success');
  }

    return (
      <Fragment>
        <div id="adminWrapper">

        <p id="head">Douglas College Mascots Management Page</p>
        <p id="second">Task Pending List</p>

        <form id="taskCompleteForm" className="form" onSubmit={e => onSubmit(e)}>
        <table id="adminTable">
          <tbody>
            <tr>
              <th>Student ID</th>
              <th>Task ID</th>
              <th>Complete Status</th>
              <th></th>
            </tr>
            <tr>
              <td>
                <input type="text" id="studentID" name="studentID" value={studentID} onChange={e => onChange(e)}/>
              </td>
              <td>
                <input type="text" id="taskID" name="taskID" value={taskID} onChange={e => onChange(e)}/>
              </td>
              <td>
                <select id="taskComplete" name="taskComplete" value={taskComplete} onChange={e => onChange(e)}>
                  <option>true</option>
                  <option>false</option>
                </select>
              </td>
              <td><button type="submit" id="adminButton">submit</button></td>
            </tr>
            </tbody>
        </table>
        </form>

        <table id="taskAppendix">
          <tbody>
            <tr>
              <th>Task ID</th>
              <th>Task Name</th>
            </tr>      
            <tr>
              <td>001-001</td>
              <td>Search for a book</td>
            </tr>
            <tr>
              <td>001-002</td>
              <td>Check out a book</td>
            </tr>
            <tr>
              <td>001-003</td>
              <td>Return a book</td>
            </tr>
            <tr>
              <td>002-001</td>
              <td>Visit enrolment services</td>
            </tr>
            <tr>
              <td>002-002</td>
              <td>Get course planning support</td>
            </tr>
            <tr>
              <td>002-003</td>
              <td>Learn how and when to drop courses</td>
            </tr>
            <tr>
              <td>002-004</td>
              <td>Learn how to enrol waitlist</td>
            </tr>
          </tbody>
        </table>
        </div>

        <Link to={"/adminLogin"}><button id="adminLogout" onClick={logoutAdmin}>LOGOUT</button></Link>
       
      </Fragment>
    );
  }

  AdminPage.prototypes = {
    logoutAdmin: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    completeTask: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { logoutAdmin, completeTask, setAlert })(AdminPage);
  