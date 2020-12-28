import React from 'react'

class ActivityPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activity: props.activity
    }
  }

  render() {
    let activity = this.state.activity
      return(
          <button onClick={} className='activity'> {activity.name} | lv: {activity.stage}</button>           
      )
    }
}

export default ActivityPanel;

