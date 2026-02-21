import * as Sentry from "@sentry/node"
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: "https://c43cf44c795ea864911255b2c5d18a72@o4510923616419840.ingest.us.sentry.io/4510923619565568",
  integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration()
  ],
  //tracesSampleRate: 1.0, // Capture 100% of the transactions
});

Sentry.profiler.startProfiler();

Sentry.startSpan(
  {
    name: "My First Transaction",
  },
  () => {
    // Your code here
  }
);

Sentry.profiler.stopProfiler();