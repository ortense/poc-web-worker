const api = 'https://jsonplaceholder.typicode.com'

const getName = (id) => fetch(`${api}/users/${id}`)
  .then(res => res.json())
  .then(user => user.name)

const random = () => Math.floor(Math.random() * 10) + 1

const update = () => 
  getName(random())
    .then(value => self.postMessage(JSON.stringify({ type: 'update', value })))

setInterval(() => {
  update()
}, 2000)