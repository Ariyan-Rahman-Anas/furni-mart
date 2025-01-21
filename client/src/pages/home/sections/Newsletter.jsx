import { useForm } from "react-hook-form"
import newsLetterImg from "./../../../assets/images/home/newsLetter.webp"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Send } from "lucide-react"
import { Card } from "@/components/ui/card"

const Newsletter = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const user = useSelector(state => state?.auth?.user)

  const handleSubscribe = (formData) => {
    console.log({ formData })
  }


  const newsLetterFacilities = [
    { id: 1, title: "Early access to sales." },
    { id: 2, title: "Exclusive discounts." },
    { id: 3, title: "Tips to style your home like a pro." },
    { id: 4, title: "WellWood furniture news, and" },
    { id: 5, title: "WellWood furniture events." },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="heading">Stay Connected with</h1>
        <p className="subheading" >Get exclusive offers, New arrivals, and style tips delivered to your inbox!</p>
      </div>

      <div className="w-full h-full">
        <img src={newsLetterImg} alt="WellWood furniture" loading="lazy" className="rounded-3xl w-full h-full" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">

        <Card className="p-4">
          <h1 className="poppins-bold text-2xl">Be Inspired Every Month!</h1>
          <p className="mt-4 mb-2 text-lg text-gray-500">Sign up for our newsletter and enjoy:</p>
          <ul className="list-disc ">
            {newsLetterFacilities.map(({ id, title }) => (
              <li key={id} className="list-inside">
                {title}
              </li>
            ))}
          </ul>


        </Card>

        <Card className="p-4">
          <Send size={50} className="w-fit mx-auto animate-bounce " />

          <form
            onSubmit={handleSubmit(handleSubscribe)}
            className="w-full"
          >
            <div className="grid gap-4">

              <div className="grid gap-.5">
                <Label htmlFor="name">Name
                  <span className="text-myRed text-lg">*</span>
                </Label>
                <Input
                  {...register("name", { required: true })}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  defaultValue={user?.name}
                />
              </div>

              <div className="grid gap-0.5">
                <Label htmlFor="email">Email
                  <span className="text-myRed text-lg">*</span>
                </Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  defaultValue={user?.email}
                />
              </div>

              <Button
                // disabled={isLoading}
                className="w-fit mx-auto"
              >
                {/* {
                isLoading ? (
                  <>
                    Please wait
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : "Login"
              } */}
                Subscribe Now
              </Button>
            </div>
          </form>
        </Card>
      </div>

    </div>
  )
}

export default Newsletter