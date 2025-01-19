import { Button } from "@/components/ui/button"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase.config";
import { useGoogleLoginMutation } from "@/redux/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/authSlice";
import { Loader2 } from "lucide-react";

const GoogleAuth = () => {
    const dispatch = useDispatch()
    const  navigate = useNavigate()
    const [googleLogin, {data, isLoading, isSuccess, error}] = useGoogleLoginMutation()

    const googleAuthHandler = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)

            const userData = {
                name: result?.user?.displayName,
                email:result?.user?.email
            }
            await googleLogin(userData).unwrap()
        } catch (error) {
            console.log("ok", error.message)
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message)
        }
        if (isSuccess) {
            toast.success(data?.message)
            dispatch(login({
                user: data.user,
                token: data.token
            }))
            navigate("/");
        }
    }, [data?.message, error, isSuccess, data?.token, data?.user, navigate, dispatch])

    return (
        <Button
            disabled={isLoading}
            onClick={googleAuthHandler}
            >
            {
                isLoading ? (
                    <>
                        Continue with Google
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    </>
                ) : "Continue with Google"
            }
        </Button>
    )
}
export default GoogleAuth