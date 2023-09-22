import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/register.css';
import BackArrow from "../resources/backArrow.png";
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import { getUserPet } from '../actions/pet';
import { getUserTasks } from '../actions/tasks';
import PropTypes from 'prop-types';


const RegisterPage = ({ setAlert, register, isAuthenticated, getUserPet, getUserTasks, pet : {loading} }) => {

    const [formData, setFormData] = useState({
      studentID: '',
      email: '',
      name: '',
      password: '',
      password2: ''
    });

    const { studentID, email, name, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
      if(password !== password2) {
        setAlert('Passwords do not match', 'danger');
      } else {
        register({
          studentID,
          email,
          name,
          password
        });
        getUserPet();
        getUserTasks();
      }
  };

  if(isAuthenticated && !loading) {
    return <Redirect to="/main" />
  }

    return (
      <Fragment>
        <Link to={"/"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
        <img id="backArrow_none" src={BackArrow} alt="backArrow" />


    <p id="registerTitle">
        <span className="text">Welcome</span><br />
        <span className="text">New Roarers!</span>
    </p>

    <form id="registerForm" className="form" onSubmit={e => onSubmit(e)}>
        <label htmlFor="stuid"><span className="text">ID</span></label>
        <br />
        <input type="text" id="stuID" name="studentID" defaultValue={studentID} onChange={e => onChange(e)} />
        <br />
        <label htmlFor="stuemail"><span className="text">Email</span></label>
        <br />
        <input type="email" id="stuEmail" name="email" defaultValue={email} onChange={e => onChange(e)} />
        <br />
        <label htmlFor="stuname"><span className="text">Name</span></label>
        <br />
        <input type="text" id="stuName" name="name" defaultValue={name} onChange={e => onChange(e)} />
        <br />
        <label htmlFor="stupw"><span className="text">Password</span></label>
        <br />
        <input type="password" id="stuPW" name="password" defaultValue={password} onChange={e => onChange(e)} />
        <br />
        <label htmlFor="stupwc" id="pwconfirm"><span className="text">Password Confirm</span></label>
        <br />
        <input type="password" id="stuPWC" name="password2" defaultValue={password2} onChange={e => onChange(e)} />
        <button type="submit" className="btn btn-primary" id="registerButn">REGISTER</button>
    </form>

    {/*<Link to={"./"}><button type="submit" className="btn btn-primary" id="registerButn">REGISTER</button></Link>*/}
      </Fragment>
    );
  };

  RegisterPage.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getUserPet: PropTypes.func.isRequired,
    getUserTasks: PropTypes.func.isRequired,
    pet: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    pet: state.pet
  });
  
  export default connect(mapStateToProps, { setAlert, register, getUserPet, getUserTasks })(RegisterPage);
