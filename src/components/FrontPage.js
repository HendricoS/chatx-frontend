import React from "react";
import { Link } from "react-router-dom";

import AppLogo from "./appLogo";

const FrontPage = () => {
  return (
    <div>
      {/* Links to other pages */}
      <div className="container">
        <div className="wrapper-web-nav">
          <div className="row">
            <div className="col-lg-4">
              {/* Link to the Registration page */}
              <Link to="/registration">
                <span className="top-link">Registration</span>
              </Link>
            </div>
            <div className="col-lg-4">
              {/* Link to the Login page */}
              <Link to="/login">
                <span className="top-link">Login</span>
              </Link>
            </div>
            <div className="col-lg-4">
              {/* Link to the Admin Login page */}
              <Link to="/admin-login">
                <span className="top-link">Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Login page information */}
        <div className="image-wrapper">
          {/* App logo */}
          <AppLogo />
        </div>
        <div className="wrapper-web-log">
          <div className="wrapper-child-reg">
            {/* Login page header */}
            <h2 className="web-h2">About</h2>
            {/* Login page description */}
            <p className="web-p">
              ChatX is a new chat messaging app being developed by Hendrico
              Stapelberg. This is a message application app that allows several
              users to login and send messages to other users. All logged-users
              will be able to see and receive all user messages. The app will
              mainly be used by companies. All team members can login to the app
              and send, receive and delete messages.
            </p>
            <p className="web-p">
              Future plans for the app will allow team members to create tasks
              and allocate them to different team members and assign a deadline
              and description of the task.
            </p>
            <p className="web-p">
              If you don't have account yet please register before attempting to
              login
            </p>
            {/* Display error message if there is one */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
