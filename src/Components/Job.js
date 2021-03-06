import React from 'react'
import * as constants from '../Utilities/StringsConst.js'
import {applyEffectsToResources} from '../Lists/ResourcesUtilities.js'
import JobTooltip from './Tooltips/JobTooltip.js'
import JobExperience from './JobExperience.js'


class Job extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      job: props.job,
      resources: props.resources,
      incRate: 0
    }

    
  }

  incTimeSlot(job) {
    let resourceTimeSlotIndex = this.state.resources.findIndex(x => x.name === constants.RES_007.name)
    let timeSlotRes = this.state.resources[resourceTimeSlotIndex]

    if(timeSlotRes.maxValue > 0 && ((timeSlotRes.currentValue - 1) >= 0)) {
      job.timeSlot += 1
      timeSlotRes.currentValue -= 1

      applyEffectsToResources(this.state.resources, job.effect, 1, "add")
    }
  }

  decTimeSlot(job) {
    let resourceTimeSlotIndex = this.state.resources.findIndex(x => x.name === constants.RES_007.name)
    let timeSlotRes = this.state.resources[resourceTimeSlotIndex]

    if(timeSlotRes.currentValue + 1 <= timeSlotRes.maxValue) {
      job.timeSlot -= 1
      timeSlotRes.currentValue += 1


      applyEffectsToResources(this.state.resources, job.effect, 1, "remove")
    }
  }

  render() {
    let job = this.state.job

    return(
      <div>
        <JobTooltip job={job} resources={this.state.resources} direction="right" >
        <div className="Job-Btn">
          <span className="Job-Btn-Label">
            {job.name} [{job.timeSlot}]
          </span>
        </div>
        <div onClick={() => this.incTimeSlot(job)} className="Job-Btn-Plus">
          +
        </div>
        <div onClick={() => this.decTimeSlot(job)} className="Job-Btn-Minus">
          -
        </div>
        <JobExperience job={job} />
        </JobTooltip>
        
      </div>
    )
  }
}

export default Job;

