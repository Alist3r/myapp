import React, { useState } from "react";
import {formatNumberWPrefix, timerConverter} from '../../Utilities/UtilityFunctions.js'
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
            
            <span style={{float: 'right'}}>~{resource.name}~</span>
            <br></br>
            <br></br>
            {(globalEffect.activity.valueFlat !== 0 || globalEffect.activity.valuePerc !== 0) && (<span><b>From Activity</b><br></br></span>)}
            {globalEffect.activity.valueFlat !== 0 && (<span>|- Production: {formatNumberWPrefix(globalEffect.activity.valueFlat,2)}/s <br></br></span>)}
            {globalEffect.activity.valuePerc !== 0 && (<span>|- Boost: {formatNumberWPrefix(globalEffect.activity.valuePerc,2)}% <br></br></span>)}
            <br></br>
            {(globalEffect.roomObject.valueFlat !== 0 || globalEffect.roomObject.valuePerc !== 0) && (<span><b>From Room Object</b><br></br></span>)}
            {globalEffect.roomObject.valueFlat !== 0 && (<span>|- Production: {formatNumberWPrefix(globalEffect.roomObject.valueFlat,2)} <br></br></span>)}
            {globalEffect.roomObject.valuePerc !== 0 && (<span>|- Boost: {formatNumberWPrefix(globalEffect.roomObject.valuePerc,2)}% <br></br></span>)}
            <br></br>
            <br></br>
            {resource.incRatio > 0 && (<span>To Cap: {timerConverter(resource.maxValue, resource.currentValue, resource.incRatio)}</span>)}
            {resource.incRatio < 0 && (<span>To Cap: {timerConverter(0, resource.currentValue, resource.incRatio)}</span>)}
          </div>     
      )}
    </div>
  );
};

export default ResourceIncRatioTooltip;
