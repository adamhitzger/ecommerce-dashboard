import { deleteProduct } from "@/lib/database/actions/productActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
interface Props {
    id: number | undefined;
}

export default function DeleteProductForm({id} : Readonly<Props>) {
    const [isPending, startTransition] = useTransition();
    const handleDeleteProduct = (formData: FormData) => {
        startTransition(async () => {
            await deleteProduct(formData)
        })
    }
    return (
    <form action={handleDeleteProduct}>
        <Input type="hidden" name="id" value={id}/>
        <Button variant="outline" size="sm" disabled={isPending }>{isPending ? "Deleting..." : "Delete"}</Button>
    </form>
  )
}