// import  { useContext } from 'react'
// import { ThemeContext } from '../contexts/ThemeContext'
import './Header.scss'
import Navbar from './Navbar'
// import { useTheme } from '../hooks/useTheme'

const Header = () => {
  // const {theme} = useTheme(); 
  return (
    <header className=" bg-blue-900 text-white flex justify-between p-0 shadow-md w-full dark:bg-gray-900 py-2 md:flex-row md:items-center header ">     
      <div className='md:px-10 py-4 px-7 flex flex-row gap-1   '>
        
        <span className="material-symbols-outlined md:text-6xl text-3xl text-orange-500">
monitoring
</span>
<h1 className=' text-3xl md:text-6xl font-sans font-bold '>BCard</h1>

      </div>      
        
      <Navbar />
     
     

      </header>
  )
}
export default Header
