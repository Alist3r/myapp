import React, { useState } from "react";
import "../tooltip.css";

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

  var activity = props.activity

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
            <div className="Tooltip-Divider"></div>
            <div className="Tooltip-EffectDesc">{activity.effectDesc}</div>

            {/*--------- COSTS ---------*/}
            <div className="Tooltip-Title">Costs</div>
            <div className="Tooltip-Divider"></div>
            {activity.upgradeCost && (activity.upgradeCost.map(upgradeCost => (
                
              <span className="Tooltip-EffectRow">
                {upgradeCost.resource}: {(upgradeCost.upgradeCostRatio * activity.stage)+upgradeCost.cost}
                <br></br>
              </span>
                             
            )))}

            {/*--------- EFFECTS ---------*/}
            <div className="Tooltip-Title">Effects</div>
            <div className="Tooltip-Divider"></div>
            {activity.effectPerTick && (activity.effectPerTick.map(effectPerTick => (

              <span className="Tooltip-EffectRow">     
                {effectPerTick.resource}:
                  {effectPerTick.perSecRatio && (<span> {effectPerTick.perSecRatio}/<span className="Tooltip-Sec">sec</span></span>)}  
                  {effectPerTick.percRatio && (<span> {effectPerTick.percRatio}%</span>)}
                  {effectPerTick.flatRatio && (<span> {effectPerTick.flatRatio} </span>)}               
                <br></br>
              </span>

            )))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
