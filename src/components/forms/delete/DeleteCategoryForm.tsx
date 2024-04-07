import { deleteCategory } from "@/lib/database/actions/categoryActions";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
interface Props {
    id: number | undefined;
}

export default function DeleteCategoryForm({id} : Readonly<Props>) {
    const [isPending, startTransition] = useTransition();
    const handleDeleteCategory = (formData: FormData) => {
        startTransition(async () => {
            await deleteCategory(formData)
        })
    }
    return (
    <form action={handleDeleteCategory}>
        <Input type="hidden" name="id" value={id} disabled={isPending}/>
        <Button variant="outline" size="sm" disabled={isPending }>{isPending ? "Deleting..." : "Delete"}</Button>
    </form>
  )
}