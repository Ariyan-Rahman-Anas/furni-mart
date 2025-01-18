import { Button } from "@/components/ui/button"
import modernFurniture from "./../../../assets/images/home/modern-furni.jpg"
import { Link } from "react-router-dom"


const SpecialOffers = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-[#f1f5ff] rounded-3xl ">
      <div className="w-full h-full order-1 md:order-2 flex-1 border2 rounded-3xl ">
        <img src={modernFurniture} alt="modern furniture" loading="lazy" className="w-full h-full rounded-3xl " />        
      </div>
        <div className="order-2 md:order-1 p-4 md:p-8 border2 border-black h-full flex flex-col  justify-around space-y-4">
          <div className="space-y-2 text-lg">
            <h1 className="uppercase text-2xl md:text-5xl font-semibold md:hidden ">Modern Furniture</h1>
            <h1 className="uppercase text-2xl md:text-5xl font-semibold hidden md:block ">Modern <br  /> Furniture</h1>
            <p>Affordable Modern Furniture Ideas for Budget-Friendly Makeovers.</p>
        </div>
        <Link to={"/search"}>
          <Button className="">Purchase now</Button>
        </Link>
      </div>
    </div>
  )
}

export default SpecialOffers