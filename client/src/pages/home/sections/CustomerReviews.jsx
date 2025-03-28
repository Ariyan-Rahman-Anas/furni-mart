import { useAllReviewQuery } from "@/redux/apis/reviewApi"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import RatingStars from "@/components/RatingStars";
import DateFormatter from "@/components/DateFormatter";
import { Quote } from "lucide-react";
import { Link } from "react-router-dom";

const CustomerReviews = () => {
  const { data } = useAllReviewQuery()
  
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="heading">What Our Customers Are Saying</h1>
        <p className="subheading">Real Stories, Real Homes – Hear from Our Happy Customers!</p>
      </div>

      <div>
        <Carousel className="w-full max-w-2xl mx-auto ">
          <CarouselContent>
            {data?.reviews?.map(({ product, user, comment, createdAt, rating }, idx) => (
              <CarouselItem key={idx}>
                <Card className="p-4 group ">
                  <div>
                    <Quote fill="black" size={14} />
                    <p className="text-sm text-gray-600">{comment}</p>
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-4">
                      <h1>{user?.name} </h1>
                      <Link to={`/products/${product?.id}`} className="group-hover:underline" >{product?.name}</Link>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 ">
                    <DateFormatter date={createdAt} />
                  </p>
                  <div className="flex items-center justify-center flex-col mt-4">
                    <span className="text-xs">({rating} out of 5)</span>
                    <RatingStars rating={rating} />
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
export default CustomerReviews