import React from 'react'
import * as constants from '../Utilities/StringsConst.js'
import {formatNumberWPrefix}  from '../Utilities/UtilityFunctions.js'
import {jobGrades} from '../Lists/TalentsUtilities.js'

class JobExperience extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      job: props.job,
      incRate: 0,
    }

    
  }

  /*componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      constants.OPT_REFRESHRATE
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }  

  tick() {
    let refreshRateModifier = 1000 / constants.OPT_REFRESHRATE
    let jobExp = this.state.job.jobExp
    let calculatedExp = jobExp.current
    let incRate = this.state.incRate

    let timeSlotForJob = this.state.job.timeSlot
    let modifier = jobExp.modifier
    let jobExpModifier = timeSlotForJob * modifier

    incRate = (jobExpModifier * constants.OPT_GAMESPEED) / refreshRateModifier

    let updatedExp = calculatedExp + incRate
    if(updatedExp <= jobExp.toLvUp) {
      calculatedExp += incRate
      jobExp.current = calculatedExp

      this.setState({
        incRate: incRate
      })
    }
    else {
      calculatedExp += incRate
      let expDifference = calculatedExp - jobExp.toLvUp 
      jobExp.current = expDifference
      jobExp.toLvUp *= 1.2
      jobExp.grade += 1
    }

  }

  getExpFiller(jobExp) {

    let percentage = (jobExp.current * 100) / jobExp.toLvUp
    let howMuchToFill = (150 * percentage) / 100

    let style
    style = {
      width: howMuchToFill + "px",
    }

    return style
  }


  render() {
    let job = this.state.job

    return(
      <div className="Middle-Panel-JobExp-Container">
        <span className="Middle-Panel-JobExp-Grade">{jobGrades[job.jobExp.grade]}</span>
        <div className="Middle-Panel-JobExp-Exp-Container" style={{display: "inline-block"}}>
          <div className="Middle-Panel-JobExp-Exp-Filler" style={this.getExpFiller(job.jobExp)}></div>
        </div>
        <span style={{fontSize: "12px", display: "inline-block", marginLeft: "4px"}}>{formatNumberWPrefix(this.state.incRate,3)}/s</span>
      </div>
    )
  }*/
}

export default JobExperience;

