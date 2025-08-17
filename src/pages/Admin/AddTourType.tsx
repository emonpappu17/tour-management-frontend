import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddTourTypeModal } from "@/components/modules/admin/TourType/AddTourTypeModal";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetTourTypesQuery, useRemoveTourTypeMutation } from "@/redux/features/Tour/tour.api";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";

const AddTourType = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(2);

    console.log('currentPage=>', currentPage);

    // API Calls
    const { data } = useGetTourTypesQuery({ page: currentPage, limit });
    const [removeTourType] = useRemoveTourTypeMutation();

    const handleRemoveTourType = async (tourId: string) => {
        const toastId = toast.loading("Removing...");
        try {
            const res = await removeTourType(tourId).unwrap();
            if (res.success) {
                toast.success("Removed", { id: toastId })
            }
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            toast.error(err.data.message || "Remove Tour Type failed")
        }
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-5">
            <div className="flex justify-between my-8">
                <h1 className="text-xl font-semibold">Tour Types</h1>
                {/* <Button>Add Tour Type</Button> */}
                <AddTourTypeModal></AddTourTypeModal>
            </div>
            <div className="border border-muted rounded-md">
                <Table >
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((item: { _id: string, name: string }, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium w-full">{item.name}
                                    </TableCell>
                                    <TableCell >
                                        <DeleteConfirmation onConfirm={() => handleRemoveTourType(item._id)}>
                                            <Button
                                                variant={"destructive"}
                                                size={"sm"}
                                                className="!bg-red-700" ><Trash2></Trash2></Button>
                                        </DeleteConfirmation>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-start mt-3">
                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>

    );
};

export default AddTourType;