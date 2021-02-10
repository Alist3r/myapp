import React, { useState } from "react";
import {formatNumberWPrefix, timerConverter, wichEffect} from '../../Utilities/UtilityFunctions.js'
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

  const getStageOrGrade = (activity) => {
    if(activity.modulable)
      return activity.grade
    else
      return activity.stage
  }

  let gameState = props.gameState
  let resource = props.resource
  let activities = gameState.gameActivities
  let roomObjects = gameState.gameRoomObjects

  
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
            
          <span>
            {/* ACTIVITIES*/}
            {activities.map(activity =>(
              <span>
              {activity.unlocked && activity.effect != null && (
                activity.effect.map(effect => (
                    <span>
                      {effect.resource === resource.name && wichEffect(effect) === 'perSecRatio' && 
                        (<span>{activity.name} <span style={{float: "right"}}>{formatNumberWPrefix(effect.perSecRatio * getStageOrGrade(activity),2)}/s</span> <br></br></span>)}
                      {effect.resource === resource.name && wichEffect(effect) === 'percRatio' && 
                        (<span>{activity.name} <span style={{float: "right"}}>{formatNumberWPrefix(effect.percRatio * getStageOrGrade(activity),2)}% </span><br></br></span>)}
                    </span>
                ))
              )}
              </span>
            ))}

            {/* HOME OBJECTS}*/}
            {roomObjects.map(roomObj =>(
              <span>
              {roomObj.unlocked && roomObj.isActive && roomObj.effect != null && (
                roomObj.effect.map(effect => (
                    <span>
                      {effect.resource === resource.name && wichEffect(effect) === 'perSecRatio' && 
                        (<span>{roomObj.name} <span style={{float: "right"}}>{formatNumberWPrefix(effect.perSecRatio * roomObj.stage,2)}/s</span><br></br></span>)}
                      {effect.resource === resource.name && wichEffect(effect) === 'percRatio' && 
                        (<span>{roomObj.name} <span style={{float: "right"}}>{formatNumberWPrefix(effect.percRatio * roomObj.stage,2)}%</span><br></br></span>)}
                    </span>
                ))
              )}
              </span>
            ))}
            
            <br></br>   
            <div className="Tooltip-Divider"></div>
            {resource.incRatio > 0 && (<span>To Cap: {timerConverter(resource.maxValue, resource.currentValue, resource.incRatio)}</span>)}
            {resource.incRatio < 0 && (<span>To Zero: {timerConverter(0, resource.currentValue, resource.incRatio)}</span>)}
          </span>

          </div>     
      )}
    </div>
  );
};

export default ResourceIncRatioTooltip;
