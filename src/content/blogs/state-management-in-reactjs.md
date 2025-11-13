---
title: "State Management in ReactJS"
slug: state-management-in-reactjs
description: "> code; buat para react developer nih, kalian lebih sering gunain redux daripada react context kah?"
category: "Technical writer"
author:
  name: "Naufaldi Rafif S"
  avatar: "https://avatars.githubusercontent.com/naufaldi?v=4"
date: 2023-06-21
image: "https://images.unsplash.com/photo-1687186735445-df877226fae9?crop&#x3D;entropy&amp;cs&#x3D;tinysrgb&amp;fit&#x3D;max&amp;fm&#x3D;jpg&amp;ixid&#x3D;M3wxMTc3M3wwfDF8YWxsfDV8fHx8fHwyfHwxNjg3MzIzNjU5fA&amp;ixlib&#x3D;rb-4.0.3&amp;q&#x3D;80&amp;w&#x3D;2000"
canonical: "http://blog.faldi.xyz/memilih-state-management/"
---


> code; buat para react developer nih, kalian lebih sering gunain redux daripada react context kah?
> 
> — CODINGFESS (@codingfess) [August 1, 2022](https://twitter.com/codingfess/status/1553922071314731008?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

As a frontend engineer, you're constantly faced with the challenge of managing application state effectively. The state of your application includes various data elements that are crucial for its proper functioning. In this blog post, we will explore the concept of state, dive into the realm of state management, and provide you with a comprehensive list of recommended state management solutions. Finally, we will discuss essential factors to consider when choosing the right state management approach for your frontend projects.

## State Management

Before we delve into state management, let's start by defining what state means in the context of web development. In simple terms, state represents the current condition or data of your application at a given moment. It includes variables, objects, or any other data structures that hold information necessary for your application's behavior and user interactions.

State management refers to the process of handling and manipulating application state in a consistent and efficient manner. It involves techniques and tools that allow you to control how state is accessed, modified, and shared across various components or modules of your frontend application.

Things like, "Whether modal is open or closed" and "message content in toolbox" are piece of state. In project, mau be you name it `isModal` where the app set to `open` or `close` and `messageToolbox` with string message.

We won't discuss when or why we need to use State Management in this article, as it requires a separate blog post. However, the simple reason for using state management is to avoid props drilling.

## Recommendation for State Management

There are several popular state management solutions available for frontend engineers. Here's a list of some widely used options:

### React Context API:

React Context API is built-in React that provide simple way to manage state. This is alternative to How to cope "prop drilling" in simple way. React Context often to use for anage state for UI. Things like Modal, Sidebar, Tooltips or something like that.  

**Example**

Step 1: Creating and Exporting the Context Create a context for your data. Place this code outside of any components, typically at the top level of a file, and export it for later use.

```javascript
export const MyDataContext = React.createContext();
```

Step 2: Providing Data in the Component In the component where you want to provide the data, import the context and use the `Provider` component to pass the data down to the child components.

```javascript
function TheComponentWithState() {
  const [state, setState] = useState('whatever');
  return (
    <MyDataContext.Provider value={state}>
      {/* Component's content goes here */}
      <ComponentThatNeedsData />
    </MyDataContext.Provider>
  );
}
```

Step 3: Accessing Data in a Subtree Within any component located under the `Provider` in the component tree, you can access the data by using the `useContext` hook.

```jsx
function ComponentThatNeedsData() {
  const data = useContext(MyDataContext);
  // Use the data here
}
```

By utilizing this approach, you can create a context, provide data using the `Provider`, and access that data within any component under the `Provider` using the `useContext` hook.

### Redux

Redux is a powerful and widely adopted state management library for JavaScript applications. It follows a predictable state container pattern, allowing you to centralize and manage complex application states efficiently.

You create global store with immutability that hold all of app state. There will be reducer function that receive action that you dispatch from your components,and respond by returning a new copy of state.

But as one of Redux Maintenancer, we recommendation to use Redux Toolkit for simplify boilerplate code.

> Please note that you are writing a lot of boilerplate here that is not necessary when writing modern Redux. Modern Redux does not have the split between action/reducer etc files, it does not use switch..case reducers, action types are auto-generated, as well as action creators.
> 
> — Lenz Weber-Tronic (@phry) [September 3, 2021](https://twitter.com/phry/status/1433698359215280149?ref_src=twsrc%5Etfw&ref=blog.faldi.xyz)

**Example**

Step 1: Setting Up the Redux Store Create a Redux store using Redux Toolkit. This involves defining a slice with the initial state and a reducer function.

```javascript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const myDataSlice = createSlice({
  name: 'myData',
  initialState: 'whatever',
  reducers: {
    updateData: (state, action) => {
      return action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    myData: myDataSlice.reducer,
  },
});
```

Step 2: Providing Data in the Component In the component where you want to provide the data, import the necessary Redux Toolkit functions. Use the `useDispatch` hook to dispatch actions to update the data.

```javascript
import { useDispatch } from 'react-redux';
import { updateData } from './myDataSlice';

function TheComponentWithState() {
  const dispatch = useDispatch();

  const handleDataUpdate = () => {
    dispatch(updateData('new data'));
  };

  return (
    <>
      {/* Component's content goes here */}
      <button onClick={handleDataUpdate}>Update Data</button>
      <ComponentThatNeedsData />
    </>
  );
}
```

Step 3: Accessing Data in a Subtree Within any component located under the Redux `Provider`, you can use the `useSelector` hook to access the data from the Redux store.

```javascript
import { useSelector } from 'react-redux';

function ComponentThatNeedsData() {
  const data = useSelector((state) => state.myData);

  // Use the data here

  return <div>{data}</div>;
}
```

By utilizing Redux Toolkit, you can create a Redux store, dispatch actions to update the data, and access that data within any component using the `useSelector` hook.

### Zustand

Zustand, a lightweight state management library tailored for React, stands out from React's context API. One advantage is that it eliminates the need for a provider, reducing the chances of encountering errors. Additionally, Zustand minimizes boilerplate code commonly found in other state management systems. It embraces the use of hooks as the primary pattern for interacting with the state, providing a simpler and more intuitive approach.

**Example**

1.  Import the `create` function from Zustand in your component:

```javascript
import create from 'zustand';
```

2\. Use the `create` function to create a store with an initial state and functions to update the state:

```javascript
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));
```

In this example, we create a store with an initial state of `{ count: 0 }` and two functions, `increment` and `decrement`, to update the count.

3.Use the `useStore` hook to access the store in your component:  

```jsx
function Counter() {
  const { count, increment, decrement } = useStore();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}
```

In this example, we use the `useStore` hook to access the store in our `Counter` component. The `count`, `increment`, and `decrement` values returned by the hook can be used to display the current count and update it when the buttons are clicked.

### Recoil

Recoil is a state management library specifically designed for React applications. Recoil lets you create a data-flow graph that flows from _atoms_ (shared state) through _selectors_ (pure functions) and down into your React components. Atoms are units of state that components can subscribe to. Selectors transform this state either synchronously or asynchronously.  

Recoil is similar to Zustand in that it is tailored for React. It is React-centric, with state changes flowing from the roots of the graph (atoms) through pure functions (selectors) and into components.

Example

Open the `index.js` file and create a Recoil store.

```javascript
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById('root')
);
```

Create a new ReactJS component and use Recoil.

```javascript
import React from 'react';
import { useRecoilState } from 'recoil';
import { countState } from './store';

function Counter() {
  const [count, setCount] = useRecoilState(countState);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
    </div>
  );
}

export default Counter;
```

Finally, import the `Counter` component into your main `App` component and render it.

```javascript
import React from 'react';
import Counter from './Counter';

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

export default App;
```

## Choosing State Management

When selecting a state management solution for your frontend project, consider the following factors:

**a. Project Size and Complexity:** Assess the size and complexity of your application. Smaller projects with simple state requirements might benefit from lightweight solutions like React Context API or Zustand, while larger projects may require more robust options like Redux Toolkit

**b. Learning Curve:** Evaluate the learning curve associated with each state management solution. Consider the familiarity of your team with a particular library and its documentation, as it will impact development time and maintenance.

**c. Ecosystem and Community Support:** Take into account the availability of resources, third-party integrations, and community support for the state management library. A vibrant ecosystem ensures easy access to tutorials, libraries, and best practices.

**d. Developer Experience:** Consider how well the state management solution integrates with your existing development tools, IDEs, and debugging utilities. A seamless developer experience can greatly improve productivity and ease of maintenance.

# Reference

[

React State Management Libraries and How to Choose

An overview of the best state management libraries and how to choose the right state management strategy for your app.

![Image](https://daveceddia.com/images/apple-touch-icon-144x144-precomposed.png)Dave CeddiaDave Ceddia

![Image](https://daveceddia.com/images/react-state-management.png)

](https://daveceddia.com/react-state-management/?ref=blog.faldi.xyz)

> [A guide to choosing the right React state management solution](http://blog.logrocket.com/guide-choosing-right-react-state-management-solution/?ref=blog.faldi.xyz)

Bagikan[](https://twitter.com/share?text=State Management in ReactJS&url=http://blog.faldi.xyz/memilih-state-management/ "Twitter")[](https://www.facebook.com/sharer/sharer.php?u=http://blog.faldi.xyz/memilih-state-management/ "Facebook")[](https://www.linkedin.com/shareArticle?mini=true&url=http://blog.faldi.xyz/memilih-state-management//&title=State Management in ReactJS "LinkedIn")[](/cdn-cgi/l/email-protection#c4fbb7b1a6aea1a7b0f997b0a5b0a1e489a5aaa5a3a1a9a1aab0e4adaae496a1a5a7b08e97e2a5a9b4ffa6aba0bdf9acb0b0b4feebeba6a8aba3eaa2a5a8a0adeabcbdbeeba9a1a9ada8adace9b7b0a5b0a1e9a9a5aaa5a3a1a9a1aab0eb "Email")

Topik [Getting Started](/tag/getting-started/) [Insight](/tag/insight/) [ReactJS](/tag/reactjs/)

[

## How to add Open Graph to NextJS

Open Graph Protocol The Open Graph Protocol is a technology created by…

26 Jun 2023



](/menambahkan-open-graph-pada-web-app-nextjs/)[

## Tips Memaksimalkan Magang

#NGL Muncul sebuah pertanyaan sebagai berikut sebagai fe lvl beginner, dapet magang…

21 Apr 2023



](/tips-memaksimalkan-magang/)