'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const PostHogPageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams && searchParams.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
};

type PostHogProviderProps = {
  children: React.ReactNode;
};

export const PostHogProvider = ({ children }: PostHogProviderProps) => {
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;

    if (!apiKey) {
      console.warn('PostHog: NEXT_PUBLIC_POSTHOG_KEY not found');
      return;
    }

    if (!posthog.__loaded) {
      posthog.init(apiKey, {
        api_host: apiHost || 'https://us.posthog.com',
        capture_pageview: false, // Handled by PostHogPageView component
        autocapture: true, // Automatically capture clicks, form submissions
        disable_session_recording: true, // Disabled per user preference
        loaded: (ph) => {
          if (process.env.NODE_ENV === 'development') {
            ph.debug();
          }
        },
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
};

export { usePostHog } from 'posthog-js/react';
