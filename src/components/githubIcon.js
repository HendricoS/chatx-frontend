import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// GitHub Icon
export const GitHubIcon = ({ color, size }) => {
  return (
    <FontAwesomeIcon
      icon={faGithub}
      style={{ color, fontSize: size }}
      className="gitHub-icon"
    />
  );
};
