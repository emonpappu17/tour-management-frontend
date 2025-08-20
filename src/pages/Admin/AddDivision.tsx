// import { DeleteConfirmation } from "@/components/DeleteConfirmation";
// import { AddDivisionModal } from "@/components/modules/admin/Division/AddDivisionModal";
// import { Button } from "@/components/ui/button";
// import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api";
// import { IDivision } from "@/types";
// import { ArrowRightIcon, CircleXIcon, ListFilterIcon, MoreHorizontal, Pencil, SearchIcon, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useId, useState } from "react";
// import { cn } from "@/lib/utils";
// import { usePagination } from "@/hooks/use-pagination";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// const AddDivision = () => {
//     const [searchValue, setSearchValue] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [limit, setLimit] = useState(5);
//     const paginationItemsToDisplay = 4;

//     const id = useId()

//     // API Calls
//     const { data, isLoading, isError } = useGetDivisionsQuery({ searchTerm: searchValue, limit, page: currentPage });
//     const [deleteDivision] = useDeleteDivisionMutation();

//     const totalPages = data?.meta?.totalPage || 1;

//     const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
//         currentPage,
//         totalPages,
//         paginationItemsToDisplay,
//     })



//     console.log('division data==>', data);
//     console.log('searchValue', searchValue);

//     const handleDeleteDivision = async (divisionId: string) => {
//         const toastId = toast.loading("Deleting...");
//         try {
//             const res = await deleteDivision(divisionId).unwrap();
//             if (res.success) {
//                 toast.success("Deleted", { id: toastId })
//             }
//         } catch (error) {
//             console.log(error);
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const err = error as any;
//             toast.error(err.data.message || "Delete Division failed", { id: toastId })
//         }
//     }
//     return (
//         <div className="w-full max-w-7xl mx-auto px-5">

//             <div className="flex flex-wrap justify-between items-center my-6 gap-3 ">

//                 <div className="">
//                     {/* <div className="relative">
//                             <Input
//                                 id={id}
//                                 className="peer ps-9 pe-9 min-w-70 "
//                                 // className={cn("peer min-w-70 ps-9")}

//                                 placeholder="Filter by name or description..."
//                                 type="search"
//                             />
//                             <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50 ">
//                                 <SearchIcon size={16} />
//                             </div>
//                             <button
//                                 className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 "
//                                 aria-label="Submit search"
//                                 type="submit"
//                             >
//                                 <ArrowRightIcon size={16} aria-hidden="true" />
//                             </button>
//                         </div> */}

//                     <div className="relative">
//                         <Input
//                             id={`${id}-input`}
//                             // ref={inputRef}
//                             className={cn("peer min-w-60 ps-9")}
//                             value={searchValue}
//                             onChange={(e) => setSearchValue(e.target.value)}
//                             placeholder="Filter by name or description..."
//                         />
//                         <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
//                             <ListFilterIcon size={16} aria-hidden="true" />
//                         </div>
//                         {searchValue && (
//                             <button
//                                 className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
//                                 aria-label="Clear filter"
//                                 onClick={() => {
//                                     setSearchValue("");
//                                     // inputRef.current?.focus();
//                                 }}
//                             >
//                                 <CircleXIcon size={16} />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <AddDivisionModal></AddDivisionModal>
//             </div>

//             {/* Table */}
//             <div className="border border-muted rounded-md">
//                 <Table>
//                     <TableHeader>
//                         <TableRow>
//                             <TableHead>Thumbnail</TableHead>
//                             <TableHead>Name</TableHead>
//                             <TableHead>Description</TableHead>
//                             <TableHead className="text-right">Actions</TableHead>
//                         </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                         {
//                             data?.data?.map((item) => (
//                                 <TableRow key={item._id}>
//                                     <TableCell>
//                                         <img
//                                             src={item.thumbnail}
//                                             className="h-14 w-14 rounded-xl object-cover border"
//                                             alt={item.name}
//                                         />
//                                     </TableCell>
//                                     <TableCell className="font-medium">{item.name}</TableCell>
//                                     <TableCell className="text-muted-foreground">
//                                         {item.description}
//                                     </TableCell>
//                                     {/* <TableCell className="text-right">
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                                     <span className="sr-only">Open menu</span>
//                                                     <MoreHorizontal className="h-4 w-4" />
//                                                 </Button>
//                                             </DropdownMenuTrigger>
//                                             <DropdownMenuContent align="end">
//                                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                                 <DropdownMenuSeparator />
//                                                 <DropdownMenuItem
//                                                     onClick={() => console.log("Edit", item._id)}
//                                                 >
//                                                     <Pencil className="mr-2 h-4 w-4" />
//                                                     Edit
//                                                 </DropdownMenuItem>
//                                                 <DropdownMenuItem
//                                                     // onClick={() => handleDeleteDivision(item._id)}
//                                                     asChild
//                                                     className="text-red-600 focus:text-red-600"
//                                                 >

//                                                     <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>


//                                                         <div className="flex items-center text-red-600 focus:text-red-600">
//                                                             <Trash2 className="mr-4 h-4 w-4" />
//                                                             Delete
//                                                         </div>
//                                                     </DeleteConfirmation>
//                                                 </DropdownMenuItem>
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </TableCell> */}

//                                     {/* <TableCell className="text-right">
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                                     <span className="sr-only">Open menu</span>
//                                                     <MoreHorizontal className="h-4 w-4" />
//                                                 </Button>
//                                             </DropdownMenuTrigger>
//                                             <DropdownMenuContent align="end">
//                                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                                 <DropdownMenuSeparator />

//                                                 <DropdownMenuItem
//                                                     onClick={() => console.log("Edit", item._id)}
//                                                     className="flex items-center"
//                                                 >
//                                                     <Pencil className="mr-2 h-4 w-4" />
//                                                     Edit
//                                                 </DropdownMenuItem>

//                                                 <DropdownMenuItem asChild>
//                                                     <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
//                                                         <button className="flex w-full items-center text-red-600 focus:text-red-600">
//                                                             <Trash2 className="mr-2 h-4 w-4" />
//                                                             Delete
//                                                         </button>
//                                                     </DeleteConfirmation>
//                                                 </DropdownMenuItem>
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </TableCell> */}

//                                     <TableCell className="text-right">
//                                         <DropdownMenu>
//                                             <DropdownMenuTrigger asChild>
//                                                 <Button variant="ghost" className="h-8 w-8 p-0">
//                                                     <span className="sr-only">Open menu</span>
//                                                     <MoreHorizontal className="h-4 w-4" />
//                                                 </Button>
//                                             </DropdownMenuTrigger>
//                                             <DropdownMenuContent align="end">
//                                                 <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                                                 <DropdownMenuSeparator />

//                                                 {/* Edit */}
//                                                 <DropdownMenuItem
//                                                     onClick={() => console.log("Edit", item._id)}
//                                                     className="flex items-center"
//                                                 >
//                                                     <Pencil className="mr-2 h-4 w-4" />
//                                                     Edit
//                                                 </DropdownMenuItem>

//                                                 {/* Delete */}
//                                                 <DeleteConfirmation onConfirm={() => handleDeleteDivision(item._id)}>
//                                                     <DropdownMenuItem
//                                                         onSelect={(e) => e.preventDefault()} // stops dropdown auto-close
//                                                         className="flex items-center text-red-600 focus:text-red-600 w-full">
//                                                         <Trash2 className="mr-2 h-4 w-4" />
//                                                         Delete
//                                                     </DropdownMenuItem>
//                                                 </DeleteConfirmation>
//                                             </DropdownMenuContent>
//                                         </DropdownMenu>
//                                     </TableCell>


//                                 </TableRow>
//                             ))
//                         }
//                     </TableBody>
//                 </Table>
//             </div>

//             {
//                 <div className=" mt-4 ">
//                     <div className="flex justify-between items-center">
//                         {/* <Pagination>
//                             <PaginationContent>
//                                 <PaginationItem>
//                                     <PaginationPrevious
//                                         onClick={() => setCurrentPage(prev => prev - 1)}
//                                         className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                                     />
//                                 </PaginationItem>
//                                 {
//                                     Array.from({ length: totalPage }, (_, index) => index + 1).map(
//                                         (page) => (
//                                             <PaginationItem
//                                                 key={page}
//                                                 onClick={() => setCurrentPage(page)}
//                                             >
//                                                 <PaginationLink isActive={currentPage === page}>{page}</PaginationLink>

//                                             </PaginationItem>
//                                         )
//                                     )
//                                 }
//                                 <PaginationItem>
//                                     <PaginationEllipsis />
//                                 </PaginationItem>
//                                 <PaginationItem>
//                                     <PaginationNext
//                                         onClick={() => setCurrentPage(prev => prev + 1)}
//                                         className={currentPage === totalPage ? "pointer-events-none opacity-50" : "cursor-pointer"}
//                                     />
//                                 </PaginationItem>
//                             </PaginationContent>
//                         </Pagination> */}

//                         {/* Results per page */}
//                         <div className="flex items-center gap-3 ">
//                             <Select
//                                 defaultValue="5"
//                                 onValueChange={(value) => {
//                                     setLimit(Number(value))
//                                 }}
//                                 aria-label="Results per page"
//                             >
//                                 <SelectTrigger
//                                     id="results-per-page"
//                                     className="w-fit whitespace-nowrap"
//                                 >
//                                     <SelectValue placeholder="Select number of results" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {[5, 10, 15, 20].map((pageSize) => (
//                                         <SelectItem key={pageSize} value={pageSize.toString()}>
//                                             {pageSize} / page
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div>
//                             <Pagination>
//                                 <PaginationContent>
//                                     {/* Previous page button */}
//                                     <PaginationItem>
//                                         <PaginationPrevious
//                                             className="aria-disabled:pointer-events-none cursor-pointer aria-disabled:opacity-50"
//                                             onClick={() => setCurrentPage(prev => prev - 1)}
//                                             aria-disabled={currentPage === 1 ? true : undefined}
//                                             role={currentPage === 1 ? "link" : undefined}
//                                         />
//                                     </PaginationItem>

//                                     {/* Left ellipsis (...) */}
//                                     {showLeftEllipsis && (
//                                         <PaginationItem>
//                                             <PaginationEllipsis />
//                                         </PaginationItem>
//                                     )}

//                                     {/* Page number links */}
//                                     {pages.map((page) => (
//                                         <PaginationItem
//                                             key={page}
//                                             onClick={() => setCurrentPage(page)}
//                                         >
//                                             <PaginationLink
//                                                 isActive={currentPage === page}
//                                             >
//                                                 {page}
//                                             </PaginationLink>
//                                         </PaginationItem>
//                                     ))}


//                                     {/* Right ellipsis (...) */}
//                                     {showRightEllipsis && (
//                                         <PaginationItem>
//                                             <PaginationEllipsis />
//                                         </PaginationItem>
//                                     )}

//                                     {/* Next page button */}
//                                     <PaginationItem>
//                                         <PaginationNext
//                                             className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer "
//                                             onClick={() => setCurrentPage(prev => prev + 1)}
//                                             aria-disabled={currentPage === totalPages ? true : undefined}
//                                             role={currentPage === totalPages ? "link" : undefined}
//                                         />
//                                     </PaginationItem>
//                                 </PaginationContent>
//                             </Pagination>
//                         </div>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// };

// export default AddDivision;



import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteDivisionMutation, useGetDivisionsQuery } from "@/redux/features/division/division.api";
import { IDivision } from "@/types";
import { ArrowRightIcon, CircleXIcon, ListFilterIcon, MoreHorizontal, Pencil, SearchIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { usePagination } from "@/hooks/use-pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Small lightweight skeleton helper using Tailwind (works even if you don't have a dedicated Skeleton component)
const SkeletonRow = ({ cols = 4 }: { cols?: number }) => {
    return (
        <TableRow>
            {Array.from({ length: cols }).map((_, i) => (
                <TableCell key={i}>
                    <div className="h-6 rounded-md bg-muted/40 animate-pulse w-full" />
                </TableCell>
            ))}
        </TableRow>
    );
};

const AddDivision = () => {
    const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const paginationItemsToDisplay = 4;

    const id = useId();

    // API Calls (include refetch so we can retry on error)
    const { data, isLoading, isError, refetch } = useGetDivisionsQuery({ searchTerm: searchValue, limit, page: currentPage });
    const [deleteDivision] = useDeleteDivisionMutation();

    const totalPages = data?.meta?.totalPage || 1;

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    console.log('division data==>', data);
    console.log('searchValue', searchValue);

    const handleDeleteDivision = async (divisionId: string) => {
        const toastId = toast.loading("Deleting...");
        try {
            const res = await deleteDivision(divisionId).unwrap();
            if (res.success) {
                toast.success("Deleted", { id: toastId });
            }
        } catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const err = error as any;
            toast.error(err.data?.message || "Delete Division failed", { id: toastId });
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-5">

            <div className="flex flex-wrap justify-between items-center my-6 gap-3 ">

                <div className="">
                    <div className="relative">
                        <Input
                            id={`${id}-input`}
                            className={cn("peer min-w-60 ps-9")}
                            value={searchValue}
                            onChange={(e) => { setSearchValue(e.target.value); setCurrentPage(1); }}
                            placeholder="Filter by name or description..."
                        />
                        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
                            <ListFilterIcon size={16} aria-hidden="true" />
                        </div>
                        {searchValue && (
                            <button
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center"
                                aria-label="Clear filter"
                                onClick={() => {
                                    setSearchValue("");
                                }}
                            >
                                <CircleXIcon size={16} />
                            </button>
                        )}
                    </div>
                </div>

                <AddDivisionModal />
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

                    {/* Loading state: show skeleton rows */}
                    {isLoading ? (
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, i) => (
                                <SkeletonRow key={i} cols={4} />
                            ))}
                        </TableBody>
                    ) : isError ? (
                        // Error state: show friendly error message with retry
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <div className="py-8 flex flex-col items-center justify-center gap-4">
                                        <p className="text-sm text-red-600">Failed to load divisions.</p>
                                        <div className="flex gap-2">
                                            <Button onClick={() => refetch()}>Retry</Button>
                                        </div>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) : (
                        // Normal state (data loaded)
                        <TableBody>
                            {data?.data?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="py-8 text-center text-muted-foreground">No divisions found.</div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data?.data?.map((item: IDivision) => (
                                    <TableRow key={item._id}>
                                        <TableCell>
                                            <img
                                                src={item.thumbnail}
                                                className="h-14 w-14 rounded-xl object-cover border"
                                                alt={item.name}
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell className="text-muted-foreground">{item.description}</TableCell>
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
                                                            className="flex items-center text-red-600 focus:text-red-600 w-full"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DeleteConfirmation>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    )}
                </Table>
            </div>

            <div className=" mt-4 ">
                <div className="flex justify-between items-center">
                    {/* Results per page */}
                    <div className="flex items-center gap-3 ">
                        <Select
                            defaultValue={String(limit)}
                            onValueChange={(value) => {
                                setLimit(Number(value));
                                setCurrentPage(1); // reset to first page when limit changes
                            }}
                            aria-label="Results per page"
                        >
                            <SelectTrigger
                                id="results-per-page"
                                className="w-fit whitespace-nowrap"
                            >
                                <SelectValue placeholder="Select number of results" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 15, 20].map((pageSize) => (
                                    <SelectItem key={pageSize} value={pageSize.toString()}>
                                        {pageSize} / page
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Pagination>
                            <PaginationContent>
                                {/* Previous page button */}
                                <PaginationItem>
                                    <PaginationPrevious
                                        className="aria-disabled:pointer-events-none cursor-pointer aria-disabled:opacity-50"
                                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                        aria-disabled={currentPage === 1 ? true : undefined}
                                        role={currentPage === 1 ? "link" : undefined}
                                    />
                                </PaginationItem>

                                {/* Left ellipsis (...) */}
                                {showLeftEllipsis && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Page number links */}
                                {pages.map((page) => (
                                    <PaginationItem
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        <PaginationLink
                                            isActive={currentPage === page}
                                        >
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {/* Right ellipsis (...) */}
                                {showRightEllipsis && (
                                    <PaginationItem>
                                        <PaginationEllipsis />
                                    </PaginationItem>
                                )}

                                {/* Next page button */}
                                <PaginationItem>
                                    <PaginationNext
                                        className="aria-disabled:pointer-events-none aria-disabled:opacity-50 cursor-pointer "
                                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                        aria-disabled={currentPage === totalPages ? true : undefined}
                                        role={currentPage === totalPages ? "link" : undefined}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddDivision;
