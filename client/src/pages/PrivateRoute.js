import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from './spinner';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading }
}) => {
  if (loading) return <Spinner />;
  if (isAuthenticated) return <Component />;

  return < Redirect to="/" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);