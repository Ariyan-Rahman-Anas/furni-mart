import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import RatingStars from "@/components/RatingStars"
import { Eye } from "lucide-react"
import DateFormatter from "@/components/DateFormatter"

const ReviewInfoModal = ({ reviewData }) => {
    const { product, rating, comment, createdAt } = reviewData || {}
    console.log("data", comment)
    console.log("data", reviewData)
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye size={17}
                    className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[475px] max-h-[70vh] overflow-y-auto ">
                <DialogTitle>{product?.name}</DialogTitle>
                <div className="flex items-center gap-4 text-sm ">
                    <RatingStars rating={rating} />
                    <DateFormatter date={createdAt} />
                </div>
                <p className="text-sm" >{comment}</p>
            </DialogContent>
        </Dialog>
    )
}
export default ReviewInfoModal