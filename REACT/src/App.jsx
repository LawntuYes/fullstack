import { Button } from './Button';
import './App.css'
import { useState, useEffect } from 'react'
import { HATS } from './config';
import { getPosts } from './api';
import { Post } from './Post';

function App() {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  


  useEffect(() =>  {
    setLoading(true);
    getPosts()
      .then(data => setPosts(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <div>Error: Please try again... 🙏🙏🙏🙏🙏</div>;
  }
  

  return (
    <>
      {!hidden && <h1>Welcome {count}</h1>}

          <button onClick={() => setCount(count + 1)}>Click</button>

          <button onClick={() => setHidden(h => !h)}>{hidden ? 'show' : 'hidden'}</button>

          {loading ? (
            <div style={{ marginTop: 12 }}>
              <p>Loading posts…</p>
              <progress />
            </div>
          ) : (
            <div>
              {posts.map((post) => (
                <Post post={post} key={post.id} />
              ))}
            </div>
          )}
    </>
  )
}

export default App
