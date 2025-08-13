import SingleImageUploader from "@/components/SingleImageUploader"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAddDivisionMutation } from "@/redux/features/division/division.api"
import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"

export function AddDivisionModal() {
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [addDivision] = useAddDivisionMutation();

    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const toastId = toast.loading("Division Adding...");
            const formData = new FormData();
            formData.append("data", JSON.stringify(data));
            formData.append("file", image as File);

            // console.log(formData.get('data'));
            // console.log(formData.get('file'));

            const res = await addDivision(formData).unwrap();
            if (res.success) {
                toast.success("Division Added", { id: toastId })
                setOpen(false);
                form.reset();
            }
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;

            console.log('division error==>', err);

            setOpen(false)
            toast.error(err.data.message || "Fail to add Division")
            form.reset();
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >Add Division</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Division</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form className="space-y-5" id="add-division" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Division Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Division Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                    <SingleImageUploader onChange={setImage}></SingleImageUploader>
                </Form>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" form="add-division">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
