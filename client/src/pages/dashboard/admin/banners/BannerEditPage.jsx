import { Card, CardTitle } from "@/components/ui/card"
import IsLoadingLoaderRTK from "@/components/dashboard/IsLoadingLoaderRTK"
import { useParams } from "react-router-dom"
import { useSingleBannerQuery } from "@/redux/apis/bannerApi"
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const BannerEditPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm();

    const { id } = useParams()
    const { data, isLoading } = useSingleBannerQuery()
    
    const onSubmit = (formData) => {
        
    }

    if (isLoading) {
        return <IsLoadingLoaderRTK h={"90vh"} />
    }

  return (
      <Card className="w-[96%] mx-auto my-2 md:w-full md:m-4 p-4 relative" >
          <CardTitle>Banner Edit</CardTitle>
          <form onSubmit={handleSubmit(onSubmit)} >
              <div>
                  <Label>Title</Label>
                  <Input type="text" {...register("title", { required: false })}/>
              </div>
              <div>
                  <Label>Description</Label>
                  <Textarea placeholder="Description" {...register("description", { required: false })}/>
              </div>

              {/* Submit Button */}
              <Button type="submit"
                //   disabled={isCreating}
                  className="w-full">
                  {/* {isCreating ? "Creating..." : "Create Product"} */}
                  Update
              </Button>
          </form>
      </Card>
  )
}

export default BannerEditPage