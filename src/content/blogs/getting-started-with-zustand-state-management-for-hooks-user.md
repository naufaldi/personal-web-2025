---
title: "Getting Started with Zustand, State Management for Hooks User"
slug: getting-started-with-zustand-state-management-for-hooks-user
description: "State management is an essential aspect of modern web development, especially when working with complex user interfaces. Zustand is a lightweight, flexible stat"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2023-07-05
image: "https://images.unsplash.com/photo-1688374705239-c17dd6b68435?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8YWxsfDR8fHx8fHwyfHwxNjg4NTIyNjU2fA&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/getting-started-with-zustand/"
---

## Introduction to Zustand

State management is an essential aspect of modern web development, especially when working with complex user interfaces. Zustand is a lightweight, flexible state management library that provides a simple yet powerful solution for managing state in React applications. It offers a minimal API, inspired by React Hooks, making it an excellent choice for developers familiar with the Hooks paradigm.

Zustand is designed to be easy to use and understand, while still offering advanced features like immutability and memoization. It provides a centralized store for your application's state, allowing you to access and update it from any component without prop drilling.

## Why Zustand

**Ease of use**: Zustand's API is simpler and requires less boilerplate compared to Redux Toolkit. Zustand embraces the Hooks paradigm, allowing you to manage state using familiar hooks like `useStore` and `useSelector`

**Small bundle size**: Zustand is designed to be lightweight, resulting in a smaller bundle size compared to other state management libraries. This can be beneficial, especially for performance-critical applications or limited bandwidth environments.

**Flexibility and extensibility**: Zustand allows you to define your custom hooks and selectors, enabling you to encapsulate complex state logic and easily share it across your application. It doesn't enforce any specific architectural patterns, giving you the freedom to structure your code as you see fit.

**Immutability through immutability**: Zustand leverages the immer library to achieve immutability in a convenient way. When updating state, you can safely modify the state draft provided by Zustand without worrying about accidentally mutating the original state.

## Similiarty with React Hooks

If you are already familiar with React Hooks, you'll find Zustand to be remarkably similar in terms of syntax and usage. Both Zustand and React Hooks follow the philosophy of functional programming, encouraging a declarative and composable approach to state management.

Here are some similarities between Zustand and React Hooks:

1.  **Functional component integration**: Zustand seamlessly integrates with functional components. You can use Zustand hooks directly within your functional components to access and update state.
2.  **Declarative updates**: Zustand promotes declarative updates similar to how `useState` works. You define the shape of your state, and Zustand takes care of the rest, ensuring that your components re-render only when necessary.
3.  **Immutability through immutability**: Zustand leverages the immer library to achieve immutability in a convenient way. When updating state, you can safely modify the state draft provided by Zustand without worrying about accidentally mutating the original state.
4.  **Memoization for optimized renders**: Zustand provides a built-in `useMemo` hook that enables you to memoize derived values based on changes in the state. This helps optimize performance by preventing unnecessary re-computations and re-renders.
5.  **Hooks composition**: Zustand encourages the composition of custom hooks, allowing you to encapsulate reusable state logic. You can create custom hooks that combine multiple Zustand stores or provide specific behaviors tailored to your application's needs.

## How to Install Zustand

To install Zustand and set it up in a Next.js application, follow these steps:

**Step 1: Create a new Next.js project**

If you don't have an existing Next.js project, you can create a new one using Create Next App. Open your terminal and run the following command:

```bash
npx create-next-app my-zustand-app
```

This will create a new directory called `my-zustand-app` with a basic Next.js project structure.

**Step 2: Install Zustand**

Navigate into the project directory by running the following command:

```bash
cd my-zustand-app
```

Next, install Zustand using your preferred package manager. For example, if you're using npm, run the following command:

```bash
npm install zustand
```

If you prefer yarn, you can run:

```bash
yarn add zustand
```

This will install Zustand and its dependencies into your Next.js project.

**Step 3: Set up Zustand in your application**

Now, let's set up Zustand in your Next.js application.

In your project, open the `pages` directory and create a new directory called `store`. Inside the `store` directory, create a file called `index.js`. This file will serve as your Zustand store. Inside `index.js`, define your Zustand store using the `createStore` function from Zustand:

```javascript
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export default useStore;
```

In this example, we create a Zustand store with a `count` state variable and two actions: `increment` and `decrement`. The `set` function allows us to update the state immutably.

**Step 4: Use Zustand in your components**

Now, let's use the Zustand store in a component. Open `pages/index.js` and replace its content with the following code:

```javascript
import React from 'react';
import useStore from '../store';

export default function Home() {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

In this example, we import the `useStore` hook from `../store` and use it to access the `count` state variable and the `increment` and `decrement` actions. The component renders the current count and two buttons to increment and decrement it.

**Step 5: Run the application**

You're all set! Save your changes, and in the terminal, run the following command:

```bash
npm run dev
```

This will start the Next.js development server, and you should see your application running with Zustand state management. You can now interact with the count state using the buttons.

Regarding the folder structure, you can organize your Zustand-related files and folders based on your preferences and project requirements. However, a common approach is to have a dedicated `store` directory to

contain your Zustand store files. You can further modularize your Zustand store by splitting it into multiple files if it becomes complex. For example, you can have separate files for defining different slices of state or actions. Additionally, you can create subdirectories within the `store` directory to group related files.

## Persist Middleware in Zustand

Persist middleware in Zustand is a middleware that provides persistence functionality to your Zustand store. It allows you to automatically persist your state data to a storage mechanism, such as `localStorage` or `sessionStorage`, so that the data can be preserved even when the application is reloaded or closed and reopened.

The primary purpose of using the persist middleware in Zustand is to enable state persistence across sessions. It ensures that the state data remains intact and can be retrieved when the application is restarted. This is especially useful for scenarios where you want to persist user preferences, cached data, or any other relevant application state.

By incorporating the persist middleware, you don't have to worry about manually managing the serialization and deserialization of your state data or writing complex logic to persist and retrieve it. The middleware takes care of these tasks for you, making it convenient to implement persistence in your Zustand-powered application.

Persist middleware in Zustand simplifies the process of persisting and loading state data, providing a seamless experience for users by retaining their data and preferences. It enhances the overall stability and usability of your application by ensuring that important state information is preserved between sessions.

## Study Case for Persist

The `persist` middleware in Zustand is useful in various scenarios where you need to persist state data across page reloads or application restarts. Here are a few examples of when you might consider using the persist middleware in Zustand:

1.  User Preferences: If your application allows users to customize their preferences, such as selecting a theme, preferred language, or default settings, using the persist middleware can ensure that their preferences are preserved even after they close and reopen the application.
2.  Authentication State: When implementing user authentication in your application, you can leverage the persist middleware to store the authentication state. This allows users to remain logged in, even if they refresh the page or reopen the application.
3.  Shopping Cart: In an e-commerce application, persisting the shopping cart state using the persist middleware ensures that users can resume their shopping session and view the items in their cart, even if they navigate away from the site or close and reopen the browser.
4.  Form Data: If your application involves lengthy forms or multi-step processes, persisting form data using the persist middleware can be valuable. Users can continue filling out the form from where they left off, even if they accidentally close the browser or experience a network interruption.
5.  Caching API Responses: In scenarios where your application relies on frequently accessed API data, using the persist middleware allows you to cache the API responses locally. This way, if the user revisits the same page or reloads the application, the previously fetched data can be quickly retrieved, reducing the need for redundant network requests.

By incorporating the persist middleware in Zustand, you can provide a smoother user experience by preserving critical application state across page reloads, browser closures, or application restarts.

## Example

First, create the `toDoStore.js` file:

```javascript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useToDoStore = create(
  persist(
    (set) => ({
      todos: [],
      setTodos: (todos) => set({ todos }),
    }),
    {
      name: 'todos-storage',
    }
  )
);

export default useToDoStore;
```

In this code, we've added the `setTodos` action to the `useToDoStore`. It takes the `todos` parameter and updates the state using the `set` function provided by Zustand.

Next, update the component `index.js`:

```javascript
import React, { useEffect } from 'react';
import useStore, { fetchTodos } from '../store';
import useToDoStore from '../toDoStore';

const YourComponent = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

  const todos = useToDoStore((state) => state.todos);
  const setTodos = useToDoStore((state) => state.setTodos);

  const fetchTodosData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const todos = await response.json();
      setTodos(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodosData();
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <h1>Todos:</h1>
      {todos.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </div>
  );
};

export default YourComponent;
```

In this updated code, we import the `setTodos` action from the `useToDoStore` and use it to update the `todos` state in the `fetchTodosData` function.

* * *

## Live Code Demo

Bagikan[](https://twitter.com/share?text=Getting Started with Zustand, State Management for Hooks User&url=http://blog.faldi.xyz/getting-started-with-zustand/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/getting-started-with-zustand/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/getting-started-with-zustand//&title=Getting Started with Zustand, State Management for Hooks User "LinkedIn")[](/cdn-cgi/l/email-protection#6e511d1b0c040b0d1a53290b1a1a0700094e3d1a0f1c1a0b0a4e19071a064e341b1d1a0f000a424e3d1a0f1a0b4e230f000f090b030b001a4e08011c4e260101051d4e3b1d0b1c480f031e550c010a1753061a1a1e5441410c02010940080f020a074016171441090b1a1a070009431d1a0f1c1a0b0a4319071a0643141b1d1a0f000a41 "Email")

Topik [Getting Started](/tag/getting-started/) [Insight](/tag/insight/) [ReactJS](/tag/reactjs/) [NextJS](/tag/nextjs/)

[

## Cara Menghitung Nilai Project Freelance untuk Pemula

Kemarin sudah ada rencana untuk share gimana cara menentukan harga Freelance untuk…

16 Agt 2023



](/cara-menghitung-nilai-project-freelance-untuk-pemula/)[

## How to add Open Graph to NextJS

Open Graph Protocol The Open Graph Protocol is a technology created by…

26 Jun 2023



](/menambahkan-open-graph-pada-web-app-nextjs/)