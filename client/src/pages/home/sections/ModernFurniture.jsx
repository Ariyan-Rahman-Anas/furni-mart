import { Button } from "@/components/ui/button"
import modernFurniture from "./../../../assets/images/home/modern-furni.jpg"
import { Link } from "react-router-dom"
import { Card } from "@/components/ui/card"


const ModernFurniture = () => {
  return (
    <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 bg-[#f1f5ff] dark:bg-slate-950 rounded-3xl ">
      <div className="w-full h-full order-1 md:order-2 flex-1 border2 rounded-3xl ">
        <img src={modernFurniture} alt="modern furniture" loading="lazy" className="w-full h-full rounded-3xl " />
      </div>
      <div className="order-2 md:order-1 p-4 md:p-8 md:pl-12 h-full flex flex-col items-center justify-center space-y-4">
        <div className="space-y-3 text-lg">
          <h1 className="uppercase heading block ">Modern Furniture</h1>
          <p className="subheading" >Affordable Modern Furniture Ideas for Budget-Friendly Makeovers.</p>
        </div>
        <Link to={"/products"}>
          <Button className="">Purchase now</Button>
        </Link>
      </div>
    </Card>
  )
}

export default ModernFurniture