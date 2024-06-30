import React, { useEffect } from 'react'
import LayoutContainer from '../components/layout'

interface Props {}

const App: React.FC<Props> = () => {
  useEffect(() => {
    console.log('App component mounted')
  }, [])
  return (
    <LayoutContainer>
      <h1>App Test3</h1>
    </LayoutContainer>
  )
}

export default App
