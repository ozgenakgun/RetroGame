import React, { Fragment, useState }from "react";
import { Link } from "react-router-dom";
import '../design/contactAdmin.css'
import BackArrow from "../resources/backArrow.png";

const ContactAdminPage = () => {

  return (
    <Fragment>
      <Link to={"/setting"}><img id="backArrow" src={BackArrow} alt="backArrow" /></Link>
      <img id="backArrow_none" src={BackArrow} alt="backArrow" />
      
      <p id="contactUs"><span className="text" >Contact Us</span> </p>
      <textarea id="contactTextBox" name="subject" placeholder="Please write down your review"></textarea>
      <button id="contactAdminButn" onClick={() => document.getElementById("submitRes").innerText="Message sent"}>submit</button>

      <p id="submitRes"></p>
    </Fragment>
  );
}

export default ContactAdminPage;
  