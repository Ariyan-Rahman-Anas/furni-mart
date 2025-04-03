import { Link } from "react-router-dom"

const Footer = () => {
  const topCategories = [
    "Home Furniture",
    "Office Furniture",
  ]

  const quickLinks = [
    { title: "Home", route: "/" },
    { title: "Login", route: "/login" },
    { title: "Shop Now", route: "/products" },
  ]

  const getInTouch = [
    { title: "Facebook", route: "/" },
    { title: "Youtube", route: "/products" },
    { title: "Whatsapp", route: "/" },
  ]

  const guidances = [
    { title: "Privacy Policy", route: "/privacy-policy" },
    { title: "Terms & Conditions", route: "/terms-conditions" },
    { title: "Refund & Exchange Policy", route: "/refund-exchange" },
  ]

  const today = new Date()
  const fullYear = today.getFullYear()

  return (
    <footer className="bg-slate-900 text-gray-300 text-sm px-3">
      <div className="max-w-[1920px] mx-auto">
        <div className="md:px-8 pt-16 pb-8 flex flex-col lg:flex-row gap-10 ">
          <div id="support" className="space-y-4 w-full lg:w-[40%] " >
            <Link to={"/"} className="poppins-semibold text-[24px] text-white " >
              WellWood
            </Link>

            <div>
              <p className="text-white">Any questions? Feel free to call us:</p>
              <Link to="tel:+8801610195968" className="text-base font-medium hover:text-white duration-300" >+88 01600 112233</Link>
            </div>

            <div className="text-gray-400">
              <p>Khulshi, East Nasirabad,</p>
              <p>Khhulshi 4225, Chattogram, Bangladesh</p>
            </div>

            <div>
              <p className="text-white">Any queries? Feel free to email us:</p>
              <Link to="mailto:dev.m.ar.anas@gmail.com" className="text-base font-medium hover:text-white duration-300 ">wellwood@info.com</Link>
            </div>
          </div>

          <div className="w-full lg:w-[60%] flex items-start justify-between gap-8 ">
            <div id="top-categories" className=" flex-1 ">
              <h1 className="font-semibold text-lg mb-5 text-white">Top Categories</h1>
              <ul className="space-y-3 mb-3">
                {
                  topCategories?.map((category, index) => <li key={index} className="hover:ml-2 hover:font-semibold hover:text-white hover:underline duration-300" > <Link to={"/products"}>{category}</Link> </li>)
                }
              </ul>
              <Link to={"/products"} className="hover:ml-2 font-semibold text-white hover:text-gray-300 duration-300" >All Categories →</Link>
            </div>

            <div id="quick-links" className="flex-1 ">
              <h1 className="font-semibold text-lg mb-5 text-white " >Quick Links</h1>
              <ul className="space-y-3">
                {
                  quickLinks?.map((link, index) => <li key={index} className="hover:ml-2 hover:font-semibold hover:text-white hover:underline duration-300" > <Link to={link.route}>{link.title}</Link> </li>)
                }
              </ul>
            </div>

            <div id="quick-links" className="flex-1 ">
              <h1 className="font-semibold text-lg mb-5  text-white">Get in touch</h1>
              <ul className="space-y-3">
                {
                  getInTouch?.map((link, index) => <li key={index} className="hover:ml-2 hover:font-semibold hover:text-white duration-300" > <Link to={link.route}>{link.title}</Link> </li>)
                }
              </ul>
            </div>
          </div>

        </div>
        <hr className="mb-6 border-gray-500 " />
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pb-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-4">
            <p>© Copyright {fullYear} WellWood </p>
            <p className="hidden md:block">|</p>
            <p>Developed by <Link to={"https://ariyanrahmananas.vercel.app"} target="_blank" className="text-white hover:underline duration-500" >Ariyan Rahman Anas</Link> </p>
          </div>
          <ul className="flex items-center md:flex-row gap-4 text-sm">
            {
              guidances.map(({ title, route }, idx) => <li key={idx} className="hover:text-white hover:underline font-medium tracking-wide duration-500" >
                <Link to={route}>{title}</Link>
              </li>)
            }
          </ul>
        </div>
      </div>
    </footer>
  )
}
export default Footer