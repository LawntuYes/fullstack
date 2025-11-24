import './App.css'
import { useState, useEffect } from 'react'
import { getUsers } from './api';
import { User } from './User.jsx';

function App() {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);




  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
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
          {users.map((user) => (
            <User user={user} key={user._id} />
          ))}
        </div>
      )}
    </>
  )
}

export default App