/** INJECTED REQUEST GUARD **/
((c, f) => {
  function isAllowedDomain(url) {
    const allowedDomains = c.request;
    const { hostname } = new URL(url);
    return allowedDomains.includes(hostname);
  }

  self.fetch = function fetchWrapper(url, options) {
    if (!isAllowedDomain(url)) {
      return Promise.reject(new TypeError(`Unauthorized request to ${url}`))
    }

    return f(url, options)
  }

  console.log(`Request guardian created to ${c.name} (${c.id})`)
})(config, fetch)
/** END OF REQUEST GUARD **/
