document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  const setTime = () =>
    time.innerText = new Intl.DateTimeFormat('en-US', timeOptions)
      .format(new Date())

  setTime()
  setInterval(setTime, 60 * 1000)

  const seconds = document.getElementById('seconds')
  const secondsOptions = { second: 'numeric' }
  const setSeconds = () =>
    seconds.innerText = new Intl.DateTimeFormat('en-US', secondsOptions)
      .format(new Date())
      .padStart(2, '0')

  setSeconds()
  setInterval(setSeconds, 1000)

  const milliseconds = document.getElementById('milliseconds')
  const millisecondsOptions = { second: 'numeric', fractionalSecondDigits: 1 }
  const setMilliseconds = () =>
    milliseconds.innerText = new Intl.DateTimeFormat('en-US', millisecondsOptions)
      .format(new Date())
      .split('.')[1]

  setMilliseconds()
  setInterval(setMilliseconds, 100)
})