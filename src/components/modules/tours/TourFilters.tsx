import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";
import { useSearchParams } from "react-router";


const TourFilters = () => {
    // const [selectedDivision, setSelectedDivision] = useState<string | undefined>(undefined);
    // const [selectedTourType, setSelectedTourType] = useState<string | undefined>(undefined);

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedDivision = searchParams.get("division") || undefined;
    const selectedTourType = searchParams.get("tourType") || undefined;

    // API Calls
    const { data: divisionData, isLoading: divisionIsLoading } = useGetDivisionsQuery(undefined);
    const { data: tourTypeData, isLoading: tourTypeIsLoading } = useGetTourTypesQuery(undefined);

    const divisionOption = divisionData?.map(
        (item: { _id: string, name: string }) => ({
            label: item.name,
            value: item._id
        })
    )

    const tourTypeOptions = tourTypeData?.data?.map(
        (item: { _id: string, name: string }) => ({
            label: item.name,
            value: item._id
        })
    )

    const handleDivisionChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("division", value);
        setSearchParams(params);
    };

    const handleTourTypeChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("tourType", value);
        setSearchParams(params);
    };

    const handleClearFilter = () => {
        // setSelectedDivision(undefined);
        // setSelectedTourType(undefined)

        const params = new URLSearchParams(searchParams)
        params.delete("division");
        params.delete("tourType");
        setSearchParams(params);
    }
    return (
        <div className="col-span-3 w-full h-[500px] border border-muted rounded-md space-y-4 p-5">
            <div className="flex justify-between items-center">
                <h1>Filters</h1>
                <Button size={"sm"} variant={"outline"} onClick={handleClearFilter}>Clear Filter</Button>
            </div>
            <div>
                <Label className="mb-2">Division to visit</Label>
                <Select
                    // onValueChange={(value) => setSelectedDivision(value)}
                    onValueChange={handleDivisionChange}
                    value={selectedDivision ? selectedDivision : ""}
                    disabled={divisionIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Divisions</SelectLabel>
                            {
                                divisionOption?.map((item: { value: string, label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className="mb-2">Tour Type</Label>
                <Select
                    value={selectedTourType ? selectedTourType : ""}
                    // onValueChange={(value) => setSelectedTourType(value)}
                    // onValueChange={(value) => handleTourTypeChange(value)}
                    onValueChange={handleTourTypeChange}
                    disabled={tourTypeIsLoading}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tour Types</SelectLabel>
                            {
                                tourTypeOptions?.map((item: { value: string, label: string }) => (
                                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                                ))
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TourFilters;