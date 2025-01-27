import { Rocket } from "lucide-react"
import { Card, CardTitle } from "./ui/card"

const ComingSoon = () => {
  return (
    <Card className="border-2 border-dashed p-8 w-full md:w-4/5 mx-auto rounded-lg flex flex-col items-center justify-center space-y-6 text-center ">
      <Rocket size={50} className="text-gray-500 animate-bounce " />
      <div className="space-y-2">
        <CardTitle className="text-3xl">Coming Soon</CardTitle>
        <p className="subheading" >{`We're working hard to bring you something amazing. Stay tuned!`} </p>
      </div>
    </Card>
  )
}

export default ComingSoon