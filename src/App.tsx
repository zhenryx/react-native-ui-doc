
import './App.css'
import { Header } from './components/Header'
import { Aside } from './components/Aside'
import { MainContent } from './components/MainContent'
import { useEffect, useState } from 'react'

function App() {
  const [hash, setHash] = useState(() => location.hash || '#guild/start')
  
  useEffect(() => {
    const handleHashChange = () => {
      setHash(location.hash)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])
  return (
    <div className='h-screen flex flex-col'>
      <p className='text-[0.8rem] text-center text-(--text-primary)'>If you like my React Native components, give it a star on GitHub! ⭐ </p>
      <Header></Header>
      <div className='flex'>
        <Aside active={hash}></Aside>
        <MainContent active={hash}></MainContent>
      </div>
    </div>
  )
}

export default App
