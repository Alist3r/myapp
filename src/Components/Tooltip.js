import React, { useState } from "react";
import "../tooltip.css";
import {roundNumber} from '../Utilities/UtilityFunctions.js'
import {tooltipReverseTimerConverter} from '../Utilities/UtilityFunctions.js'

const Tooltip = (props) => {
  let timeout;
  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, props.delay || 50);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const currentValueColor = (currentValue, costValue) => {
    let classColor = "Tooltip-Resource-CurrentValue-Color-Grey"
    if(currentValue < costValue) 
      classColor = "Tooltip-Resource-CurrentValue-Color-Red"
    
    return classColor
  }

  var activity = props.activity
  var resources = props.resourcesList.slice()

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {props.children}
      {active && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          <div>
            <div className="Tooltip-Description">{activity.description}</div>

            {/*--------- UPGRADE COSTS ---------*/}
            <div className="Tooltip-Title">Costs</div>
            <div className="Tooltip-Divider"></div>
            {activity.upgradeCost && (activity.upgradeCost.map(upgradeCost => (             
              <span className="Tooltip-EffectRow">
                {upgradeCost.resource}: {resources.map(resource => (
                  resource.name === upgradeCost.resource && (
                    <span className={currentValueColor(resource.currentValue,upgradeCost.cost)}>
                      {roundNumber(resource.currentValue,2)} / {roundNumber(upgradeCost.cost,2)}{upgradeCost.cost > resource.maxValue && (<span>*</span>)}{resource.currentValue < upgradeCost.cost && (<span> {tooltipReverseTimerConverter(upgradeCost.cost,resource.currentValue,resource.incRatio)}</span>)} 
                    </span>)                
                ))} 
                <br></br>
              </span>                         
            )))}

            {/*--------- CLICK COSTS ---------*/}
            {activity.clickCost && (activity.clickCost.map(clickCost =>
              <span className="Tooltip-EffectRow">
                {clickCost.resource}: {resources.map(resource => (
                  resource.name === clickCost.resource && (
                    <span className={currentValueColor(resource.currentValue,clickCost.cost)}>
                      {roundNumber(resource.currentValue,2)} / {roundNumber(clickCost.cost,0)}{clickCost.cost > resource.maxValue && (<span>*</span>)}{resource.currentValue < clickCost.cost && (<span> {tooltipReverseTimerConverter(clickCost.cost,resource.currentValue,resource.incRatio)}</span>)} 
                    </span>)
                ))}
              </span>
            ))}

            {/*--------- EFFECTS ---------*/}
            <div className="Tooltip-Title">Effects</div>
            <div className="Tooltip-Divider"></div>
            {activity.effect.map(effect => (

              <span className="Tooltip-EffectRow">             
                  {effect.perSecRatio && (<span>{effect.resource}: {effect.perSecRatio}/<span className="Tooltip-Sec">sec</span></span>)}  
                  {effect.percRatio && (<span>{effect.resource}: {effect.percRatio}%</span>)}
                  {effect.maxValue && (<span>Max {effect.resource}: +{effect.maxValue} </span>)}     
                  {effect.clickRatio && (<span>{effect.resource}: +{effect.clickRatio} </span>)}           
                <br></br>
              </span>

            ))}         
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
