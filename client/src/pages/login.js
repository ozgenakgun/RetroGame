import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/login.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/auth';

const LoginPage = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    studentID: '',
    password: ''
  });

  const { studentID, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(studentID, password);
  }

  // redirect if logged in
  if(isAuthenticated) {
    return <Redirect to="/main" />
  }

    return (
      <Fragment>
          <p id="loginTitle"><span className="text">Douglas Orientation</span></p>

          <form id="loginForm" className="form" onSubmit={e => onSubmit(e)}>
              <label htmlFor="stuid"><span className="text">ID</span></label>
              <br />
              <input type="text" id="stuID" name="studentID" value={studentID} onChange={e => onChange(e)} />
              <br />
              <label htmlFor="stupw"><span className="text">Password</span></label>
              <br />
              <input type="password" id="stuPW" name="password" value={password} onChange={e => onChange(e)} />
              <button type="submit" className="btn btn-primary" id="loginButn">LOGIN</button>
          </form>

          <div id="loginOther">
              <p className="forOrReg"><span className="text">Forget Password?</span></p>
              <p className="forOrReg"><span className="text">Don't have an account?</span></p>
              <Link to={"/register"} id="regisLink">Register</Link>
          </div>
      </Fragment>
    );
  }

  LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
  export default connect(mapStateToProps, { login })(LoginPage);
  