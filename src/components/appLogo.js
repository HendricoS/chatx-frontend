import React from "react";

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
