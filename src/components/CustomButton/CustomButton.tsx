import React from "react";
import "./CustomButton.css";


const CustomButton = ({btnText}:{btnText:string}) => {
  return (
    <div>
      <div class="abtn btn btn-1">
        <svg>
          <rect x="0" y="0" fill="none" width="100%" height="100%" />
        </svg>
        {btnText}
      </div>
    </div>
  );
};

export default CustomButton;
