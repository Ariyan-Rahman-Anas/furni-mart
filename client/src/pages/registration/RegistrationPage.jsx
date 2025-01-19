import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";
import usePageTitle from "@/hooks/usePageTitle";

const RegistrationPage = () => {
  usePageTitle("Registration");

  return (
    <div className="flex items-center justify-center md:min-h-[90vh] my-6 px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">
            Registration
          </CardTitle>
          <CardDescription>
            Enter proper info below to create an account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <RegistrationForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium ">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default RegistrationPage