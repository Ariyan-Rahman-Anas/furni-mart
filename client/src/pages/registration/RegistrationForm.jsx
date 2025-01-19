import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import GoogleAuth from "@/firebase/GoogleAuth"
import { useRegisterUserMutation } from "@/redux/apis/authApi"

const RegistrationForm = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        setError
    } = useForm()

    const [registerUser, { data, isLoading, error }] = useRegisterUserMutation()

    const handleRegistration = (formData) => {
        registerUser(formData)
    }

    useEffect(() => {
        if (error?.data) {
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
        <div className="space-y-2 flex flex-col items-center">
            <form
                onSubmit={handleSubmit(handleRegistration)}
                className="w-full"
            >
                    <div className="grid gap-2">
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
                            />
                        </div>

                        <div className="grid gap-.5">
                            <div className="flex items-center">
                                <Label htmlFor="email">Email
                                    <span className="text-myRed text-lg">*</span>
                                </Label>
                            </div>
                            <Input
                                {...register("email", { required: true })}
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="grid gap-.5">
                            <div className="flex items-center">
                                <Label htmlFor="phone">Phone
                                    <span className="text-myRed text-lg">*</span>
                                </Label>
                            </div>
                            <Input
                                {...register("phone", { required: true })}
                                id="phone"
                                name="phone"
                                type="number"
                                placeholder="01612345678"
                            />
                        </div>

                        <div className="grid gap-.5">
                            <div className="flex items-center">
                                <Label htmlFor="address">Address
                                    <span className="text-myRed text-lg">*</span>
                                </Label>
                            </div>
                            <Input
                                {...register("address", { required: true })}
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Dhaka, Bangladesh"
                            />
                        </div>

                        <div className="grid gap-.5">
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
                                        Please wait
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </>
                                ) : "Registration"
                            }
                        </Button>
                    </div>
            </form>
            <GoogleAuth />
        </div>
    )
}
export default RegistrationForm