import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import '../design/wardrobe.css';
import BackArrow from "../resources/backArrow.png";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updatePet } from '../actions/pet';

function WardrobePage({ pet: {pet}, updatePet }) {

  // get options and format them to match images in resources
  var shirtsArray = [];
  var pantsArray = [];
  pet.petShirtOptions.forEach(shirt => shirtsArray.push(`s${shirt}`));
  pet.petPantsOptions.forEach(pants => pantsArray.push(`p${pants}`));
  var sArray = [...new Set(shirtsArray)];
  var pArray = [...new Set(pantsArray)];

  function onClick (e) {
    var type = e.charAt(0);
    var awardID = e.charAt(1);
    if (type == 's') {
      var option = "shirt";
    } else {
      var option = "pants";
    }
    updatePet({ option, awardID });
  }

    return (
      <Fragment>
        <Link to={"/main"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
        <img id="backArrow_none" src={BackArrow} alt="" />

        <p id="wardrobeTitle">WARDROBE</p>

        <div id="bgTable">
            <div id="wardrobeTable">
                {sArray.map((s) => <Link to="/main" key={s}><img className="wardrobeItem" src={require(`../resources/${s}.png`)} alt="cloth" onClick={() => onClick(s)} /></Link>)}
                {pArray.map((p) => <Link to="/main" key={p}><img className="wardrobeItem" src={require(`../resources/${p}.png`)} alt="cloth" onClick={() => onClick(p)} /></Link>)}

            </div>
        </div>

        <Link to={"/taskList"}><button id="wardrobeBtn" href="the tasklist page">Want more items?</button></Link>
      </Fragment>
    );
  }

  WardrobePage.prototypes = {
    pet: PropTypes.object.isRequired,
    updatePet: PropTypes.func.isRequired
  };

  const mapStateToProps = state => ({
    pet: state.pet,
  });
  
  export default connect(mapStateToProps, { updatePet })(WardrobePage);
  