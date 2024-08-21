document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const seconds = document.getElementById('seconds')
  const milliseconds = document.getElementById('milliseconds')

  const eventMap = {
    updateTime: (value) => time.innerText = value,
    updateSeconds: (value) => seconds.innerHTML = value,
    updateMilliseconds: (value) => milliseconds.innerHTML = value,
  }

  function messageHadler({ data }) {
    try {
      const { type, value } = JSON.parse(data)
      eventMap[type]?.(value)
    } catch (error) {
      console.error(error);
    }
  }

  const workers = [
    './time.js',
    './seconds.js',
    './milliseconds.js',
  ]

  const handlerError = ErrorEvent => console.error(new AppError(ErrorEvent))

  workers
    .map(file => new Worker(file))
    .forEach(worker => { 
      worker.addEventListener('message', messageHadler)
      worker.onerror = handlerError
    })
})

class AppError extends Error {
  constructor(event) {
    const file = event.filename.split('/').pop() 
    super(`App ${file} throw exception "${event.message}" at line ${event.lineno}:${event.colno}`)
    this.event = event
    this.file = file
    this.name = 'AppError'
  }
}