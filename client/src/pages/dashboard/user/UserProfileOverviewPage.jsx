import { Card, CardTitle } from "@/components/ui/card"
import DateFormatter from "@/components/DateFormatter"
import { useSelector } from "react-redux"

const UserProfileOverviewPage = () => {
  const {name, email, phone, address, createdAt} = useSelector(state => state?.auth?.user)

  return (
    <Card className="w-[98%] mx-auto my-2 md:w-full md:m-4 p-4 relative">
      <CardTitle className="underline mb-4">My Profile</CardTitle>
      <h1 className="text-2xl font-medium " >{name}</h1>
      <h3>{email}</h3>
      <h4>{phone}</h4>
      <h5>{address}</h5>
      <p className="absolute top-4 right-4" >Joined 
        <DateFormatter date={createdAt} />
      </p>
    </Card>
  )
}
export default UserProfileOverviewPage