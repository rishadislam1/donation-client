import React from "react";
import "./CustomButton.css";

const CustomButton = ({ btnText, customCss }: { btnText: string, customCss: string }) => {
  return (
    <div>
      <div className={`abtn btn btn-1 ${customCss}`}>
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        {btnText}
      </div>
    </div>
  );
};

export default CustomButton;
