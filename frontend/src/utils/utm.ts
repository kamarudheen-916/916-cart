export interface UtmParams {
  source?: string;
  medium?: string;
  campaign?: string;
}

export function parseUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  const searchParams = new URLSearchParams(window.location.search);
  const utmSource = searchParams.get('utm_source');
  const utmMedium = searchParams.get('utm_medium');
  const utmCampaign = searchParams.get('utm_campaign');

  const params: UtmParams = {};

  if (utmSource) params.source = utmSource;
  if (utmMedium) params.medium = utmMedium;
  if (utmCampaign) params.campaign = utmCampaign;

  // Stash in sessionStorage if found, so it persists during the visit
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem('bamboo_utm_params', JSON.stringify(params));
  }

  return params;
}

export function getCachedUtmParams(): UtmParams {
  if (typeof window === 'undefined') return {};

  try {
    const cached = sessionStorage.getItem('bamboo_utm_params');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.error('Error reading cached UTM parameters:', e);
  }

  return parseUtmParams();
}

export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('bamboo_session_id');
  if (!sessionId) {
    // Generate simple UUID-like string
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('bamboo_session_id', sessionId);
  }
  return sessionId;
}
