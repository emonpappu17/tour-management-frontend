import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { IDivision } from "@/types";
import { ArrowRightIcon, MoreHorizontal, Pencil, SearchIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useId } from "react";
import { cn } from "@/lib/utils";

const AddDivision = () => {
    const id = useId()
    // API Calls
    const { data } = useGetDivisionsQuery(undefined);
    const [deleteDivision] = useDeleteDivisionMutation();

    console.log('division data==>', data);

    const handleDeleteDivision = async (divisionId: string) => {
        const toastId = toast.loading("Deleting...");
        try {
            const res = await deleteDivision(divisionId).unwrap();
            if (res.success) {
                toast.success("Deleted", { id: toastId })
            }
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            toast.error(err.data.message || "Delete Division failed", { id: toastId })
        }
    }
    return (
        <div className="w-full max-w-7xl mx-auto px-5">

            <div className="flex flex-wrap justify-between items-center my-8 gap-3">
                <div>
                    <div className="">
                        <div className="relative">
                            <Input
                                id={id}
                                className="peer ps-9 pe-9 min-w-70 "
                                // className={cn("peer min-w-70 ps-9")}

                                placeholder="Filter by name or description..."
                                type="search"
                            />
                            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
                                <SearchIcon size={16} />
                            </div>
                            <button
                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 "
                                aria-label="Submit search"
                                type="submit"
                            >
                                <ArrowRightIcon size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
                <AddDivisionModal></AddDivisionModal>
            </div>

            {/* Table */}
            <div className="border border-muted rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data?.data?.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <img
                                            src={item.thumbnail}
                                            className="h-14 w-14 rounded-xl object-cover border"
                                            alt={item.name}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {item.description}
                                    </TableCell>
                                    {/* <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => console.log("Edit", item._id)}
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    // onClick={() => handleDeleteDivision(item._id)}
                                                    asChild
                                                    className="text-red-600 focus:text-red-600"
                                                >

                                                    <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>


                                                        <div className="flex items-center text-red-600 focus:text-red-600">
                                                            <Trash2 className="mr-4 h-4 w-4" />
                                                            Delete
                                                        </div>
                                                    </DeleteConfirmation>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell> */}

                                    {/* <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem
                                                    onClick={() => console.log("Edit", item._id)}
                                                    className="flex items-center"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild>
                                                    <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
                                                        <button className="flex w-full items-center text-red-600 focus:text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </button>
                                                    </DeleteConfirmation>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell> */}

                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator />

                                                {/* Edit */}
                                                <DropdownMenuItem
                                                    onClick={() => console.log("Edit", item._id)}
                                                    className="flex items-center"
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>

                                                {/* Delete */}
                                                <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
                                                    <DropdownMenuItem
                                                        onSelect={(e) => e.preventDefault()} // stops dropdown auto-close
                                                        className="flex items-center text-red-600 focus:text-red-600 w-full">
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DeleteConfirmation>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>


                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>

            {/* {
                totalPage > 1 && (
                    <div className="flex justify-end mt-4">
                        <div>
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => setCurrentPage(prev => prev - 1)}
                                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                    {
                                        Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                            (page) => (
                                                <PaginationItem
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                >
                                                    <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>

                                                </PaginationItem>
                                            )
                                        )
                                    }
                              
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => setCurrentPage(prev => prev + 1)}
                                            className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                )
            } */}
        </div>
    );
};

export default AddDivision;