import React, { useEffect } from 'react'

interface Props {}

const App: React.FC<Props> = () => {
  useEffect(() => {
    console.log('App component mounted')
  }, [])
  return (
    <div>
      <h1>Hello, Youtube</h1>
    </div>
  )
}

export default App
