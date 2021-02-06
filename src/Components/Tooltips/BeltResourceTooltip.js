import React, { useState } from "react";
import "./tooltip.css";

const BeltResourceTooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 1);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  var resource
  if(props.resource != null) 
    resource = props.resource

  return (
    <div
      className="Tooltip-Wrapper"

      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}

      {/** BELT RESOURCE TOOLTIP */}
      {active && (
        <div style={{textAlign: 'center'}} className={`Tooltip-Tip ${props.direction || "top"}`}>
            {resource.name}
        </div>  
      )}
    </div>
  );
};

export default BeltResourceTooltip;
