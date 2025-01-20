import { useAllReviewQuery } from "@/redux/apis/reviewApi"

const CustomerReviews = () => {

    const {data, isLoading, error} = useAllReviewQuery()

  return (
      <div className="space-y-6">
          <div className="space-y-3">
              <h1 className="heading">What Our Customers Are Saying</h1>
              <p className="subheading">Real Stories, Real Homes – Hear from Our Happy Customers!</p>
          </div>
    </div>
  )
}

export default CustomerReviews