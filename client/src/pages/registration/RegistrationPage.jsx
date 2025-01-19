import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Link, useNavigate } from "react-router-dom";
import RegistrationForm from "./RegistrationForm";

const RegistrationPage = () => {


  return (
    <div className="flex items-center justify-center md:min-h-[90vh] my-6 px-2">
      <Card className="w-full md:w-1/2 lg:w-1/3 mx-auto p- ">
        <CardHeader>
          <CardTitle className="text-2xl">
            Registration
          </CardTitle>
          <CardDescription>
            Enter proper info below to create an account
          </CardDescription>
        </CardHeader>
      
        

        <RegistrationForm />


        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline font-medium ">
            Login
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default RegistrationPage