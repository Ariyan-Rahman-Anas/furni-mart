import { Card, CardDescription, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import LoginForm from "./LoginForm"
import { Link } from "react-router-dom"
import usePageTitle from "@/hooks/usePageTitle"

const LoginPage = () => {
  usePageTitle("Login")

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

        <CardContent className="space-y-4" >
          <LoginForm />
          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/registration" className="underline font-medium ">
              Registration
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default LoginPage