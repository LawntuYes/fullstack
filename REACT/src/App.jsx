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


  console.log(posts);
  console.log("Render");


  useEffect(() =>  {
    getPosts().then(data => setPosts(data));
  }, []);
  

  return (
    <>
      {!hidden && <h1>Welcome {count}</h1>}

          <button onClick={() => setCount(count + 1)}>Click</button>

      <button onClick={() => setHidden(h => !h)}>{hidden ? 'show' : 'hidden'}</button>
      <div style={{ display: "flex" }}>
        {HATS.map((hat) => (
          <Button hat={hat} />
        ))}
      </div>
      <div>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </>
  )
}

export default App
