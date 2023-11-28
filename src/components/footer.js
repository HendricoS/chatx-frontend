import React from "react";
import { GitHubIcon } from "./githubIcon";

// Footer component
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="github-section">
            <GitHubIcon color="#fee715" size="4em" />
            <p style={{ color: "#fee715" }}>Find me on GitHub</p>
            <p style={{ color: "#fee715" }}>
              &copy; 2023 ChatX. All Rights Reserved.
            </p>
          </div>
          <div className="contact-section">
            <h3 className="footer-h3">Contact Information</h3>
            <p style={{ color: "#fee715" }}>
              Email: hendrico.stapelberg@gmail.com
            </p>
            <p style={{ color: "#fee715" }}>
              PO Box: 1379, Krugersdorp, South Africa
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
