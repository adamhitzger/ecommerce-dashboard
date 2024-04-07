import { deleteVariant } from "@/lib/database/actions/variantActions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
interface Props {
    id: number | undefined;
}

export default function DeleteVariantForm({id} : Readonly<Props>) {
    const [isPending, startTransition] = useTransition();
    const handleDeleteVariant = (formData: FormData) => {
        startTransition(async () => {
            await deleteVariant(formData)
        })
    }
    return (
    <form action={handleDeleteVariant}>
        <Input type="hidden" name="id" value={id} disabled={isPending }/>
        <Button variant="outline" size="sm" disabled={isPending }>{isPending ? "Deleting..." : "Delete"}</Button>
    </form>
  )
}