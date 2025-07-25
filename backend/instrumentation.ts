import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const sdk = new NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: 'user-service',
    [SemanticResourceAttributes.SERVICE_VERSION]: '1.0',
  }),
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://jaeger:4318/v1/traces',
    headers: {},
  }),

});

// Start the SDK before your app starts
sdk.start()
  .then(() => console.log('OpenTelemetry SDK started'))
  .catch((err) => console.error('Error starting OpenTelemetry SDK', err));

// Optional: handle graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shutdown complete'))
    .catch((err) => console.error('Error during OpenTelemetry SDK shutdown', err))
    .finally(() => process.exit(0));
});
