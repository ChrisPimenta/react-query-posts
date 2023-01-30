import { useQuery, useMutation } from '@tanstack/react-query';

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]

function App() {

  const postsQuery = useQuery({
    // Unique ID for your query
    queryKey: ['posts'],
    // Function to be performed for these query keys - usually this will be a fetch or axios request
    queryFn: () => wait(1000).then(() => [...POSTS])

    // // Automatic re-tries multiple times. So you will notice that the errors take time to show because it tries a few times.
    // queryFn: () => Promise.reject('Error Message')
  })

  if (postsQuery.isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  if (postsQuery.isError) {
    return (
      <pre>{JSON.stringify(postsQuery.error)}</pre>
    )
  }

  return (
    // Once the data is ready the .data attribute is populated and then the posts will show!
    <h1>{postsQuery.data.map(posts => (
      <div key={posts.id}>{posts.title}</div>
    ))}</h1>
  )
}

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default App
