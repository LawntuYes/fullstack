
import './App.css'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [hidden, setHidden] = useState(false)

  return (
    <>
      {!hidden && <h1>Welcome {count}</h1>}

          <button onClick={() => setCount(count + 1)}>Click</button>

      <button onClick={() => setHidden(h => !h)}>{hidden ? 'show' : 'hidden'}</button>
    </>
  )
}

export default App
