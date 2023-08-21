import React, { useState } from "react";
import "./tooltip.css";
import {formatNumberWPrefix} from '../../Utilities/UtilityFunctions.js'

const JobTooltip = (props) => {
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

  /*const currentValueColor = (currentValue, costValue) => {
    let classColor = "Tooltip-Resource-CurrentValue-Color-Grey"
    if(currentValue < costValue) 
      classColor = "Tooltip-Resource-CurrentValue-Color-Red"
    
    return classColor
  }*/

  const isResourceUnlocked = (effect, resources) => {
    let index = resources.findIndex(x => x.name === effect.resource)
    return resources[index].unlocked
  }

  var job 
  if(props.job != null) 
    job = props.job 

  var resources
  if(props.resources != null) 
    resources = props.resources.slice()

  return (
    <div
      className="Tooltip-Wrapper"

      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {/** ACTIVITY TOOLTIP */}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          <div>
            <div className="Tooltip-Description">{job.description}</div>

            {/*--------- EFFECTS ---------*/}
            <div className="Tooltip-Title">Effects</div>
            <div className="Tooltip-Divider"></div>
            {job.effect.map(effect => (
              <span>
                {isResourceUnlocked(effect, resources) && (
                  <span className="Tooltip-EffectRow">             
                    {effect.perSecRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.perSecRatio,2)}/<span className="Tooltip-Sec">sec</span></span>)}  
                    {effect.multiRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.multiRatio,2)}% /<span className="Tooltip-Sec">sec</span></span>)}
                    {effect.maxValue && (<span>Max {effect.resource}: {formatNumberWPrefix(effect.maxValue,2)} </span>)} 
                    {effect.percMaxValue && (<span>Max {effect.resource}: {formatNumberWPrefix(effect.percMaxValue,2)}% </span>)}     
                    {effect.clickRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.clickRatio,2)} </span>)}           
                    <br></br>
                  </span>
                )}
              </span>
            ))}  
       
          </div>
        </div>
      )}

    </div>
  );
};

export default JobTooltip;
