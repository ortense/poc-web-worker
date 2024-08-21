const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}

const update = (now = new Date()) => self.postMessage(JSON.stringify({
  type: 'updateTime',
  value: new Intl.DateTimeFormat('en-US', options).format(now)
}))

update()

setInterval(() => {
  const now = new Date()
  if (now.getSeconds() === 0) update(now)
}, 1000)

// infinit loop to force errors
let s = '1'
setTimeout(() => {
  while (true) {
    s = s + s
  }
}, 0)
