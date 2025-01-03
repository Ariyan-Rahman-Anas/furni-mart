import ScrollToTop from './components/ScrollToTop'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className='min-h-screen' >
      <ScrollToTop />
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  )
}
export default App