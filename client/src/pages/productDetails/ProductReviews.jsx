import { useAProductReviewsQuery } from "@/redux/apis/reviewApi"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { Card, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import DateFormatter from "@/components/DateFormatter"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RatingStars from "@/components/RatingStars"
import { Loader2, ShieldCheck, Trash } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { usePostReviewMutation } from "@/redux/apis/reviewApi"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useAnUserOrdersQuery } from "@/redux/apis/orderApi"
import { useDeleteReviewMutation } from "@/redux/apis/reviewApi"

const ProductReviews = ({ productId }) => {

     const {
            register,
            handleSubmit,
            reset,
    } = useForm();
    const user = useSelector(state => state?.auth?.user)

    const { data: productReviewData, isLoading } = useAProductReviewsQuery(productId)
    const { data: myOrdersData } = useAnUserOrdersQuery(user?.email)
    const productType = myOrdersData?.orders?.map(order => order.paymentInfo?.product_type)

    let orderedItems = []
    if (productType) {
        orderedItems = productType.map(item => {
            try {
                return JSON.parse(item);
            } catch (err) {
                toast.error(err.message || "Failed to parsing JSON")
                return null;
            }
        }).filter(item => item !== null);
    }   


    const [postReview, { data: postReviewData, isSuccess: isPosted, isLoading: isPosting, error: reviewPostingError }] = usePostReviewMutation()


    const onSubmit = async (formData) => {
        try {
            const payload = {
                ...formData,
                product: productId,
                user: user?._id,
            }
            await postReview(payload).unwrap()
        } catch (error) {
            console.log("An error occurred during posting a review: ", error)
            toast.error("Failed to posting a review")
        }
    }
    useEffect(() => {
        if (reviewPostingError) {
            toast.error(reviewPostingError?.data?.message)
        }
        if (isPosted) {
            toast.success(postReviewData?.message)
            reset()
        }
    }, [isPosted, postReviewData?.message, reviewPostingError, reset])


    const isEligibleForPostReview = !!orderedItems?.some(items =>
        items?.some(item => item?.productId === productId)
    );
    const isReviewed = !!productReviewData?.reviews?.find(review => review?.user?._id === user?._id)


    const [deleteReview, { data, isLoading: isDeleting, isSuccess, error: isDeleteError }] = useDeleteReviewMutation()
    
    const onDeleteReview = (id) => {
        deleteReview(id)
    }

    useEffect(() => {
        if (isDeleteError) {
            toast.error(isDeleteError?.data?.message)
        }
        if (isSuccess) {
            toast.success(data?.message)
        }
    },[isDeleteError, isSuccess, data?.message])
    

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

  return (
      <section className="flex flex-col md:flex-row items-start justify-between gap-6" >
          <Card className="w-full p-4 " >
              <CardTitle>Leave a feedback</CardTitle>
              <form action="" onSubmit={handleSubmit(onSubmit)} className="space-y-1 my-4 " >
                  <div>
                      <Label>Comment
                          <span className="text-myRed text-lg ">*</span>
                      </Label>
                      <Textarea placeholder="Write your comment.." {...register("comment", { required: true })} ></Textarea>
                  </div>
                  <div className="flex items-end gap-4" >
                      <div>
                          <Label>Rating
                              <span className="text-myRed text-lg ">*</span>
                          </Label>
                          <Input
                              type="number"
                              id="rating"
                              placeholder="Enter rating (1-5)"
                              {...register("rating", { required: true })}
                          />
                      </div>
                      <Button type="submit" disabled={isPosting || !isEligibleForPostReview || isReviewed} >Submit</Button>
                  </div>
              </form>
              {
                  isEligibleForPostReview !== true
                      ? <p className="text-sm"><span className="font-semibold" >Note: </span> You can only leave a review for a product you have purchased, and each product can only be reviewed once.</p>
                      : isReviewed
                          ? <p className="text-sm" >You have already reviewed this product</p>
                          : <div>
                              <p className="text-sm">Please leave your review here!</p>
                              <p className="text-sm" ><span className="font-semibold" >Note: </span>Each product can only be reviewed once.</p>
                          </div>
              }
          </Card>

          <Card className="w-full p-4">
              {
                  !productReviewData || productReviewData?.reviews?.length < 1
                      ? <div>
                          No feedback yet
                      </div>
                      : productReviewData && productReviewData?.reviews?.length >= 1 && <div className="">
                          <CardTitle className="mb-4">Latest feedbacks</CardTitle>
                          {
                              productReviewData?.reviews?.map(({_id:reviewId, user:reviewer, comment, rating, createdAt }, index) => <div key={index} className="pb-2 border-b relative">
                                  <p className="text-xs absolute top-3 right-3 " ><DateFormatter date={createdAt} /></p>

                                  {
                                      reviewer?._id === user?._id && <div className="w-fit absolute top-7 right-3"> 
                                          {
                                              isDeleting ? (
                                                  <>
                                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                  </>
                                              ) : <Trash size={15} onClick={() => onDeleteReview(reviewId)} className="cursor-pointer hover:text-red-500 duration-500"/>
                                          }   
                                       </div>
                                  }

                                  <div className="pt-4 flex items-center gap-2">
                                      <Avatar>
                                          <AvatarImage src="https://github.com/shadcn.png" alt="user's avatar" />
                                          <AvatarFallback>CN</AvatarFallback>
                                      </Avatar>
                                      <h1 className="text-sm font-semibold" >{reviewer?.name}</h1>
                                  </div>

                                  

                                  <div className="flex justify-end gap-2">
                                      <RatingStars rating={rating} />
                                      <div className="flex items-center gap-0.5 text-sm font-semibold "><ShieldCheck size={15} strokeWidth={2.5} /> <span>Verified Purchase</span></div>
                                  </div>
                                  <p className="text-sm" >{comment} </p>
                              </div>)
                          }
                      </div>
              }
          </Card>
      </section>
  )
}
export default ProductReviews