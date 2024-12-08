import { Card, CardTitle } from "@/components/ui/card"
import DateFormatter from "@/components/DateFormatter"
import { useSelector } from "react-redux"

const UserProfileOverviewPage = () => {

  const {name, email, createdAt} = useSelector(state => state?.auth?.user)
  console.log("user", name, email)

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 relative">
      <CardTitle className="underline mb-4">My Profile</CardTitle>
      <h1>{name}</h1>
      <h3>{email}</h3>
      <p className="absolute top-4 right-4" >Joined 
        <DateFormatter date={createdAt} />
      </p>

    </Card>
  )
}
export default UserProfileOverviewPage