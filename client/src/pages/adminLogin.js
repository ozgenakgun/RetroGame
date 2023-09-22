import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import '../design/adminLogin.css'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginAdmin } from '../actions/auth';

const  AdminLogin = ({ loginAdmin, isAdminAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    loginAdmin(email, password);
  }

  // redirect if logged in
  if(isAdminAuthenticated) {
    return <Redirect to="/adminManage" />
  }

    return (
      <Fragment>
        <div id="adminLoginWrapper">

        <p id="adminLoginTitle">Douglas College Mascots Management Page</p>
        <p id="adminLoginSubt">Admin Login</p>

        <form id="adminLoginForm" className="form" onSubmit={e => onSubmit(e)}>
            <label htmlFor="admiID">Email</label>
            <input type="text" id="adminID" name="email" value={email} onChange={e => onChange(e)} />
            <br />
            <label htmlFor="adminPW">Password</label>
            <input type="password" id="adminPW" name="password" value={password} onChange={e => onChange(e)} />
            <br />
            <button type="submit" className="btn btn-primary" id="adminLoginButn">LOGIN</button>
        </form>
        </div>
       
      </Fragment>
    );
  }

  AdminLogin.propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    isAdminAuthenticated: PropTypes.bool
  }

  const mapStateToProps = state => ({
    isAdminAuthenticated: state.auth.isAdminAuthenticated
  });
  
  export default connect(mapStateToProps, { loginAdmin })(AdminLogin);
  