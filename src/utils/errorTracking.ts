import posthog from 'posthog-js';

type ErrorContext = {
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
};

type ErrorLevel = 'error' | 'warning' | 'info';

/**
 * Centralized error tracking utility
 * Sends errors to PostHog and logs to console in development
 */
export const trackError = (
  error: Error | string,
  context?: ErrorContext,
  level: ErrorLevel = 'error'
): void => {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console[level]('[Error Tracking]', {
      message: errorMessage,
      stack: errorStack,
      ...context,
    });
  }

  // Send to PostHog
  if (posthog.__loaded) {
    if (typeof error === 'string') {
      posthog.capture('error', {
        message: errorMessage,
        level,
        ...context,
      });
    } else {
      posthog.captureException(error, {
        level,
        ...context,
      });
    }
  }
};

/**
 * Track specific user actions or events
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, unknown>
): void => {
  if (posthog.__loaded) {
    posthog.capture(eventName, properties);
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Event Tracking]', eventName, properties);
  }
};

/**
 * Identify user for tracking
 */
export const identifyUser = (
  userId: string,
  properties?: Record<string, unknown>
): void => {
  if (posthog.__loaded) {
    posthog.identify(userId, properties);
  }
};

/**
 * Reset user tracking (useful for logout)
 */
export const resetTracking = (): void => {
  if (posthog.__loaded) {
    posthog.reset();
  }
};
