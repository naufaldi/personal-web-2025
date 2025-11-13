---
title: "From Fetcher Function to Custom Hook: A Practical Guide with React Query"
slug: from-fetcher-function-to-custom-hook-a-practical-guide-with-react-query
description: "![Image](https://blog.faldi.xyz/content/images/2025/05/image-2.png)"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2025-05-13
image: "http://blog.faldi.xyz/content/images/2025/05/Data-Flow-Illustration-Sora.png"
canonical: "http://blog.faldi.xyz/from-fetcher-function-to-custom-hook-a-practical-guide-with-react-quer/"
---


![Image](https://blog.faldi.xyz/content/images/2025/05/image-2.png)

## **1\. Introduction**

Data fetching in React often starts simple. A classic example looks like this:

```javascript
fetch('<https://jsonplaceholder.typicode.com/posts/1>')
  .then((res) => res.json())
  .then((data) => console.log(data));
```

This works, until it doesn’t.

As the complexity of your app grows, so does the complexity of managing your data-fetching logic. At some point, you’ll need to handle more than just fetching data, you’ll need to:

*   Track loading and error states
*   Retry failed requests
*   Cache data for better performance
*   Handle background refetching when the user switches tabs

What starts as simple fetching soon snowballs into a tangled web of repeated logic, error handling, and UI management.

This guide aims to help you structure your data-fetching logic in a way that’s **maintainable, reusable**, and **scalable**. We’ll look at how to:

*   **Separate concerns** by isolating the fetching logic.
*   Use **custom hooks** to make data-fetching declarative and easier to manage.
*   Improve the **scalability** of your app with reusable and centralized logic.

### **1.1 Basic Fetch Inside a React Component**

```javascript
function Post() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('<https://jsonplaceholder.typicode.com/posts/1>')
      .then((res) => res.json())
      .then(setData);
  }, []);

  return <pre>{JSON.stringify(data)}</pre>;
}
```

Still fine. But what if the request fails?

### **1.2 Add Loading State**

```javascript
function Post() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('<https://jsonplaceholder.typicode.com/posts/1>')
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data)}</pre>;
}
```

Now you’ve got basic UX coverage. But what about error handling?

### **1.3 Add Error Handling**

```javascript
function Post() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('<https://jsonplaceholder.typicode.com/posts/1>')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return <pre>{JSON.stringify(data)}</pre>;
}
```

You’re now managing the basic control flow. But this code:

*   doesn’t cache the data,
*   doesn’t refetch if the tab regains focus,
*   doesn’t deduplicate duplicate calls,
*   and spreads fetching logic into your component, making it harder to test and maintain.

### **1.4 Add Caching and Background Refetching (Manually)**

To implement those features yourself, you’d need to:

*   set up a global cache store (like Zustand or Redux),
*   store timestamps for stale checks,
*   manually handle refetch triggers on visibilitychange,
*   and write logic to retry or invalidate data.

That’s a lot of boilerplate and bug surface just to fetch data.

### **1.5 Why Use React Query?**

Sure, we _could_ manually implement caching, background refetching, retry logic, and visibility-based updates. But once your app grows and your team expands, this DIY approach becomes hard to maintain, and even harder to explain.

To make it reproducible and understandable for other developers, you’d need solid documentation and a clear contract for how the data layer works. That’s where libraries come in, to **standardize the patterns**, reduce boilerplate, and make onboarding smoother.

In the React ecosystem, two popular libraries cover this ground:

*   **SWR** (from Vercel)
*   **React Query** (from TanStack)

In this post, we’ll focus on React Query (now published as `@tanstack/react-query`).

**Why React Query?**

*   It’s widely adopted and actively maintained
*   Built-in support for **loading**, **error**, and **data** states
*   Handles **caching**, **background refetching**, and **retry logic**
*   Offers fine-grained **query invalidation**
*   Supports **lazy queries**, **pagination**, **infinite scroll**, and more

More importantly, it changes how we think about data in React, shifting from an **imperative** approach to a **declarative** one.

### **What is “Imperative Fetch and Set State”?**

This is when _you_ explicitly control the flow:

```javascript
useEffect(() => {
  setLoading(true);
  fetch('/api')
    .then((res) => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

You handle when to fetch, where to store it, and how to update state. It’s verbose, error-prone, and hard to scale across teams.

### **What is “Declarative Server-State Management”?**

React Query lets you express intent:

“I want this data, and here’s how to fetch it.”

```javascript
const { data, isLoading, isError } = useQuery({
  queryKey: ['campaign'],
  queryFn: getCampaign,
});
```

The library handles the rest, caching, retries, background updates, based on your declared options. You no longer worry _when_ or _how_ to trigger a fetch. You just consume the result.

This abstraction makes your components simpler, your logic more predictable, and your codebase more scalable.

## **2\. Setting the Stage: The API Layer**

Before jumping into React Query, we need to talk about the foundation: the **API layer**. This is where we configure how our frontend communicates with the backend, setting up things like the base URL, headers, timeouts, and authentication.

Without a centralized setup, this kind of code tends to show up everywhere:

```javascript
const response = await axios.get('<https://api.example.com/campaign>', {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
```

Or worse, someone forgets to set the timeout, or misspells a header. Now you’re debugging inconsistent behavior across the app.

This is where a centralized **API client** becomes essential.

### **The Problem with Repeating API Config**

When you repeat the same setup logic (headers, tokens, timeouts) across every request, you’re:

*   increasing the risk of bugs,
*   duplicating boilerplate,
*   making global changes painful (e.g., updating a header format),
*   and hurting readability.

That’s why we abstract this into a reusable API client.

### **A Centralized API Client (with Axios)**

In our case, we use Axios to create a reusable client function that takes care of:

*   setting a base URL (from environment config),
*   injecting auth tokens (if present),
*   applying consistent headers (like Content-Type),
*   and enforcing timeouts.

```javascript
import axios from 'axios';

const DEFAULT_TIMEOUT = 120_000;

export function createApiClient(token?: string, extraConfig = {}) {
  return axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extraConfig.headers,
    },
    ...extraConfig,
  });
}
```

### **Why This Matters**

This abstraction:

*   keeps your API setup **DRY** (Don’t Repeat Yourself),
*   avoids human error when setting headers manually,
*   and simplifies your actual API calls.

Here’s how it looks when calling a resource:

```javascript
const client = createApiClient(userToken);
const response = await client.get('/campaign');
```

No need to worry about base URLs or missing headers, the client handles that. It also makes mocking and testing easier, since you’re always using the same factory.

### **Why Axios (Not Fetch)?**

You can build this layer using fetch too. But Axios:

*   has built-in timeout support (no need for AbortController),
*   automatically transforms JSON,
*   and has cleaner syntax for interceptors and error handling.

We’ll save the deeper axios vs fetch comparison for another post, but for our needs here, Axios provides more simple.

## **3\. Defining the Fetcher Functions**

After setting up the base API client, the next step is writing fetcher functions, functions that make the _actual_ HTTP requests to specific endpoints.

These functions are where the real business of API communication happens. While the apiClient handles shared concerns like headers and base URL, fetcher functions handle **what to call**, **with what params**, and **how to handle errors**.

### **Fetching a Specific Resource:**

### fetchActiveCampaigns

Here’s an example of a fetcher function that retrieves a list of active campaigns from the server. It uses the token for authentication and a regionId as a query parameter.

```javascript
// src/api/campaigns.ts
import { createApiClient } from './apiClient'; // centralized api
import { isAxiosError } from 'axios';
import { reportApiError } from './logger'; // Optional error tracker

type CampaignList = {
  id: string;
  name: string;
  isActive: boolean;
}[];

export async function fetchActiveCampaigns(token: string, regionId: string): Promise<CampaignList> {
  try {
    const client = createApiClient(token);

    const response = await client.get('/campaigns/active', {
      params: { region: regionId },
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      reportApiError(error, {
        feature: 'campaigns',
        regionId,
      });
    }

    throw new Error('Unable to fetch active campaigns');
  }
}
```

### **What This Function Does**

*   **Uses the shared createApiClient()** to get an Axios instance with the right base URL, headers, and timeout.
*   Makes a **GET** request to /campaigns/active, passing the regionId as a query parameter.
*   **Returns the parsed data** (already JSON-decoded by Axios).
*   Handles errors with try/catch:
*   If the error is Axios-specific, it logs it using a utility like reportApiError().
*   Then throws a clean, generic error message that can be caught by consumers (like a hook or component).

### **Why Wrap in try/catch ?**

Wrapping fetchers in try/catch gives you full control over:

1.  **Error visibility** – You can plug in a logger or observability tool like Sentry to report meaningful context (e.g., which feature, which input).
2.  **Consistent boundaries** – Instead of leaking internal Axios error structures, you can throw a consistent shape or message.
3.  **Decoupled responsibility** – Fetchers don’t need to handle UI fallback or retries; that logic stays with the hook or component.

### **Optional: Logging Errors (e.g., with Sentry)**

```javascript
// src/api/logger.ts
export function reportApiError(error: unknown, context: { feature: string; regionId: string }) {
  console.error(`[API Error][${context.feature}]`, {
    region: context.regionId,
    error,
  });

  // Example with Sentry (if used)
  // import('@sentry/react').then(Sentry => {
  //   Sentry.captureException(error, (scope) => {
  //     scope.setTag('feature', context.feature);
  //     scope.setTag('regionId', context.regionId);
  //     return scope;
  //   });
  // });
}
```

### **Key Takeaways**

Fetcher functions serve a critical role in your data-fetching workflow. They:

*   Are closely tied to specific resources (like campaigns, orders, users).
*   Encapsulate the API call logic, including handling parameters and errors.
*   Leverage a centralized API client to reduce duplication and ensure consistency across requests.
*   Keep components and hooks focused on their core responsibilities — UI rendering, not data fetching.
*   Provide a centralized place for error logging, which can be easily expanded to include tools like Sentry or custom logging solutions.

By isolating these responsibilities into fetcher functions, you create a more maintainable, scalable approach to handling API calls in your app.

## **4\. The Core: React Query Options**

Now that we’ve set up the fetcher, it’s time to integrate it with **React Query**.

Instead of calling useQuery() directly with all arguments inside the hook, we’ll first define a separate function that returns the **query options**, like queryKey, queryFn, and other flags.

This separation gives us more flexibility:

*   easier to unit test,
*   easier to reuse the config elsewhere,
*   and more readable when working in teams.

### **Creating the Query Options Function**

We’ll use TanStack’s queryOptions() utility to return everything React Query needs for managing a specific request.

Here’s an example based on our campaign fetcher:

```javascript
// src/queries/campaigns.ts
import { queryOptions } from '@tanstack/react-query';
import { fetchActiveCampaigns } from '../api/campaigns';

export const ACTIVE_CAMPAIGN_QUERY_KEY = 'active-campaigns';

export function getActiveCampaignsQueryOptions(token: string, regionId: string) {
  return queryOptions({
    queryKey: [ACTIVE_CAMPAIGN_QUERY_KEY, regionId],
    queryFn: () => fetchActiveCampaigns(token, regionId),
    retry: false,
    enabled: !!regionId, // don’t run unless regionId is set
    refetchOnWindowFocus: (query) => query.state.data !== undefined,
  });
}
```

### **🔍 Breakdown of Each Option**

**Option**

**Purpose**

**queryKey**

Unique cache key for this query. Include dynamic values like regionId so that React Query can differentiate cache entries correctly.

**queryFn**

The actual fetcher function. This is where we call our fetchActiveCampaigns() function with required parameters.

**retry**

Set to false to avoid automatic retries for failed requests. (You can adjust this per use case.)

**enabled**

Conditional flag to tell React Query when it should run this query. Useful for things like “only run if regionId is available”.

**refetchOnWindowFocus**

Custom logic to only refetch if we already have data. Prevents unnecessary requests on tab switch.

For further options and in-depth details on query configurations, we recommend reading the [TanStack Query Documentation](https://tanstack.com/query?ref=blog.faldi.xyz) to fully understand how to use React Query’s options for your specific needs.

* * *

### **Why Define `queryKey` as a Constant?**

We define `ACTIVE_CAMPAIGN_QUERY_KEY` as a constant to:

*   avoid typos across multiple files,
*   make cache management easier (e.g., for invalidateQueries),
*   improve readability and refactorability.

Even better, since it’s an array, we can add parameters like regionId to scope cache entries by input.

## **5\. Creating the Custom Hook**

With the query options extracted into a function, the custom hook itself becomes very lean. Its job is simply to gather any required state (like tokens or identifiers) and pass those into the options function.

Here’s an example:

```javascript
// src/hooks/useActiveCampaigns.ts
import { useQuery } from '@tanstack/react-query';
import { getActiveCampaignsQueryOptions } from '../queries/campaigns';
import { useSessionStore, useRegionStore } from '../stores';

export function useActiveCampaigns() {
  const { authToken } = useSessionStore();
  const { selectedRegionId } = useRegionStore();

  return useQuery(getActiveCampaignsQueryOptions(authToken, selectedRegionId));
}
```

### **What This Hook Does**

*   Pulls required values (authToken, regionId) from Zustand or any other global state/store.
*   Passes those values to the getActiveCampaignsQueryOptions() function.
*   Returns the full result of useQuery(), including:
*   data
*   isPending / isLoading
*   isError
*   and other helpers (like refetch, error, status, etc.)

### **Why Separate `queryOptions` From the Hook?**

This pattern gives us several advantages:

1.  **Cleaner Hooks** The hook stays focused. No more embedded config or bloated logic inside the useQuery() call.
2.  **Testability**You can test getActiveCampaignsQueryOptions() in isolation, without mounting a component or using React Query’s testing tools.
3.  **Reusability** You can reuse the query options outside React, for example:

```
const options = getActiveCampaignsQueryOptions(token, region);
queryClient.prefetchQuery(options);
```

4\. **Debuggability**

When you need to inspect why a query failed, it’s easier to isolate and log query behavior if the config is broken out cleanly.

This structure keeps logic composable and transparent, especially when your app has dozens of hooks.

## **6\. Using the Custom Hook in a Component**

Once the hook is built, using it in a component becomes dead simple:

```javascript
import { useActiveCampaigns } from '../hooks/useActiveCampaigns';

export function CampaignList() {
  const {
    data: campaigns,
    isPending,
    isError,
    error,
  } = useActiveCampaigns();

  if (isPending) return <p>Loading campaigns...</p>;
  if (isError) return <p>Something went wrong: {error.message}</p>;

  return (
    <ul>
      {campaigns?.map((campaign) => (
        <li key={campaign.id}>{campaign.name}</li>
      ))}
    </ul>
  );
}
```

### **What You Get**

*   No need to worry about axios, tokens, headers, or caching logic
*   The component just calls useActiveCampaigns() and reacts to state: loading, error, or data
*   It reads almost like pseudo-code, which is the goal of good abstraction

## **7\. Benefits of This Pattern**

By separating concerns, API client, fetchers, query options, and custom hooks, we create a pattern that scales well in large React apps.

Here’s why this approach works:

### **Reusability**

Each piece is reusable in isolation:

*   The API client can be shared across services.
*   Fetcher functions can be reused in different contexts (SSR, prefetching, hooks).
*   Query options can be plugged into useQuery, prefetchQuery, or server hydration.

### **Maintainability**

If you need to change an endpoint, update headers, or tweak query behavior (like retries or stale times), you can do so without touching components or copy-pasting config across files.

### **Testability**

*   You can unit test fetchers with mocked Axios responses.
*   You can test queryOptions logic without rendering components.
*   The final hook can be tested using `@testing-library/react` or `react-hooks-testing-library`.

### **Readability**

Hooks like useActiveCampaigns() read like intent:

> “Give me active campaigns, and let me worry only about the result.”

No clutter. No noise. Components stay focused on rendering, not orchestrating HTTP.

### **Type Safety**

With TypeScript, types flow naturally:

*   API responses are typed in the fetcher.
*   The hook and component receive that type automatically from React Query’s generic return.
*   This eliminates a whole category of runtime bugs.

* * *

## **When This Pattern Works Best**

This level of abstraction good in:

### **Large Codebases**

Where multiple teams are working across feature domains, and consistency matters.

### **Team Environments**

Where you want a shared convention for data fetching that others can follow easily. No surprises. Just: “This is how we fetch data here.”

### **High-Frequency Data Access**

Apps with many data-driven views, frequent query reuse, or server-side rendering requirements benefit the most from breaking things into layers.

## **Tradeoffs and Considerations**

While this abstraction is powerful, keep in mind:

*   It **adds boilerplate** upfront. For small apps, inlining `useQuery()` might be fine.
*   It **requires discipline**, teams must agree to follow the pattern.
*   If your project is very small or throwaway, this may be overkill.

But in serious apps, especially with shared state, permissions, multi-role UIs, etc., this pattern pays off fast.

## **8\. Conclusion**

Here’s the full data fetching pipeline we just walked through:

```
createApiClient → fetcher function → queryOptions → custom hook → component
```

Each layer has a single responsibility:

*   The client handles shared config
*   The fetcher knows what endpoint to call
*   The options define how React Query behaves
*   The hook connects it all together
*   The component just renders based on the result

By separating those layers, you get:

*   **Code that’s easy to reuse**
*   **Logic that’s easy to test**
*   **Behavior that’s easy to tune**
*   **Components that stay clean and declarative**

Whether you’re scaling a team or just want fewer bugs in your frontend, this is a pattern worth adopting.

Bagikan[](https://twitter.com/share?text=From Fetcher Function to Custom Hook: A Practical Guide with React Query&url=http://blog.faldi.xyz/from-fetcher-function-to-custom-hook-a-practical-guide-with-react-quer/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/from-fetcher-function-to-custom-hook-a-practical-guide-with-react-quer/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/from-fetcher-function-to-custom-hook-a-practical-guide-with-react-quer//&title=From Fetcher Function to Custom Hook: A Practical Guide with React Query "LinkedIn")[](/cdn-cgi/l/email-protection#211e5254434b4442551c67534e4c01674455424944530167544f4255484e4f01554e01625452554e4c01694e4e4a1b01600171534042554842404d016654484544015648554901734440425501705444535807404c511a434e45581c495555511b0e0e434d4e460f47404d45480f59585b0e47534e4c0c474455424944530c47544f4255484e4f0c554e0c425452554e4c0c494e4e4a0c400c51534042554842404d0c46544845440c564855490c53444042550c505444530e "Email")

Topik [Documentation](/tag/documentation/) [NextJS](/tag/nextjs/) [ReactJS](/tag/reactjs/) [Snippet](/tag/snippet/)

[

## Share the Truth, Don’t Normalize the Problem

This screenshot appeared on my feed and speaks directly to jobseekers. Here’…

11 Jun 2025



](/share-the-truth-dont-normalize-the-problem/)[

## Laid Off. Burned Out. Then Hired as a Senior Engineer.

How Do I Begin? Maybe I should start with a timeline — something…

06 Mei 2025



](/laid-off-burned-out-hired-senior-engineer/)