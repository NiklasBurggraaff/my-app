import posthog from "posthog-js";
import { PostHogProvider as BasePostHogProvider, usePostHog } from "@posthog/react";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useRef, type ReactNode } from "react";

if (typeof window !== "undefined" && import.meta.env.VITE_POSTHOG_KEY) {
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || "https://us.i.posthog.com",
    person_profiles: "identified_only",
    capture_pageview: false,
    capture_exceptions: true,
    defaults: "2025-11-30",
  });
}

function ClerkPostHogSync() {
  const { user, isLoaded } = useUser();
  const posthogClient = usePostHog();
  const previousUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      posthogClient.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName ?? undefined,
      });
      previousUserId.current = user.id;
    } else if (previousUserId.current) {
      posthogClient.capture("user_signed_out");
      posthogClient.reset();
      previousUserId.current = null;
    }
  }, [user, isLoaded, posthogClient]);

  return null;
}

interface PostHogProviderProps {
  children: ReactNode;
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  return (
    <BasePostHogProvider client={posthog}>
      <ClerkPostHogSync />
      {children}
    </BasePostHogProvider>
  );
}
