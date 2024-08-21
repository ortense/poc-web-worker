const options = {
  second: 'numeric',
}

const update = () => self.postMessage(JSON.stringify({
  type: 'updateSeconds',
  value: new Intl.DateTimeFormat('en-US', options)
    .format(new Date())
    .padStart(2, '0')
}))

update()
setInterval(update, 1000)