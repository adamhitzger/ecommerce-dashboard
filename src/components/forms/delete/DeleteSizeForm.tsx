import { deleteSize } from '@/lib/database/actions/sizeActions'
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
interface Props {
    id: number | undefined;
}

export default function DeleteSizeForm({id} : Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
    const handleDeleteSize = (formData: FormData) => {
        startTransition(async () => {
            await deleteSize(formData)
        })
    }
  
  return (
    <form action={handleDeleteSize}>
        <Input type="hidden" name="id" value={id}/>
        <Button size="sm" variant="outline" disabled={isPending }>{isPending ? "Deleting..." : "Delete"}</Button>
    </form>
  )
}