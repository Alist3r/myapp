import React from 'react'
import {formatNumber, formatNumberWPrefix} from '../Utilities/UtilityFunctions.js'
import ResourceIncRatioTooltip from '../Components/Tooltips/ResourceIncRatioTooltip.js'
import * as constants from '../Utilities/StringsConst.js'

class Resource extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource,
      globalEffects: props.globalEffects
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
    var updatedResource = this.state.resource
    let addInc = true

    let previewCurrentValue = updatedResource.currentValue
    previewCurrentValue += ((updatedResource.incRatio * constants.OPT_GAMESPEED) / (1000 / constants.OPT_REFRESHRATE)) 

    if(previewCurrentValue > updatedResource.maxValue) {
      updatedResource.currentValue = updatedResource.maxValue
      addInc = false
    }

    if(previewCurrentValue < 0) {
      updatedResource.currentValue = 0
      addInc = false
    }
    
    if(addInc) {
      updatedResource.currentValue += ((updatedResource.incRatio * constants.OPT_GAMESPEED) / (1000 / constants.OPT_REFRESHRATE))
    }

    this.setState({
      resource: updatedResource
    });
  }

  

  render() {
    let resource = this.state.resource
    let globalEffects = this.state.globalEffects

      return(
        
          <div>
            <div className="Resource-Cell-Name">{resource.name}</div> 
            <div className="Resource-Cell-Value" style={{'color': resource.currentValue >= (resource.maxValue * 90 /100 ) ? 'darkorange' : 'black'}}>{formatNumber(resource.currentValue,2)}</div>
            <div className="Resource-Cell-MaxValue">/{formatNumber(resource.maxValue,2)}</div> 
            <ResourceIncRatioTooltip resource={resource} globalEffects={globalEffects}>
              <div className="Resource-Cell-IncRatio">{formatNumberWPrefix(resource.incRatio * constants.OPT_GAMESPEED,2)} /<span className="Resource-Span-Sec">s</span></div>
            </ResourceIncRatioTooltip>   
          </div>      
            
      )
    }
}

export default Resource;

