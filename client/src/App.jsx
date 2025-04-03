import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='min-h-screen' >
      <ScrollToTop />
      <Navbar />
      <div className='max-w-[1920px] mx-auto mb-6'>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  )
}
export default App