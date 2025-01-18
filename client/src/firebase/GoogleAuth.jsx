import { Button } from "@/components/ui/button"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "./firebase.config";

const GoogleAuth = () => {
    
    const googleAuthHandler = async() => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider)
        } catch (error) {
            console.log("ok", error.message)
        }
    }

    return (
        <Button onClick={googleAuthHandler}>Continue with Google</Button>
    )
}
export default GoogleAuth