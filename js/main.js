document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const seconds = document.getElementById('seconds')

  const timeOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }

  function setTime() {
    time.innerText = new Intl.DateTimeFormat('en-US', timeOptions).format(new Date())
  }

  const secondsOptions = {
    second: 'numeric',
    fractionalSecondDigits: 1,
  }

  function setSeconds() {
    seconds.innerText = new Intl.DateTimeFormat('en-US', secondsOptions).format(new Date())
  }

  setTime()
  setSeconds()
  setInterval(setTime, 60 * 1000)
  setInterval(setSeconds, 100)
})