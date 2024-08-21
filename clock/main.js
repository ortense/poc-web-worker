document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  const setTime = (now = new Date()) =>
    time.innerText = new Intl.DateTimeFormat('en-US', timeOptions)
      .format(now)

  setTime()
  setInterval(() => {
    const now = new Date()
    if (now.getSeconds() === 0) setTime()
  }, 1000)

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