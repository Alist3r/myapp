import React, { useState } from "react";
import {formatNumberWPrefix} from '../../Utilities/UtilityFunctions.js'
import "./tooltip.css";

const ResourceIncRatioTooltip = (props) => {
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

  var globalEffects
  if(props.globalEffects != null)
    globalEffects = props.globalEffects

  let globalIndex = globalEffects.findIndex(x => x.name === resource.name)  
  let globalEffect = globalEffects[globalIndex]
  return (
    <div
      className="Tooltip-Wrapper-ResourceIncRatio"

      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}

      {/** BELT RESOURCE TOOLTIP */}
      {active && (
          <div style={{textAlign: 'left'}} className={`Tooltip-Tip-ResourceIncRatio  ${props.direction || "top"}`}>
            <span><i><b>From Activity</b></i></span><br></br>
            |- Production: {formatNumberWPrefix(globalEffect.activity.valueFlat,2)} <br></br>
            |- Boost: {formatNumberWPrefix(globalEffect.activity.valuePerc,2)}% <br></br>
            <br></br>
            <span><i><b>From Room Object</b></i></span><br></br>
            |- Production: {formatNumberWPrefix(globalEffect.roomObject.valueFlat,2)} <br></br>
            |- Boost: {formatNumberWPrefix(globalEffect.roomObject.valuePerc,2)}% <br></br>
          </div>  
       
      )}
    </div>
  );
};

export default ResourceIncRatioTooltip;
