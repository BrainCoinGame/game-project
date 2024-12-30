addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    const url = new URL(request.url)
    
    // Serve static assets from dist directory
    if (url.pathname === '/') {
      return fetch('dist/index.html')
    }
    
    // Serve other static files
    return fetch(`dist${url.pathname}`)
  }