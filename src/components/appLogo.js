import React from "react";
// import chatxLogo from "../images/chatx-logo.png";

const AppLogo = () => {
  return (
    <div>
      <img
        className="web-logo"
        src={process.env.PUBLIC_URL + "/images/chatx-logo.jpg"}
        alt="app-logo"
      />
    </div>
  );
};

export default AppLogo;
