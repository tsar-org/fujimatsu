// FYI: https://developers.cloudflare.com/workers/testing/vitest-integration/get-started/write-your-first-test/
// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
export const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;
