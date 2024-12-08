import { useEffect } from "react";
import { toast } from "sonner";

const useDelete = (deleteMutation) => {
    const [deleteItem, { data, isSuccess, isLoading, error }] = deleteMutation();
    const handleDelete = (id) => {
        deleteItem(id);
    };

    useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Something went wrong");
        }
        if (isSuccess) {
            toast.success(data?.message || "Deleted successfully");
        }
    }, [data?.message, error, isSuccess]);

    return { handleDelete, isLoading, isSuccess };
};
export default useDelete;