import { Button } from "@/components/ui/button"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase.config";
import { useGoogleLoginMutation } from "@/redux/apis/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/redux/slices/authSlice";

const GoogleAuth = () => {

    const dispatch = useDispatch()
    const  navigate = useNavigate()
    const [googleLogin, {data, isSuccess, error}] = useGoogleLoginMutation()

    const googleAuthHandler = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
            console.log({ result })
            
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
            // dispatch(setUser({
            //     user: data?.user,
            //     token: data?.token
            // }))
            dispatch(login({
                user: data.user,
                token: data.token
            }))
            navigate("/");
        }
    }, [data?.message, error, isSuccess, data?.token, data?.user, navigate, dispatch])


    return (
        <Button onClick={googleAuthHandler}>Continue with Google</Button>
    )
}
export default GoogleAuth