---
title: "Managing State in React: Why You Should Avoid &quot;Too Much State&quot; in a Single Component"
slug: managing-state-in-react-why-you-should-avoid-quot-too-much-state-quot-in-a-single-component
description: "In React projects, it’s common to see components with a long list of state variables, sometimes more than ten in one file. State helps us keep track of changing"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2025-06-17
image: "http://blog.faldi.xyz/content/images/2025/06/ChatGPT-Image-Jun-17-2025-React-State-Management.png"
canonical: "http://blog.faldi.xyz/untitled-2/"
---

In React projects, it’s common to see components with a long list of state variables, sometimes more than ten in one file. State helps us keep track of changing data in our apps. Often, we manage all this state in one place, especially when a component is in charge of things like search, filters, and pagination for its children.

But putting all the state in one component usually causes problems. The code becomes harder to read, maintain, and update. When state is scattered everywhere, fixing bugs or adding new features takes more time and effort.

Let’s look at a typical example: a product listing page with filters and pagination. This pattern isn’t just for e-commerce; any app that lists data can run into the same issues. In this article, I’ll explain why it’s better to avoid putting too much state in one component, and I’ll show practical ways to manage state more simply.

## **When Should You Use State in a Component?**

Before reaching for `useState`, ask yourself a simple question: **Does this value need to change over time, and should the UI update when it changes?**

State is for dynamic data—values that shift in response to user interaction, data fetching, or events. Use state when your component needs to react.

**Example:**

```jsx
const [search, setSearch] = useState('');
const [filter, setFilter] = useState('');
const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);

```

Each variable here changes over time, and each change drives a visible update:

*   The `search` value updates when the user types.
*   The `filter` selects what items to show.
*   The `page` state controls which results are displayed.
*   The `isLoading` state shows a spinner or a loading skeleton.

**Ask yourself:**

*   Is there a trigger that changes this value?
*   Does the component (or its children) need to update when this value changes?

If the answer is yes to both, use state.

## **When You Don’t Need State**

Not every value is state.

If a value doesn't affect what the user sees or how the component behaves, avoid `useState`. Instead, use a ref or a plain variable.

**For example:**

Tracking a timeout ID:

```jsx
const timeoutRef = useRef();
timeoutRef.current = setTimeout(...);

```

Temporary calculations:

```jsx
let total = 0;
items.forEach(item => { total += item.value; });

```

A counter for analytics, not for display:

```jsx
let clickCount = 0;

```

### An Example

Picture a “List with Filter and Pagination” page.

You need state for the current search, selected filter, current page, and loading status, because all these change with user action and affect what’s rendered.

Contrast this with tracking a scroll position or a timer. If you aren’t showing these values to the user, you can avoid state altogether.

### Think to Consider

**State is for values that drive your UI or component logic.**

If a value doesn’t affect rendering, don’t make it state.

Each new state variable adds complexity.

Before adding state, pause and ask yourself: _Does my component need to re-render when this value changes?_

If the answer is no, keep your code simple, and your state minimal.

## **When to Combine or Keep State Separate**

Combine state only when the pieces belong together.

If several values change at the same time, or represent a single logical unit(such as fields in a form)it makes sense to manage them together. But in most list or table views, features like search, filter, pagination, and loading each serve a different purpose. They are independent concerns, so they deserve independent state.

**Example:**

```jsx
// Avoid combining unrelated state:
const [state, setState] = useState({
  page: 1,
  isLoading: false,
  selectedFilter: '',
});

```

Updating one property in this object can easily lead to bugs or stale state for the others.

A better approach is to separate them:

```jsx
const [search, setSearch] = useState('');
const [filter, setFilter] = useState('');
const [page, setPage] = useState(1);
const [isLoading, setIsLoading] = useState(false);

```

This makes your state easier to manage and reason about.

**When to Combine?**

Group state only if it changes together and truly forms a single “unit.”

A common example is form data:

```jsx
const [form, setForm] = useState({
  username: '',
  email: '',
  password: '',
});

```

All fields change as part of the same concept. For complex forms, you might even reach for a library like `react-hook-form` for more structure and control.

In practice, I rarely combine unrelated state, even in forms. More often, I use a library to handle complex scenarios, or I combine search-related parameters if they’re tied directly to a single query:

```jsx
const [searchParams, setSearchParams] = useState({
  query: '',
  page: 1,
  pageSize: 20,
});

```

This works well when the state is always updated and consumed together, such as when syncing with query parameters in a URL.

### Example in Practice

Suppose you’re building a user list with a search box, a status filter, and pagination.

**Independent state:**

```jsx
const [search, setSearch] = useState('');
const [status, setStatus] = useState('all');
const [page, setPage] = useState(1);

```

**Combined state (useful if all are changed together):**

```jsx
const [params, setParams] = useState({ search: '', status: 'all', page: 1 });

```

If you always update and consume these values together (for example, when sending an API request), grouping can make sense.

### Think to Consider

**State is easier to manage when it’s organized by purpose.**

Don’t group state just for convenience—do it because the values belong together.

Before combining state, ask: _Do these values always change together?_

If not, keep them separate, and your code will stay easier to read, update, and debug.

## **Splitting State Across Components for Maintainability**

When building reusable UIs, it’s tempting to put every piece of logic and state in the parent, treating children as “dumb” components. Sometimes this is justified—especially if states are tightly related or represent a single business purpose. But more often, centralizing all state in the parent leads to bloated components, excessive re-renders, and tangled logic.

A better approach is to assign each piece of state to the component closest to where it’s used—while only “lifting” state when different components genuinely need to share or coordinate.

### **Example: A Product List with Filter, Search, and Pagination**

Let’s break this UI into logical pieces:

*   **ListFilter:** Manages its own filter state and notifies the parent only when the user applies a filter.
*   **SearchInput:** Holds its own input value and debounces changes before sending to the parent.
*   **Pagination:** Handles current page internally, but allows parent to reset it when needed.
*   **ListView:** Purely presentational, renders items passed in.

Here’s how this might look in actual code:

**BAD: All state in parent (anti-pattern)**

```jsx
import { useState } from "react";

function ListPage() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filtering and searching are done here (parent)
  const filteredItems = ITEMS.filter(
    item => item.name.includes(search) && item.category === filter
  );
  const pagedItems = filteredItems.slice((page - 1) * 10, page * 10);

  return (
    <>
      <ListFilter value={filter} onChange={setFilter} />
      <SearchInput value={search} onChange={setSearch} />
      <Pagination page={page} onChange={setPage} />
      <ListView items={pagedItems} />
    </>
  );
}
```

**BETTER: State split across children**

File: `ListPage.jsx`

```jsx
import { useState } from "react";
import ListFilter from "./ListFilter";
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";
import ListView from "./ListView";

function ListPage({ items }) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Data selection now depends only on meaningful values
  const filteredItems = items.filter(
    item => item.name.includes(search) && (filter === "" || item.category === filter)
  );
  const pagedItems = filteredItems.slice((page - 1) * 10, page * 10);

  return (
    <>
      <ListFilter onApply={setFilter} />
      <SearchInput onDebouncedChange={setSearch} />
      <Pagination value={page} onChange={setPage} max={Math.ceil(filteredItems.length / 10) || 1} />
      <ListView items={pagedItems} />
    </>
  );
}
export default ListPage;
```

File: `ListFilter.jsx`

```jsx
import { useState } from "react";

function ListFilter({ onApply }) {
  const [value, setValue] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onApply(value); }}>
      <select value={value} onChange={e => setValue(e.target.value)}>
        <option value="">All</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
      </select>
      <button type="submit">Apply</button>
    </form>
  );
}
export default ListFilter;
```

File: `SearchInput.jsx`

```jsx
import { useState, useEffect } from "react";

function SearchInput({ onDebouncedChange }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onDebouncedChange(input);
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  return <input value={input} onChange={e => setInput(e.target.value)} placeholder="Search products..." />;
}
export default SearchInput;
```

File: `Pagination.jsx`

```jsx
function Pagination({ value, onChange, max }) {
  return (
    <div>
      <button onClick={() => onChange(Math.max(1, value - 1))} disabled={value === 1}>Prev</button>
      <span>{value} / {max}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value === max}>Next</button>
    </div>
  );
}
export default Pagination;
```

File: `ListView.jsx`

```jsx
function ListView({ items }) {
  return (
    <ul>
      {items.map(item => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
export default ListView;
```

_ListFilter, SearchInput, Pagination all manage their local UI state. Parent only coordinates final value changes._

_ListFilter, SearchInput, Pagination all manage their local UI state. Parent only coordinates final value changes._

The parent only manages the minimal state needed for coordination: search term, filter value, and current page. Each child component manages its own UI state (like text input, filter form values, or local UI effects). The parent “ListPage” is lean, readable, and only re-renders when truly needed.

**Why This Pattern Works**

Less prop drilling: State is close to where it’s used.

Fewer unnecessary re-renders: Only the component whose state changed will update (especially with memoization).

Clear separation of concerns: Each component is easy to reason about and test.

Scalable: As requirements grow, logic for each part can evolve independently.

### Think to Consider

State management is not just about organizing code, but about clarifying ownership and responsibility.

Before putting a new state variable in the parent, ask yourself:

_Does this state need to be shared? Or can it live in the component that uses it?_

Well-designed boundaries make your app easier to scale, test, and maintain.

## **State With Different Purposes: Break Down by Responsibility**

Not all state serves the same purpose.

For cleaner, more maintainable code, organize state based on its specific responsibility:

*   **UI State:** Controls how things look (e.g., “is modal open?”).
*   **Filter/Search State:** Tracks user queries and selections.
*   **Pagination State:** Keeps the current page or items per page.
*   **Loading/Error State:** Reflects async status or errors.

If you put all of these states into one component, they can become entangled. One state change—such as a loading toggle—might accidentally trigger logic or re-renders tied to filters or search. It might seem easier to keep everything in one place at first, but it quickly becomes a headache to maintain, debug, and extend.

Instead, **keep state as close as possible to the component that uses it.**

If a filter is only relevant to the filter UI, keep that state inside the filter component. If a loading spinner is just for a list view, let the list view handle it.

### Example: Before and After — Managing Re-renders

### Bad pattern: All state in the parent

```jsx
function ListPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  console.log('ListPage render');

  return (
    <>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <select value={filter} onChange={e => setFilter(e.target.value)}>{/* ... */}</select>
      {isLoading ? <span>Loading…</span> : <ul>{/* items */}</ul>}
    </>
  );
}

```

_What happens?_

Every time the user types in the search box or changes a filter, the **parent component and all its children re-render**, even if only one value changed.

### Better pattern: Separate by purpose and component

```jsx
// FilterSelect.jsx
function FilterSelect() {
  const [filter, setFilter] = useState('');
  console.log('FilterSelect render');
  return <select value={filter} onChange={e => setFilter(e.target.value)}>{/* ... */}</select>;
}

// ListView.jsx
function ListView({ items }) {
  const [isLoading, setIsLoading] = useState(false);
  console.log('ListView render');
  return isLoading ? <span>Loading…</span> : <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

// ListPage.jsx
function ListPage() {
  const [search, setSearch] = useState('');
  console.log('ListPage render');
  // Assume filter is handled inside FilterSelect
  return (
    <>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      <FilterSelect />
      <ListView items={[]} />
    </>
  );
}

```

_What happens now?_

If you type in the search input, only that input and the parent re-render.

If you change the filter, **only the FilterSelect component re-renders**—not the entire page.

If the loading state changes, only the ListView is affected.

**Why does this matter?**

*   Reduces unnecessary re-renders
*   Makes components more reusable and easier to test
*   Each piece of state lives where it makes the most sense

### Think to Consider

**Organize state by its purpose and by where it’s used.**

This avoids unnecessary side effects and re-renders, making your codebase easier to extend and reason about—especially as your app grows.

## **Smells and Symptoms: How to Spot Too Much State**

How do you know when a component is trying to do too much? Watch for these warning signs:

*   More than five or six `useState` calls in a single file
*   Several `useEffect` hooks that depend on various combinations of state
*   Passing state setters down through multiple component layers
*   Uncertainty or confusion about “who controls this state?”

If you see any of these, it’s a clear sign your component is becoming too complex. This is the moment to pause and consider refactoring.

## **Practical Refactoring Advice**

**How do you start to untangle state? Here are some strategies:**

**Custom Hooks:**

Move repeated state logic or side effects (such as debounced search or pagination) into custom hooks. This keeps your components lean and reusable.

```
const search = useDebouncedValue(rawSearch, 300);

```

**Context:**

Use React context only for state that truly needs to be shared across many components—like app-wide user info or global filters. Don’t reach for context too early.

**Push State Down:**

Let each UI section manage its own local state. This keeps responsibilities clear and makes your UI components easier to reuse.

**Group Only Related State:**

If you have a set of fields that always update together (such as a form), use a single state object or `useReducer`. Avoid bundling unrelated state just for convenience.

### Think to Consider

The more state you add, the harder it becomes to understand, maintain, and test your code.

Whenever your component starts to feel bloated or you lose track of “who owns what,” take it as an opportunity to split up responsibilities. Small, focused components are the building blocks of robust React applications.

# Summary

Managing state well is at the heart of building maintainable React applications. Too much state in a single component leads to unnecessary complexity, confusing ownership, and hard-to-find bugs. By being intentional(keeping state close to where it’s used, grouping only what belongs together, and lifting shared state just enough)you make your code easier to understand, reuse, and evolve.

Remember: Every state variable you add is a commitment. Be clear about its purpose and scope. Don’t be afraid to refactor when your components start feeling heavy or difficult to reason about.

A well-organized state structure won’t just help your team deliver faster,it will also help you scale your codebase with confidence.

Bagikan[](https://twitter.com/share?text=Managing State in React: Why You Should Avoid "Too Much State" in a Single Component&url=http://blog.faldi.xyz/untitled-2/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/untitled-2/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/untitled-2//&title=Managing State in React: Why You Should Avoid "Too Much State" in a Single Component "LinkedIn")[](/cdn-cgi/l/email-protection#cef1bdbbaca4abadbaf383afa0afa9a7a0a9ee9dbaafbaabeea7a0ee9cabafadbaf4ee99a6b7ee97a1bbee9da6a1bba2aaee8fb8a1a7aaeee8bfbba1baf59aa1a1ee83bbada6ee9dbaafbaabe8bfbba1baf5eea7a0eeafee9da7a0a9a2abee8da1a3bea1a0aba0bae8afa3bef5aca1aab7f3a6bababef4e1e1aca2a1a9e0a8afa2aaa7e0b6b7b4e1bba0baa7baa2abaae3fce1 "Email")

Topik [Insight](/tag/insight/) [Programming](/tag/programming/) [ReactJS](/tag/reactjs/) [NextJS](/tag/nextjs/) [Tutorial](/tag/tutorial/)

[

## Coming soon

This is Cerita Faldi, a brand new site by Naufaldi Rafif S…

26 Jun 2025



](/coming-soon/)[

## Building Strong Relationships with Your Engineering Manager (From a Developer’s Perspective)

There’s still too little discussion about how to effectively work with…

13 Jun 2025



](/relationship-with-engineer-manager/)