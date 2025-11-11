---
title: "Fetching Data with React Query"
slug: "fetching-with-react-query"
tags: ["react", "react-query", "data-fetching"]
date: "2024-01-15"
---

# Fetching Data with React Query

React Query simplifies data fetching in React applications by providing hooks to manage server-state.

## Basic Example

```jsx
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('/api/data');
  return response.data;
};

function DataComponent() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
```

## Key Benefits

- **Automatic caching**: React Query caches your data automatically
- **Background updates**: Keeps your data fresh in the background
- **Error handling**: Built-in error states and retry logic
- **Loading states**: Easy access to loading and error states

Ensure you have React Query installed and configured in your project.

