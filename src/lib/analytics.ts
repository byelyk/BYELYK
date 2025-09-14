// Analytics tracking module
// TODO: Replace with actual analytics service (Google Analytics, Mixpanel, etc.)

export function track(event: string, payload?: Record<string, unknown>) {
  // No-op for MVP - replace with actual analytics implementation
  console.log('Analytics Event:', event, payload);
  
  // Example implementation:
  // gtag('event', event, payload);
  // or
  // mixpanel.track(event, payload);
}

export const ANALYTICS_EVENTS = {
  RATE_DORM: 'rate_dorm',
  RATE_FIT: 'rate_fit',
  SUBMIT_APPLICATION: 'submit_application',
  VIEW_DORM_DETAIL: 'view_dorm_detail',
  VIEW_FIT_DETAIL: 'view_fit_detail',
  SEARCH_DORMS: 'search_dorms',
  SEARCH_FITS: 'search_fits',
  FILTER_DORMS: 'filter_dorms',
  FILTER_FITS: 'filter_fits',
  CLICK_APPLY_CTA: 'click_apply_cta',
  VIEW_LEADERBOARD: 'view_leaderboard'
} as const;
