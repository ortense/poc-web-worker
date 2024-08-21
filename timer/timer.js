document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const seconds = document.getElementById('seconds')
  const milliseconds = document.getElementById('milliseconds')
  const startStop = document.getElementById('start-stop')
  const reset = document.getElementById('reset')

  const state = {
    running: false,
    count: 0,
    interval: null
  }

  const start = () => {
    startStop.innerHTML = 'stop'
    state.running = true
    state.interval = increment()
    reset.classList.remove('hidden')
  }

  const stop = () => {
    startStop.innerHTML = 'start'
    state.running = false
    clearInterval(state.interval)
  }

  const toggleState = () => {
    state.running ? stop() : start()
  }

  const clearState = () => {
    stop()
    state.count = 0
    state.interval = null
    milliseconds.innerText = '0'
    seconds.innerText = '00'
    time.innerText = '00:00'
    reset.classList.add('hidden')
  }

  startStop.addEventListener('click', () => toggleState())
  reset.addEventListener('click', () => clearState())

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
      toggleState()
      return
    }

    if (event.code === 'Escape') {
      clearState()
      return
    }
  })

  const padStart = val => val.toString().padStart(2, '0')
  const getHours = count => padStart(Math.floor(count / (10 * 60 * 60)))
  const getMinutes = count => padStart(Math.floor(count / (10 * 60)) % 60)
  const getSeconds = count => padStart(Math.floor(count / 10) % 60)
  const getTenths = count =>  Math.floor((count * 100 % 1000) / 100);

  function increment() {
    return setInterval(() => {
      state.count = state.count + 1
      milliseconds.innerText = getTenths(state.count)
      seconds.innerText = getSeconds(state.count)
      time.innerText = `${getHours(state.count)}:${getMinutes(state.count)}`
      
    }, 100)
  }

  if ((new URL(location.href)).searchParams.has('auto')) {
    start()

    setTimeout(() => {
      stop()
    }, 5000);
  }
})