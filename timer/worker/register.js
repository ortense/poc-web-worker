document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const seconds = document.getElementById('seconds')
  const milliseconds = document.getElementById('milliseconds')
  const startStop = document.getElementById('start-stop')
  const reset = document.getElementById('reset')

  const worker = new Worker('./worker.js')

  const fireEvent = (type) => worker.postMessage(JSON.stringify({ type }))
  
  const sendStartStop = () => {
    fireEvent('start-stop')
    startStop.innerHTML = startStop.innerHTML === 'start' ? 'stop' : 'start'
    reset.classList.remove('hidden')
  }

  const sendReset = () => {
    fireEvent('reset')
    reset.classList.add('hidden')
  }

  const eventMap = {
    updateTime: (value) => time.innerText = value,
    updateSeconds: (value) => seconds.innerHTML = value,
    updateMilliseconds: (value) => milliseconds.innerHTML = value,
  }

  worker.addEventListener('message', ({ data }) => {
    try {
      const { type, value } = JSON.parse(data)
      eventMap[type]?.(value)
    } catch (error) {
      console.error(error);
    }
  })

  startStop.addEventListener('click', (event) => {
    event.preventDefault()
    sendStartStop()
  })

  reset.addEventListener('click', (event) => {
    event.preventDefault()
    sendReset()
  })

  document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') return sendStartStop()
    if (event.code === 'Escape') return sendReset()
  })
})