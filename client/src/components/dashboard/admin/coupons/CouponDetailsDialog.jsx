import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye } from "lucide-react"
import { useGetSingleCouponQuery } from "@/redux/apis/couponApi"

export function CouponDetailsDialog({ couponId }) {

    const { data: couponData } = useGetSingleCouponQuery(couponId)
    const {
        code,
        discountType,
        discountValue,
        minOrderValue,
        expirationDays,
        expirationHours,
        expirationMinutes,
        usageLimit,
        usageCount,
        applicableSubcategories,
        applicableProducts,
        status
    } = couponData?.coupon || {}

    return (
        <Dialog>
            <DialogTrigger asChild>
                    <Eye size={17} className="cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="underline mb-4" >Coupon Details</DialogTitle>
                    <DialogTitle>{code}</DialogTitle>
                    <DialogDescription>
                        <p>Discount Type: {discountType}</p>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                
                <DialogFooter>
                    {/* <Button type="submit">Save changes</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}