// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    initialState: false,
    timerRun: 25,
    consistentRun: 25 * 60,
  }

  onClickPlay = () => {
    const {consistentRun} = this.state

    this.setState(preState => ({
      initialState: !preState.initialState,
    }))
    if (consistentRun > 1) {
      this.timerId = setInterval(this.onDing, 1000)
    }
  }

  onDing = () => {
    const {consistentRun} = this.state
    this.setState(preState => ({
      consistentRun: preState.consistentRun - 1,
    }))
    if (consistentRun === 1) {
      clearInterval(this.timerId)
      this.setState({
        initialState: false,
        timerRun: 25,
        consistentRun: 0,
      })
    }
  }

  onPauseClick = () => {
    clearInterval(this.timerId)
    this.setState(preState => ({
      initialState: !preState.initialState,
    }))
  }

  onResetClick = () => {
    clearInterval(this.timerId)
    // const {timerRun} = this.state
    this.setState({
      initialState: false,
      consistentRun: 25 * 60,
      timerRun: 25,
    })
  }

  onAddLimit = () => {
    const {initialState} = this.state
    return (
      !initialState &&
      this.setState(preState => ({
        consistentRun: (preState.timerRun + 1) * 60,
        timerRun: preState.timerRun + 1,
      }))
    )
  }

  onMinusLimit = () => {
    const {initialState, timerRun} = this.state
    return (
      !initialState &&
      timerRun > 1 &&
      this.setState(preState => ({
        consistentRun: (preState.timerRun - 1) * 60,
        timerRun: preState.timerRun - 1,
      }))
    )
  }

  getInStrFormat = () => {
    const {consistentRun, timerRun} = this.state
    let result
    if (consistentRun === timerRun) {
      result =
        consistentRun < 10 ? `0${consistentRun}:00` : `${consistentRun}:00`
    } else {
      const timeValue = consistentRun
      const mins = Math.floor(timeValue / 60)
      const secs = Math.floor(timeValue % 60)
      const minute = mins < 10 ? `0${mins}` : mins
      let seconds = secs === 0 && '00'
      seconds = secs < 10 ? `0${secs}` : secs
      result = `${minute}:${seconds}`
    }
    return result
  }

  render() {
    const {initialState, timerRun, consistentRun} = this.state

    const minToSec = this.getInStrFormat()

    console.log(consistentRun)

    const objData = initialState
      ? {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png',
          altText: 'pause icon',
          text: 'Pause',
          display: 'Running',
          funcEvent: this.onPauseClick,
        }
      : {
          imgUrl: 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png',
          altText: 'play icon',
          text: 'Start',
          display: 'Paused',
          funcEvent: this.onClickPlay,
        }

    return (
      <div className="bg-layer">
        <h1 className="title">Digital Timer</h1>
        <div className="timer-box">
          <div className="play-bg">
            <div className="clock-play">
              <p className="timer-count">{minToSec}</p>
              <p className="status">{objData.display}</p>
            </div>
          </div>
          <div className="control-box">
            <div className="menu-opts">
              <div className="start-box">
                <button
                  className="play-btn"
                  onClick={objData.funcEvent}
                  type="button"
                >
                  <img
                    className="pic"
                    src={objData.imgUrl}
                    alt={objData.altText}
                  />
                </button>
                <p className="control-text">{objData.text}</p>
              </div>
              <div className="reset-box">
                <button
                  className="play-btn"
                  onClick={this.onResetClick}
                  type="button"
                >
                  <img
                    className="pic"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p className="control-text">Reset</p>
              </div>
            </div>
            <div className="btn-box">
              <p className="caption">Set Time Limit</p>
              <div className="input-btn-box">
                <button
                  className="input-btn"
                  onClick={this.onMinusLimit}
                  type="button"
                >
                  -
                </button>
                <p className="limit-run">{timerRun}</p>
                <button
                  className="input-btn"
                  onClick={this.onAddLimit}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
