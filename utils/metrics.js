import client from "prom-client";

const collectDefaultMetrics = client.collectDefaultMetrics;

// Collect default metrics (CPU, memory, etc.)
collectDefaultMetrics();

// Create a histogram for HTTP request durations
const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});

// Middleware to observe request durations
export function metricsMiddleware(req, res, next) {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({
      method: req.method,
      route: req.route?.path || req.path,
      status_code: res.statusCode,
    });
  });
  next();
}

// Endpoint to expose metrics
export async function metricsEndpoint(req, res) {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
}
