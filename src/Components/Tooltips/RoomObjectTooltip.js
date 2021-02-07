import React, { useState } from "react";
import "./tooltip.css";
import {formatNumber, formatNumberWPrefix} from '../../Utilities/UtilityFunctions.js'
import {timerConverter} from '../../Utilities/UtilityFunctions.js'

const RoomObjectTooltip = (props) => {
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

  const currentValueColor = (currentValue, costValue) => {
    let classColor = "Tooltip-Resource-CurrentValue-Color-Grey"
    if(currentValue < costValue) 
      classColor = "Tooltip-Resource-CurrentValue-Color-Red"
    
    return classColor
  }

  var roomObj 
  if(props.roomObj != null) 
    roomObj = props.roomObj 

  var resources
  if(props.resourcesList != null) 
    resources = props.resourcesList.slice()


  return (
    <div
      className="Tooltip-Wrapper"

      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {props.children}
      {/** roomObj TOOLTIP */}
      {active  && (
        <div className={`Tooltip-Tip ${props.direction || "top"}`}>
          <div>
            <div className="Tooltip-Description">{roomObj.description}</div>

            
            <div className="Tooltip-Title">Costs</div>
            <div className="Tooltip-Divider"></div>

            {/*--------- UPGRADE COSTS ---------*/}
            {roomObj.upgradeCost && (roomObj.upgradeCost.map(upgradeCost => (             
              <span className="Tooltip-EffectRow">
                {upgradeCost.resource} 
                {resources.map(resource => (
                  resource.name === upgradeCost.resource && (
                    <span style={{float: 'right'}} className={currentValueColor(resource.currentValue,upgradeCost.cost)}>
                      {formatNumber(resource.currentValue,2)} / {formatNumber(upgradeCost.cost,2)}{upgradeCost.cost > resource.maxValue && (<span>*</span>)}{resource.currentValue < upgradeCost.cost && resource.incRatio !== 0 && (<span> ({timerConverter(upgradeCost.cost,resource.currentValue,resource.incRatio)})</span>)} 
                    </span>
                  )                
                ))} 
                <br></br>
              </span>                         
            )))}

            {/*--------- CLICK COSTS ---------*/}
            {roomObj.clickCost && (roomObj.clickCost.map(clickCost =>
              <span className="Tooltip-EffectRow">
                {clickCost.resource}: {resources.map(resource => (
                  resource.name === clickCost.resource && (
                    <span className={currentValueColor(resource.currentValue,clickCost.cost)}>
                      {formatNumber(resource.currentValue,2)} / {formatNumber(clickCost.cost,0)}{clickCost.cost > resource.maxValue && (<span>*</span>)}{resource.currentValue < clickCost.cost && resource.incRatio !== 0 && (<span> ({timerConverter(clickCost.cost,resource.currentValue,resource.incRatio)})</span>)} 
                    </span>)
                ))}
                <br></br>
              </span>
            ))}

            {/*--------- ROOM SLOT COSTS ---------*/}
            {roomObj.requiredSlot != null &&(
              <span className="Tooltip-EffectRow">
                Room Slot <span style={{float: "right"}}>{roomObj.requiredSlot}</span>
              </span>
            )}

            {/*--------- EFFECTS ---------*/}
            <div className="Tooltip-Title">Effects</div>
            <div className="Tooltip-Divider"></div>
            {roomObj.effect.map(effect => (

              <span className="Tooltip-EffectRow">             
                {effect.perSecRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.perSecRatio,2)}/<span className="Tooltip-Sec">sec</span></span>)}  
                {effect.percRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.percRatio,2)}% /<span className="Tooltip-Sec">sec</span></span>)}
                {effect.maxValue && (<span>Max {effect.resource}: {formatNumberWPrefix(effect.maxValue,2)} </span>)} 
                {effect.percMaxValue && (<span>Max {effect.resource}: {formatNumberWPrefix(effect.percMaxValue,2)}% </span>)}     
                {effect.clickRatio && (<span>{effect.resource}: {formatNumberWPrefix(effect.clickRatio,2)} </span>)}           
                <br></br>
              </span>

            ))}  

            {roomObj.effectActivity != null && (
                <span>
                  {roomObj.effectActivity.map(effect => (
                    <span className="Tooltip-EffectRow">
                      {effect.percRatio && (<span>{effect.activity}: {formatNumberWPrefix(effect.percRatio,2)}%</span>)}
                      <br></br>
                    </span>
                    
                  ))}
                </span>
            )}       
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomObjectTooltip;
