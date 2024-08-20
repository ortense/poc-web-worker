const options = {
  second: 'numeric',
  fractionalSecondDigits: 1,
}

function update() {
  self.postMessage(JSON.stringify({
    type: 'updateSeconds',
    value: new Intl.DateTimeFormat('en-US', options).format(new Date())
  }))
}

update()
setInterval(update, 100)