import React from 'react'
import {formatNumber, formatNumberWPrefix} from '../Utilities/UtilityFunctions.js'
import ResourceIncRatioTooltip from '../Components/Tooltips/ResourceIncRatioTooltip.js'
import * as constants from '../Utilities/StringsConst.js'

class Resource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      gameState: props.gameState
    }
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      constants.OPT_REFRESHRATE
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }  

  tick() {
    let resourceToUpdate = this.state.resource
    let refreshRateModifier = 1000 / constants.OPT_REFRESHRATE
    let addInc = true

    let previewCurrentValue = resourceToUpdate.currentValue
    previewCurrentValue += resourceToUpdate.incRatio / refreshRateModifier

    if(resourceToUpdate.maxValue != null && previewCurrentValue > resourceToUpdate.maxValue) {
      resourceToUpdate.currentValue = resourceToUpdate.maxValue
      addInc = false
    }

    if(previewCurrentValue < 0) {
      resourceToUpdate.currentValue = 0
      addInc = false
    }
    
    if(addInc) {    
      resourceToUpdate.currentValue += (resourceToUpdate.incRatio * constants.OPT_GAMESPEED) / refreshRateModifier
    }

    this.setState({
      resource: resourceToUpdate
    });
  }

  

  render() {
    let resource = this.state.resource
    let gameState = this.state.gameState

      return(
        
          <div>
            <div className="Resource-Cell-Name">{resource.name}</div> 
            <div className="Resource-Cell-Value" style={{'color': resource.currentValue >= (resource.maxValue * 90 /100 ) ? 'darkorange' : 'black'}}>{formatNumber(resource.currentValue,2)}</div>
            <div className="Resource-Cell-MaxValue">{resource.maxValue != null && (<span>/{formatNumber(resource.maxValue,2)}</span>)}</div> 
            <span style={{visibility: resource.incRatio !== 0 && resource.type !== constants.RES_TYPE_002.name ? 'visible' : 'hidden', display: 'table-cell'}}>
            <ResourceIncRatioTooltip resource={resource} gameState={gameState}>
              <div className="Resource-Cell-IncRatio">{formatNumberWPrefix(resource.incRatio * constants.OPT_GAMESPEED,2)}/<span className="Resource-Span-Sec">s</span></div>
            </ResourceIncRatioTooltip>   
            </span>
          </div>      
            
      )
    }
}

export default Resource;

