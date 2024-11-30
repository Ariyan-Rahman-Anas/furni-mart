import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginUserMutation } from "@/redux/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

  const navigate =  useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm()

  const [loginUser, { data, isLoading, error }] = useLoginUserMutation()
  const handleLogin = (formData) => {
    loginUser(formData)
  }

  useEffect(() => {
    if (error?.data) {
      setError("root.random", {
        type: "random",
        message: error.data?.message,
      });

      toast.error(error.data?.message);
    }

    if (data?.user && data?.token) {
      dispatch(login({
        user: data.user,
        token:data.token
      }))
      toast.success(data?.message);
      navigate("/");
    }
  }, [data, error, navigate, dispatch, setError]);

  return (
    <div className="flex items-center justify-center border2 h-[90vh] px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto p- ">
        <CardHeader>
          <CardTitle className="text-2xl">
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials below to login your account
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(handleLogin)}
        >
          <CardContent>
            <div className="grid gap-4">
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
                {errors.email && <span className="text-red-500 text-sm font-medium ">{errors.email.message}</span>}
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
                {errors.password && <span className="text-red-500 text-sm font-medium ">{errors.password.message}</span>}
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
                  ) : "Login"
                }
              </Button>
            </div>


            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/registration" className="underline font-medium ">
                Registration
              </Link>
            </div>
          </CardContent>

        </form>
      </Card>
    </div>
  )
}

export default LoginPage