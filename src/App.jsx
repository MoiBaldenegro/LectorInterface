import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LectorInterface from './lectorInterface/lectorInterface'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Lector interface</h1>
      <LectorInterface/>
    </>
  )
}

export default App
