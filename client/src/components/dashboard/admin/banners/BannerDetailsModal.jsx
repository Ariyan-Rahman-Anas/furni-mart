import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import RatingStars from "@/components/RatingStars"
import { Eye } from "lucide-react"
import DateFormatter from "@/components/DateFormatter"

const BannerDetailsModal = ({ bannerData }) => {
  const { title, description, image, createdAt } = bannerData || {}
  // console.log("data", comment)
  // console.log("data", reviewData)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye size={17}
          className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[475px] max-h-[70vh] overflow-y-auto ">
        {/* <DialogTitle>{product?.name}</DialogTitle> */}
        <DialogTitle>{title}</DialogTitle>
        <p className="text-sm" >{description}</p>
      </DialogContent>
    </Dialog>
  )
}
export default BannerDetailsModal