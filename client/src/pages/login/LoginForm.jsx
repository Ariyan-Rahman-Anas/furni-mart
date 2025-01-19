import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "@/redux/slices/authSlice"
import { toast } from "sonner"
import GoogleAuth from "@/firebase/GoogleAuth"
import { useLoginUserMutation } from "@/redux/apis/authApi"

const LoginForm = () => {


    const navigate = useNavigate()
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
                token: data.token
            }))
            toast.success(data?.message);
            navigate("/");
        }
    }, [data, error, navigate, dispatch, setError]);


    return (
        <div>
            <form
                onSubmit={handleSubmit(handleLogin)}
            >
                <CardContent>
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
                </CardContent>
            </form>

            <div className="border-2 w-fit mx-auto mb-4">
                <GoogleAuth />
            </div>
        </div>

    )
}

export default LoginForm