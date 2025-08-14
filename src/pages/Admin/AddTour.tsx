import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const AddTour = () => {
    const { data: tourTypeData } = useGetTourTypesQuery(undefined);
    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);

    const divisionOptions = divisionData?.map((item: { _id: string, name: string }) => ({
        value: item._id,
        label: item.name
    }))

    console.log(divisionOptions);


    const form = useForm({
        defaultValues: {
            title: "",
            division: "",
            tourType: "",
            description: ""
        }
    })

    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        console.log(data);
    }
    return (
        <div className="w-full max-w-4xl mx-auto px-5 mt-16">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Tour</CardTitle>
                    <CardDescription>Add a new tour to the system</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            id="add-tour-form"
                            className="space-y-5"
                            onSubmit={form.handleSubmit(handleSubmit)}
                        >
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tour Title</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="division"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Division</FormLabel>
                                            <Select
                                                onValueChange={field.onChange} defaultValue={field.value}
                                                disabled={divisionLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Division Name" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        divisionOptions?.map((item: { value: string, label: string }) => (
                                                            <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="tourType"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Tour Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                </SelectContent>
                                            </Select>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button type="submit" form="add-tour-form">
                        Create Tour
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default AddTour;