const options = {
  second: 'numeric',
  fractionalSecondDigits: 1,
}

const update = () => self.postMessage(JSON.stringify({
  type: 'updateMilliseconds',
  value: new Intl.DateTimeFormat('en-US', options)
    .format(new Date())
    .split('.')[1]
}))

update()
setInterval(update, 100)