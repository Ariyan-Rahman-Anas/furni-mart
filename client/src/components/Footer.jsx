import { Link } from "react-router-dom"

const Footer = () => {
  const topCategories = [
    "Home Furniture",
    "Office Furniture",
  ]

  const quickLinks = [
    {title:"Home", route:"/"},
    {title:"Login", route:"/login"},
    {title:"Shop Now", route:"/search"},
  ]

  const getInTouch = [
    {title:"Facebook", route:"/"},
    { title: "Youtube", route:"/search"},
    { title: "Whatsapp", route:"/"},
  ]

  const today = new Date()
  const fullYear = today.getFullYear()

  return (
    <footer className="bg-black text-gray-300 mt-6 " >
      <div className="px-4 md:px-8 pt-16 pb-8 flex flex-col lg:flex-row gap-10 ">
        <div id="support" className="space-y-4 w-full lg:w-[40%] " >
          <Link to={"/"} className="text-3xl " >
            Furniture Mart
          </Link>
          
          <div>
            <p className="text-gray-400">Any questions? Feel free to call us:</p>
            <Link to="tel:+8801610195968" className="text-lg font-medium hover:text-myRed duration-300" >+88 01600 112233</Link>
          </div>

          <div className="text-gray-400">
            <p>Khulshi, East Nasirabad,</p>
            <p>Khhulshi 4225, Chattogram, Bangladesh</p>
          </div>

          <div>
            <p className="text-gray-400">Any queries? Feel free to email us:</p>
            <Link to="mailto:dev.m.ar.anas@gmail.com" className="text-lg font-medium hover:text-myRed duration-300 ">furni.mart@info.com</Link>
          </div>
        </div>

        <div className="w-full lg:w-[60%] flex items-start justify-between gap-8 ">
          <div id="top-categories" className=" flex-1 ">
            <h1 className="font-bold text-xl mb-5 "  >Top Categories</h1>
            <ul className="space-y-3 mb-3">
              {
                topCategories?.map((category, index) => <li key={index} className="hover:ml-4 hover:font-semibold hover:text-myRed hover:underline duration-300" > <Link to={"/products"}>{category}</Link> </li>)
              }
            </ul>
            <Link to={"/products"} className="hover:ml-4 font-semibold text-myRed hover:text-gray-300 duration-300" >All Categories →</Link>
          </div>

          <div id="quick-links" className="flex-1 ">
            <h1 className="font-bold text-xl mb-5 " >Quick Links</h1>
            <ul className="space-y-3">
              {
                quickLinks?.map((link, index) => <li key={index} className="hover:ml-4 hover:font-semibold hover:text-myRed hover:underline duration-300" > <Link to={link.route}>{link.title}</Link> </li>)
              }
            </ul>
          </div>

          <div id="quick-links" className="flex-1 ">
            <h1 className="font-bold text-xl mb-5 " >Get in touch</h1>
            <ul className="space-y-3">
              {
                getInTouch?.map((link, index) => <li key={index} className="hover:ml-4 hover:font-semibold hover:text-myRed duration-300" > <Link to={link.route}>{link.title}</Link> </li>)
              }
            </ul>
          </div>
        </div>

      </div>
      <hr className="mb-6 border-gray-500 " />
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 pb-2 ">
        <p>All rights reserved by FM. ©{fullYear} </p> 
        <p className="hidden md:block">|</p>
        <p>Developed by <Link to={"https://ariyanrahmananas.vercel.app"} target="_blank" className="hover:text-myRed duration-300" >Ariyan Rahman Anas</Link> </p>
      </div>   
    </footer>
  )
}
export default Footer