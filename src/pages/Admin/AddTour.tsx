import MultipleImageUploader from "@/components/MultipleImageUploader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileMetadata } from "@/hooks/use-file-upload";
import { cn } from "@/lib/utils";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useAddTourMutation, useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { format, formatISO } from "date-fns";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form";

const AddTour = () => {
    const [images, setImages] = useState<(File | FileMetadata)[] | []>([]);

    const { data: tourTypeData, isLoading: tourTypeLoading } = useGetTourTypesQuery(undefined);
    const { data: divisionData, isLoading: divisionLoading } = useGetDivisionsQuery(undefined);
    const [addTour] = useAddTourMutation();

    const divisionOptions = divisionData?.map(
        (item: { _id: string, name: string }) => ({
            value: item._id,
            label: item.name
        })
    )

    const tourTypeOptions = tourTypeData?.data?.map(
        (item: { _id: string, name: string }) =>
        ({
            value: item._id,
            label: item.name
        })
    );

    const form = useForm({
        defaultValues: {
            title: "",
            division: "",
            tourType: "",
            description: "",
            location: "",
            costFrom: "",
            startDate: "",
            endDate: "",
            departureLocation: "",
            arrivalLocation: "",
            included: [{ value: "" }],
            excluded: [{ value: "" }],
            amenities: [{ value: "" }],
            tourPlan: [{ value: "" }],
            maxGuest: "",
            minAge: ""
        }
    })

    const {
        fields: includedFields,
        append: appendIncluded,
        remove: removeIncluded
    } = useFieldArray({
        control: form.control,
        name: "included"
    })

    const {
        fields: excludedFields,
        append: appendExcluded,
        remove: removeExcluded
    } = useFieldArray({
        control: form.control,
        name: "excluded"
    })

    const {
        fields: amenitiesFields,
        append: appendAmenities,
        remove: removeAmenities,
    } = useFieldArray({
        control: form.control,
        name: "amenities"
    })

    const {
        fields: tourPlanFields,
        append: appendTourPlan,
        remove: removeTourPlan,
    } = useFieldArray({
        control: form.control,
        name: "tourPlan"
    })


    const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
        const tourData = {
            ...data,
            startDate: formatISO(data.startDate),
            endDate: formatISO(data.endDate),
            included: data.included.map((item: { value: string }) => item.value),
            excluded: data.excluded.map((item: { value: string }) => item.value),
            amenities: data.amenities.map((item: { value: string }) => item.value),
            tourPlan: data.tourPlan.map((item: { value: string }) => item.value),
        }

        const formData = new FormData();

        formData.append("data", JSON.stringify(tourData))
        images.forEach((image) => formData.append("files", image as File));
        console.log('Tour raw data-->', data);
        console.log('tourData ===> ', tourData);

        // try {
        //     const res = await addTour(formData).unwrap()
        // } catch (error) {
        //     console.log(error);
        // }
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
                            {/* Title */}
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

                            {/* Location - Cost */}
                            <div className="md:flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="location"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Location</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="costFrom"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-4 md:mt-0">
                                            <FormLabel>Cost</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Departure - Arrival */}
                            <div className="md:flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="departureLocation"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Departure Location</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="arrivalLocation"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-4 md:mt-0">
                                            <FormLabel>Arrival Location</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Star date - End date */}
                            <div className="md:flex gap-5  ">
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1">
                                            <FormLabel>Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a start date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="endDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col flex-1 mt-4 md:mt-0">
                                            <FormLabel>End Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a end date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={new Date(field.value)}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                                                        }
                                                        captionLayout="dropdown"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Division - Tour Type */}
                            <div className="md:flex gap-5 space-y-5 md:space-y-0">
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
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                disabled={tourTypeLoading}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Tour Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        tourTypeOptions?.map((item: { value: string, label: string }) => (
                                                            <SelectItem
                                                                key={item.value}
                                                                value={item.value}
                                                            >
                                                                {item.label}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Max Guest - Minimum Age */}
                            <div className="md:flex gap-5">
                                <FormField
                                    control={form.control}
                                    name="maxGuest"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Max Guest</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="minAge"
                                    render={({ field }) => (
                                        <FormItem className="flex-1 mt-4 md:mt-0">
                                            <FormLabel>Minimum Age</FormLabel>
                                            <FormControl>
                                                <Input {...field}></Input>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Description - Images */}
                            <div className="md:flex gap-5 items-stretch">
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea {...field} className="h-[205px]"></Textarea>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-1 mt-5">
                                    <MultipleImageUploader onChange={setImages} />
                                </div>
                            </div>

                            <div className="border-t border-muted w-full" />

                            {/* Include */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Included</p>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => appendIncluded({ value: "" })}
                                    >
                                        <Plus></Plus>
                                    </Button>
                                </div>
                                <div className="space-y-4 mt-4 ">
                                    {
                                        includedFields.map((item, index) => (
                                            <div key={item.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`included.${index}.value`}

                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                    className="!bg-red-700"
                                                    onClick={() => removeIncluded(index)}
                                                > <Trash2></Trash2>
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Exclude */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Excluded</p>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => appendExcluded({ value: "" })}
                                    >
                                        <Plus></Plus>
                                    </Button>
                                </div>
                                <div className="space-y-4 mt-4 ">
                                    {
                                        excludedFields.map((item, index) => (
                                            <div key={item.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`excluded.${index}.value`}

                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                    className="!bg-red-700"
                                                    onClick={() => removeExcluded(index)}
                                                > <Trash2></Trash2>
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Amenities</p>
                                    <Button
                                        type="button"
                                        size={"icon"}
                                        variant={"outline"}
                                        onClick={() => appendAmenities({ value: "" })}
                                    ><Plus></Plus>
                                    </Button>
                                </div>
                                <div className="space-y-4 mt-4">
                                    {
                                        amenitiesFields.map((item, index) => (
                                            <div key={item.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`amenities.${index}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                    className="!bg-red-700"
                                                    onClick={() => removeAmenities(index)}
                                                > <Trash2></Trash2>
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                            {/* Tour Plan */}
                            <div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Tour Plan</p>
                                    <Button
                                        type="button"
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() => appendTourPlan({ value: "" })}
                                    >
                                        <Plus></Plus>
                                    </Button>
                                </div>
                                <div className="space-y-4 mt-4">
                                    {
                                        tourPlanFields.map((item, index) => (
                                            <div key={item.id} className="flex gap-2">
                                                <FormField
                                                    control={form.control}
                                                    name={`tourPlan.${index}.value`}
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormControl>
                                                                <Input {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="button"
                                                    variant={"destructive"}
                                                    size={"icon"}
                                                    className="!bg-red-700"
                                                    onClick={() => removeTourPlan(index)}
                                                > <Trash2></Trash2>
                                                </Button>
                                            </div>
                                        ))
                                    }
                                </div>
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