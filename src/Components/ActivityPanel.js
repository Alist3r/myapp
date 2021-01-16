import React from 'react'
import Tooltip from '../Components/Tooltip.js'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      gameResources: props.resourceList
    }
  }

  doActivity() {
    var activityToDo = this.state.activity //one activity
    var resourcesList = this.state.gameResources.slice() //entire resource list

    // ---------- CLICK EFFECT ---------- //
    if(activityToDo.effectPerClick != null) { 
      let effects = activityToDo.effectPerClick.slice()
      effects.forEach(effect => { //load effects list
        for(let i=0; i<resourcesList.length;i++) { //apply effect to matching resource
          if(resourcesList[i].name === effect.resource) {
            resourcesList[i].currentValue += effect.clickValue //add effect clickvalue
            this.setState({
              gameResources: resourcesList
            })
          }
        }
      });

    }
  }

  render() {
    let activity = this.state.activity
      return(
        <Tooltip description={activity.description} effectDesc={activity.effectDesc} direction="right">
          <button onClick={() => this.doActivity()} className='activity'> {activity.name} {activity.stage != null && ( <span>[{activity.stage}]</span>)} </button>       
        </Tooltip>    
      )
    }
}

export default ActivityPanel;

