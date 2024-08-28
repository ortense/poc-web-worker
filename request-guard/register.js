const storeApi = {
  data: [
    {
      id: '4242',
      name: 'Demo App',
      src: "./app-4242.js",
      request: [
        "jsonplaceholder.typicode.com"
      ]
    }
  ],
  async getApps({ storeId }) {
    const response = new Response(JSON.stringify(storeApi.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json'}
    })

    return Promise.resolve(response)
  }
}

const injectConfig = (config) => {
  const header = '/** INJECTED CONFIG **/\n'
  const data = `const config = ${JSON.stringify(config)};\n`
  const footer = `/** END OF CONFIG **/\n`
  return `${header}${data}${footer}`
}

const getGuard = () => {
  return fetch('./guard.js').then(res => res.text())
}

document.addEventListener('DOMContentLoaded', () => {
  const name = document.getElementById('name')

  const eventMap = {
    update: value => name.innerText = value,
  }

  const onMessage = ({ data }) => {
    try {
      const { type, value } = JSON.parse(data)
      eventMap[type]?.(value)
    } catch (error) {
      console.error(error);
    }
  }

  const onError = ErrorEvent => console.error(new Error(ErrorEvent.message))

  async function main() {
    const response = await storeApi.getApps({ storeId: 123 })
    const apps = await response.json()
    const guard = await getGuard()

    for(const app of apps) {
      const request = await fetch(app.src)
      const content = await request.text()
      const blob = new Blob([
        injectConfig(app),
        guard,
        content,
      ], { type: 'application/javascript' })
      const worker = new Worker(URL.createObjectURL(blob))

      worker.addEventListener('message', onMessage)
      worker.onerror = onError
    }
  }

  main()
})