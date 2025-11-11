---
title: "Using React Hooks for State Management"
slug: "react-hooks-state"
tags: ["react", "hooks", "state-management"]
date: "2024-01-20"
---

# Using React Hooks for State Management

React Hooks like `useState` and `useEffect` manage state and side effects in functional components.

## Basic useState Example

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}
```

## useEffect for Side Effects

```jsx
import { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds} seconds</div>;
}
```

## Custom Hooks

Create reusable state logic:

```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
```

## Key Benefits

- **Simpler code**: No need for class components
- **Reusable logic**: Extract and share stateful logic
- **Better performance**: Optimize with useMemo and useCallback
- **Easier testing**: Test hooks independently

