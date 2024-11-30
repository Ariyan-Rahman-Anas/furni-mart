import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegisterUserMutation } from "@/redux/apis/authApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegistrationPage = () => {

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const [registerUser, {data, isLoading, error}] = useRegisterUserMutation()

  const handleRegistration = (formData) => {
    registerUser(formData)
  } 

  useEffect(() => {
    if (error?.data) {
      console.log("err is", error)
      setError("root.random", {
        type: "random",
        message: error.data?.message,
      });

      toast.error(error.data?.message);
    }

    if (data?.message) {
      toast.success(data?.message);
      navigate("/login");
    }
  }, [data, error, navigate, setError]);

  return (
    <div className="flex items-center justify-center border2 h-[90vh] px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto p- ">
        <CardHeader>
          <CardTitle className="text-2xl">
            Registration
          </CardTitle>
          <CardDescription>
            Enter proper info below to create an account
          </CardDescription>
        </CardHeader>
        <form
        onSubmit={handleSubmit(handleRegistration)}

        >
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="name">Name</Label>
                </div>
                <Input
                  {...register("name", { required: "Name is Required" })}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Furniture Mart"
                />
                {errors.name && <span className="text-red-500 text-sm font-medium">{errors.name.message}</span>}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="email">Email</Label>
                </div>
                <Input
                  {...register("email", { required: "Email is Required" })}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                />
                {errors.email && <span className="text-red-500 text-sm font-medium">{errors.email.message}</span>}
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  {...register("password", {
                    required: "Password is required",
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
                {errors.password && <span className="text-red-500 text-sm font-medium">{errors.password.message}</span>}
              </div>

           

              <Button
              disabled={isLoading}
              >
                {
                isLoading ? (
                <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
                </>
                ) : "Registration"
               }
              </Button>
            </div>


            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline font-medium ">
                Login
              </Link>
            </div>
          </CardContent>

        </form>
      </Card>
    </div>
  )
}

export default RegistrationPage