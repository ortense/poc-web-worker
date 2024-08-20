document.addEventListener('DOMContentLoaded', () => {
  const time = document.getElementById('time')
  const seconds = document.getElementById('seconds')

  const eventMap = {
    updateTime: (value) => time.innerText = value,
    updateSeconds: (value) => seconds.innerHTML = value,
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
    'https://ortense.github.io/poc-web-worker-clock/js/workers/time.js',
    'https://ortense.github.io/poc-web-worker-clock/js/workers/seconds.js',
  ]

  workers
    .map(file => new Worker(file))
    .forEach(worker => worker.addEventListener('message', messageHadler))
})