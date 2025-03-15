import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
// import "./Loader.css"; // Import the CSS file

const Loader = ({ message = "Classification is in progress..." }) => {
  return (
    <div className="loader-container">
      <div className="loader-icon">
        <Loader2 className="gear-icon" />
      </div>
      <p className="loader-text">{message}</p>
    </div>
  );
};

export default Loader;
