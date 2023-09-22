import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/setting.css'
import BackArrow from "../resources/backArrow.png";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassword } from '../actions/auth';
import { setAlert } from '../actions/alert';

function SettingPage({ auth: { isAuthenticated, loading }, changePassword, setAlert }) {

  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async e => {
  e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changePassword({
        password
      });
      setAlert('Password changed', 'success');
    }
};

  
  return (
      
    <Fragment>
    <Link to={"/main"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
    <img id="backArrow_none" src={BackArrow} alt="backArrow" />

    <p id="settingheader"><span className="text">setting</span></p>
    <p id="changepwdheader"><span className="text">change password</span></p>

    <form id="settingForm" className="form" onSubmit={e => onSubmit(e)}>
        <label htmlFor="newpwd"><span className="text">new password</span></label>
        <br />
        <input type="password" id="newpwd" name="password" defaultValue={password} onChange={e => onChange(e) }/>
        <br />
        <label htmlFor="confpwd"><span className="text">confirm password</span></label>
        <br />
        <input type="password" id="confpwd" name="password2" defaultValue={password2} onChange={e => onChange(e)}/>
        <button type="submit" id="settingbtn1" className="btn btn-primary">change password</button>

    </form>


    <Link to={"/contactAdmin"}><button id="settingbtn2">contact admin</button></Link>
  </Fragment>
      
    );
  }

  SettingPage.prototypes = {
    logout: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { changePassword, setAlert })(SettingPage);
  