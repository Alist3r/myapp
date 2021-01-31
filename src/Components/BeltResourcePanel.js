import React from 'react'
import {roundNumber} from '../Utilities/UtilityFunctions.js'
import * as constants from '../Utilities/StringsConst.js'
import icondemir from '../Images/icon-demir.png'

class BeltResourcePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
  }

  /*componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      100
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }  

  tick() {
    var updatedResource = this.state.resource
    let addInc = true

    let previewCurrentValue = updatedResource.currentValue
    previewCurrentValue += ((updatedResource.incRatio * constants.OPT_GAMESPEED) / 10) 

    if(previewCurrentValue > updatedResource.maxValue) {
      updatedResource.currentValue = updatedResource.maxValue
      addInc = false
    }

    if(previewCurrentValue < 0) {
      updatedResource.currentValue = 0
      addInc = false
    }
    
    if(addInc) {
      updatedResource.currentValue += ((updatedResource.incRatio * constants.OPT_GAMESPEED) / 10)
    }

    this.setState({
      resource: updatedResource
    });
  }*/

  getResourceNameStyle() {
    let resource = this.state.resource
    let style = {}

    if(resource.color != null) {
      style = {
        padding: '10px',
        borderRight: '1px dashed black',   
        maxWidth: '100px'
      }
    }
    
    return style
  }

  render() {
    let resource = this.state.resource

      return(
          <div style={this.getResourceNameStyle()}>
            
            <div className="Belt-Resource-Cell-Icon-Container">
              <img className="Belt-Resource-Cell-Icon-Img" src={icondemir} alt="icon-demir"/>
            </div> 
            <div style={{display: 'table-cell'}}>
              <div className="Belt-Resource-Cell-Value" style={{'color': resource.currentValue >= (resource.maxValue * 90 /100 ) ? 'darkorange' : 'black'}}>{roundNumber(resource.currentValue,2)}</div>
              <div className="Belt-Resource-Cell-MaxValue">/{roundNumber(resource.maxValue)}</div> 
              <div className="Belt-Resource-Cell-IncRatio">{roundNumber(resource.incRatio * constants.OPT_GAMESPEED,2)}/<span className="Resource-Span-Sec">sec</span></div>
            </div>
            
          </div>           
      )
    }
}

export default BeltResourcePanel;

