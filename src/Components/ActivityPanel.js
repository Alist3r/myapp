import React from 'react'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity,
      gameResources: props.resourceList
    }
  }

  doActivity() {
    var activityToDo = this.state.activity
    var resourcesList = this.state.gameResources.slice()
    if(activityToDo.upgradeCost != null) {
      var onClickEffect = activityToDo.effectPerClick.slice()
      onClickEffect.map(effect => (
        
      ))
    }

  }

  render() {
    let activity = this.state.activity
      return(
          <button onClick={() => this.doActivity} className='activity'> {activity.name} | lv: {activity.stage}</button>           
      )
    }
}

export default ActivityPanel;

