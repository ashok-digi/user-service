import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const sdk = new NodeSDK({
  traceExporter,
  serviceName: 'user-service', 
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
    sdk.start()
    console.log('OpenTelemetry tracing initialized');
} catch (error) {
    console.error('Error initializing OpenTelemetry:', error);
}
