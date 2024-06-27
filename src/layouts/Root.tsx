
// import Navbar from '../components/Navbar'
import Footer from '../components/Footerr'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className="text-blue-700 flex flex-col justify-center min-h-screen ">
      
        <Header/>
        
        {/* <Navbar/>   */}
        <main className="flex-1 dark:bg-gray-400">
            {            }
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default Root