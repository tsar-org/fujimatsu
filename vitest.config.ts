import { defineWorkersConfig } from '@cloudflare/vitest-pool-workers/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/write-your-first-test/
export default defineWorkersConfig({
  plugins: [tsconfigPaths()],
  test: {
    // https://vitest.dev/guide/coverage
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json-summary', 'json'],
    },
    poolOptions: {
      workers: {
        wrangler: { configPath: './wrangler.toml' },
      },
    },
  },
});
