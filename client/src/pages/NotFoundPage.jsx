import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import usePageTitle from "@/hooks/usePageTitle";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    usePageTitle('404-Page Not Found');
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-2 text-center">
            <Card className="max-wmd p-4 space-y4">
                <div>
                <p className="text6xl font-bold">Oops..</p>
                <h1 className="text-6xl font-bold">404</h1>
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold">
                        Page not found
                    </h2>
                    <p className=" text-gray-500"> {`The page you're looking for doesn't exist or has been moved.`}</p>
                </div>
                <CardFooter className="flex items-center justify-center gap-8 ">
                    <Button onClick={()=>navigate(-1)} >Go Back</Button>
                    <Link to="/">
                        <Button>Back to Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};

export default NotFoundPage;