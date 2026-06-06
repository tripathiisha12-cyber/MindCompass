export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // Extract path after /api/feedback-sync/
    const url = req.url || '';
    // Remove query string
    const urlWithoutQuery = url.split('?')[0];
    // Strip the /api/feedback-sync prefix to get the downstream path
    const pathSegment = urlWithoutQuery.replace(/^\/api\/feedback-sync\/?/, '').replace(/^\/api\/feedback\.js\/?/, '');

    // Construct the destination URL
    const destinationUrl = `https://keyvalue.immanuel.co/api/KeyVal/${pathSegment}`;

    console.log('[feedback proxy] req.url:', url, '=> destination:', destinationUrl);

    // Forward the request to the key-value store
    const fetchOptions = {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
      }
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      const chunks = [];
      for await (const chunk of req) {
        chunks.push(chunk);
      }
      fetchOptions.body = Buffer.concat(chunks);
    }

    const externalRes = await fetch(destinationUrl, fetchOptions);
    const contentType = externalRes.headers.get('content-type');
    const responseBody = await externalRes.text();

    res.setHeader('Content-Type', contentType || 'application/json');
    res.status(externalRes.status).send(responseBody);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy failed to forward request' });
  }
}
