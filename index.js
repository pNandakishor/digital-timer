import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isPlay: false,
    status: 'Paused',
    timer: 25,
    elapsedTime: 0,
    status1: 'Start',
  }

  clearInterval = () => clearInterval(this.intervalId)

  onClickBtn = () => {
    const {isPlay, elapsedTime, timer} = this.state
    const isTimerCompleted = elapsedTime === timer * 60

    if (isTimerCompleted) {
      this.clearInterval() // Stop interval when completed
      this.setState({
        isPlay: false,
        status: 'Paused',
        status1: 'Start',
        elapsedTime: 0,
      })
      return // Exit early since timer is completed
    }

    if (isPlay) {
      this.clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.onIncrement, 1000)
    }

    this.setState(prevState => ({
      isPlay: !prevState.isPlay,
      status: prevState.isPlay ? 'Paused' : 'Running',
      status1: prevState.isPlay ? 'Start' : 'Pause',
    }))
  }

  onResetBtn = () => {
    this.clearInterval()
    this.setState({
      isPlay: false,
      status: 'Paused',
      timer: 25,
      elapsedTime: 0,
      status1: 'Start',
    })
  }

  onIncrement = () => {
    const {elapsedTime, timer} = this.state
    const totalSeconds = timer * 60

    if (elapsedTime < totalSeconds) {
      this.setState(prevState => ({
        elapsedTime: prevState.elapsedTime + 1,
      }))
    } else {
      this.clearInterval() // Stop when time reaches zero
      this.setState({isPlay: false, status: 'Paused'})
    }
  }

  onDecrement = () => {
    const {timer, isPlay} = this.state
    if (!isPlay && timer > 1) {
      // Ensure button works only when timer isn't running
      this.setState(prevState => ({
        timer: prevState.timer - 1,
      }))
    }
  }

  incrementTimerLimit = () => {
    const {isPlay} = this.state
    if (!isPlay) {
      // Ensure button works only when timer isn't running
      this.setState(prevState => ({
        timer: prevState.timer + 1,
      }))
    }
  }

  render() {
    const {isPlay, status, timer, elapsedTime, status1} = this.state
    const remainingSeconds = timer * 60 - elapsedTime
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = remainingSeconds % 60

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(
      seconds,
    ).padStart(2, '0')}`
    return (
      <div className="bgContainer">
        <h1 className="heading">Digital Timer</h1>
        <div className="card">
          <div className="sub-card1">
            <div className="timerContainer">
              <h1 className="timer">{formattedTime}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="sub-card2">
            <div className="button-container">
              <div className="pause-btn-container">
                <button
                  className="button"
                  type="button"
                  onClick={this.onClickBtn}
                >
                  <img
                    src={
                      isPlay
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                    alt={isPlay ? 'pause icon' : 'play icon'}
                    className="img"
                  />
                </button>
                <button type="button" className="para">
                  {status1}
                </button>
              </div>
              <div className="reset-btn-container">
                <button
                  className="button"
                  type="button"
                  onClick={this.onResetBtn}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="img"
                    alt="reset icon"
                  />
                </button>
                <p className="para">Reset</p>
              </div>
            </div>

            <div className="timer-limit-container">
              <p className="head">Set Timer Limit</p>
              <div className="but-con">
                <button
                  className="limit-btn"
                  type="button"
                  onClick={this.onDecrement}
                  disabled={isPlay}
                >
                  -
                </button>
                <div className="limit">
                  <p>{timer}</p>
                </div>

                <button
                  className="limit-btn"
                  type="button"
                  onClick={this.incrementTimerLimit}
                  disabled={isPlay}
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
