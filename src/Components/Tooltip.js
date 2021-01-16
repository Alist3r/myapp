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
            <div className="Tooltip-Description">{props.description}</div>
            <div className="Divider"></div>
            <div className="Tooltip-EffectDesc">{props.effectDesc}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
