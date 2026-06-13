# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your TanStack Start application. Here is a summary of every change made:

- **`src/integrations/posthog/provider.tsx`** — Added `capture_exceptions: true` to the PostHog init config for automatic error tracking. Added a `ClerkPostHogSync` component that uses Clerk's `useUser` hook to call `posthog.identify()` whenever a user signs in and `posthog.reset()` (after capturing `user_signed_out`) when they sign out. This links all PostHog events to the Clerk user ID.
- **`src/routes/demo/convex.tsx`** — Wired `usePostHog` into the Convex todos demo to capture the full todo lifecycle: `todo_added`, `todo_completed`, `todo_reopened`, and `todo_deleted`.
- **`src/components/ThemeToggle.tsx`** — Captures `theme_changed` with the new theme value whenever a user cycles through light/dark/auto modes.
- **`src/routes/index.tsx`** — Captures `cta_clicked` with label and destination when users click the home-page hero CTAs ("About This Starter", "Router Guide").
- **`src/components/Header.tsx`** — Captures `external_link_clicked` with label and destination for the Docs, GitHub, and X links in the header.
- **`.env`** — Set `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` to your EU project credentials.

| Event | Description | File |
|---|---|---|
| `todo_added` | User adds a new todo item in the Convex demo | `src/routes/demo/convex.tsx` |
| `todo_completed` | User marks a todo item as completed | `src/routes/demo/convex.tsx` |
| `todo_reopened` | User unchecks a completed todo item | `src/routes/demo/convex.tsx` |
| `todo_deleted` | User removes a todo item | `src/routes/demo/convex.tsx` |
| `theme_changed` | User switches the app theme (light / dark / auto) | `src/components/ThemeToggle.tsx` |
| `cta_clicked` | User clicks a hero CTA on the home page | `src/routes/index.tsx` |
| `external_link_clicked` | User clicks an external link in the header | `src/components/Header.tsx` |
| `user_signed_out` | User signs out via Clerk; PostHog is reset after capture | `src/integrations/posthog/provider.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://eu.posthog.com/project/201168/dashboard/745856)
- [Todo activity over time (wizard)](https://eu.posthog.com/project/201168/insights/6AXj5AJ5)
- [Todo completion rate (wizard)](https://eu.posthog.com/project/201168/insights/pFX1AOyy)
- [Theme preference breakdown (wizard)](https://eu.posthog.com/project/201168/insights/dSLO9RSa)
- [External link clicks by destination (wizard)](https://eu.posthog.com/project/201168/insights/sp1F4G1V)
- [CTA clicks by label (wizard)](https://eu.posthog.com/project/201168/insights/tgtQcO35)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
