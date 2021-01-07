import React from 'react'

class ResourcePanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resource: props.resourceData
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
    let stamp = (Math.round(resource.currentValue * 100) / 100).toFixed(2);
      return(
          <div>{resource.name}: {stamp}/{resource.maxValue}+</div>           
      )
    }
}

export default ResourcePanel;

