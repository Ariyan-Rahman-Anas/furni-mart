import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "./LoginForm"
import { Link } from "react-router-dom"

const LoginPage = () => {

  return (
    <div className="flex items-center justify-center my-6 px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Login
          </CardTitle>
          <CardDescription>
            Enter your credentials below to login your account
          </CardDescription>
        </CardHeader>
        
        <LoginForm />

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/registration" className="underline font-medium ">
            Registration
          </Link>
        </div>

      </Card>
    </div>
  )
}
export default LoginPage