// GraphQL Client
const GRAPHQL_URL = import.meta.env.WORDPRESS_GRAPHQL_URL || 'https://example.com/graphql';

// Page renders issue the same site-wide queries (settings, menus, services…)
// from several components. Cache + in-flight dedupe so one navigation costs
// one round-trip per unique query instead of one per call site.
const CACHE_TTL_MS = import.meta.env.DEV ? 10_000 : 60_000;
const FETCH_TIMEOUT_MS = 10_000;

type CacheEntry = { value: unknown; expires: number };
const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<unknown>>();

export class GraphQLClient {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const key = JSON.stringify([query, variables ?? null]);

    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) return hit.value as T;

    const pending = inflight.get(key);
    if (pending) return pending as Promise<T>;

    const request = (async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
      try {
        const response = await fetch(this.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query, variables }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GraphQL request failed: ${response.statusText}`);
        }

        const json = await response.json();

        if (json.errors) {
          throw new Error(json.errors[0].message);
        }

        cache.set(key, { value: json.data, expires: Date.now() + CACHE_TTL_MS });
        return json.data;
      } catch (error) {
        console.error('GraphQL Error:', error);
        throw error;
      } finally {
        clearTimeout(timer);
        inflight.delete(key);
      }
    })();

    inflight.set(key, request);
    return request as Promise<T>;
  }
}

export const graphqlClient = new GraphQLClient(GRAPHQL_URL);
