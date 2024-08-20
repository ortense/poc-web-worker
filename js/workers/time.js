const options = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
}

const update = () => self.postMessage(JSON.stringify({
  type: 'updateTime',
  value: new Intl.DateTimeFormat('en-US', options).format(new Date())
}))

update()
setInterval(update, 60 * 1000)