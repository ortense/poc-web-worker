const padStart = val => val.toString().padStart(2, '0')
const getHours = count => padStart(Math.floor(count / (10 * 60 * 60)))
const getMinutes = count => padStart(Math.floor(count / (10 * 60)) % 60)
const getSeconds = count => padStart(Math.floor(count / 10) % 60)
const getTenths = count =>  Math.floor((count * 100 % 1000) / 100)

const state = {
  running: false,
  count: 0,
  interval: null,
}

const fireEvent = (type, value) => self.postMessage(
  JSON.stringify({ type, value })
)

const stop = () => {
  state.running = false
  clearInterval(state.interval)
}

const start = () => {
  state.running = true
  state.interval = increment()
}

const reset = () => {
  stop()
  state.count = 0
  state.interval = null
  fireEvent('updateTime', '00:00')
  fireEvent('updateSeconds', '00')
  fireEvent('updateMilliseconds', '0')
}

const increment = () => {
  return setInterval(() => {
      state.count = state.count + 1

      const tenths = getTenths(state.count)
      
      fireEvent('updateMilliseconds', tenths)

      if (tenths === 0) {
        const seconds = getSeconds(state.count)
        
        fireEvent('updateSeconds', seconds)

        if(seconds === '00') {
          fireEvent('updateTime', `${getHours(state.count)}:${getMinutes(state.count)}`)
        }
      }
    }, 100)
}

self.addEventListener('message', ({ data }) => {
  const { type } = JSON.parse(data)

  if (type === 'start-stop') {
    return state.running ? stop() : start()
  }

  if (type === 'reset') return reset()
})

