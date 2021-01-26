import React from 'react'
import {roundNumber} from '../Utilities/UtilityFunctions.js'

class ResourcePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resource
    }
  }

  componentDidMount() {
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

    if(updatedResource.currentValue < updatedResource.maxValue) {
      updatedResource.currentValue += (updatedResource.incRatio / 10)
    }
    else  {
      updatedResource.currentValue = updatedResource.maxValue
    }

    this.setState({
      resource: updatedResource
    });
  }

  render() {
    let resource = this.state.resource
      return(
          <div>{resource.name}: {roundNumber(resource.currentValue)}/{roundNumber(resource.maxValue)} ({roundNumber(resource.incRatio)}/<span className="Resource-Span-Sec">sec</span>)</div>           
      )
    }
}

export default ResourcePanel;

