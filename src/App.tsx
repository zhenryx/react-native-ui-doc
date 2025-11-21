
import './App.css'
import { Header } from './components/Header'
import { Aside } from './components/Aside'
import { MainContent } from './components/MainContent'
function App() {


  return (
    <div className='h-screen flex flex-col'>
      <p className='text-[0.8rem] text-center'>If you like my React Native components, give it a star on GitHub! ⭐ </p>
      <Header></Header>
      <div className='flex-1 flex'>
        <Aside></Aside>
        <MainContent></MainContent>
      </div>
    </div>
  )
}

export default App
