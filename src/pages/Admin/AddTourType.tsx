import { useGetTourTypesQuery } from "@/redux/features/Tour/tour.api";

const AddTourType = () => {
    const { data } = useGetTourTypesQuery(undefined);
    console.log(data);
    return (
        <div>
            AddTourType
        </div>
    );
};

export default AddTourType;