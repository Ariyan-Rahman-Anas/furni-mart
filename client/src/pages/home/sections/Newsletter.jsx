import { useForm } from "react-hook-form"
import newsLetterImg from "./../../../assets/images/home/newsLetter.webp"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const Newsletter = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()


  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h1 className="heading">Stay Connected with</h1>
        <p className="subheading" >Get exclusive offers, New arrivals, and style tips delivered to your inbox!</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <img src={newsLetterImg} alt="WellWood furniture" loading="lazy" className="rounded-l-3xl" />
        </div>
        <form
          // onSubmit={handleSubmit(handleLogin)}
          className="w-full"
        >
          <div className="grid gap-4">
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
              />
            </div>

            <div className="grid gap-0.5">
              <Label htmlFor="password">Password
                <span className="text-myRed text-lg">*</span>
              </Label>
              <Input
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />
            </div>

            <Button
              // disabled={isLoading}
            >
              {/* {
                isLoading ? (
                  <>
                    Please wait
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : "Login"
              } */}
              Sign Up Now
            </Button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Newsletter