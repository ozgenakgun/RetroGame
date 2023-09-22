import React, { Fragment, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/main.css';
import MascotImage from "../resources/roary.png";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';
import { getUserPet } from '../actions/pet';
import { getUserTasks } from '../actions/tasks';
import Spinner from './spinner';


function MainPage({ auth, logout, getUserPet, getUserTasks, pet : { pet, loading }, tasks }) {
  useEffect(() => {
    getUserPet();
    getUserTasks();
  }, []);

    return <Fragment>
      {loading ? <Spinner /> : (
        <Fragment>
        <div id="grid">
          <p id="mainTitle">
              <span className="text">DOUGLAS COLLEGE</span>
          </p>
          <div id="image_parent" className="image_parent">
            <img id="mascot" src={MascotImage} alt="roary" />
            <img className="wardrobeItemShirt" src={require(`../resources/s${pet.petShirtSelected??"0"}.png`)} alt="cloth" />
            <img className="wardrobeItemPants" src={require(`../resources/p${pet.petPantsSelected??"0"}.png`)} alt="cloth" />
          </div>
          <div id="mainButton">
              <Link to={"/taskList"}><button className="mainButn">TASK LIST</button></Link>
              <Link to={"/wardrobe"}><button className="mainButn">WARDROBE</button></Link>
              <Link to={"/setting"}><button className="mainButn">SETTINGS</button></Link>
              <Link to={"/"}><button className="mainButn" onClick={logout}>LOGOUT</button></Link>
          </div>
      
          <div id="mascotName">
              <a href="/questions.html"><button id="playButn">PLAY</button></a>
              <p id="nameLabel">MASCOT NAME :</p>
              <p id="Name">ROARY</p>
          </div>
        </div>
    </Fragment>
      )}
    </Fragment> 
  }

  MainPage.prototypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getUserPet: PropTypes.func.isRequired,
    getUserTasks: PropTypes.func.isRequired,
    pet: PropTypes.object.isRequired,
    tasks: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    pet: state.pet,
    tasks: state.tasks
  });
  
  export default connect(mapStateToProps, { logout, getUserPet, getUserTasks })(MainPage);
  