export type AnalyticsEvent = 'game_started' | 'game_completed' | 'game_favorited' | 'game_shared' | 'search_performed' | 'category_opened';
export function trackEvent(event: AnalyticsEvent, properties?: Record<string, string | number>) { if (process.env.NODE_ENV === 'development') console.debug('[analytics]', event, properties ?? {}); }
