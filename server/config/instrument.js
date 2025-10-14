// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node" 
import {nodeProfilingIntegration} from "@sentry/profiling-node";


Sentry.init({
  dsn: "https://4272346050b9a3821634ba372df65a44@o4510002165383168.ingest.us.sentry.io/4510002170757120",
   integrations: [
    nodeProfilingIntegration(),
    Sentry.mongooseIntegration(),
  ],
});

Sentry.profiler.startProfiler();