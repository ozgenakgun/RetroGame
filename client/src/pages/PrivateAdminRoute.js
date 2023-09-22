import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './spinner';

const PrivateAdminRoute = ({
  component: Component,
  auth: { isAdminAuthenticated }
}) => {
  if (isAdminAuthenticated) return <Component />;
  

  return < Redirect to="/adminLogin" />;
};

PrivateAdminRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateAdminRoute);