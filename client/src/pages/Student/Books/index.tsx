import DeleteForm from "@/components/core/DeleteForm";
import MainModal from "@/components/core/MainModal";
import TableSkeleton from "@/components/core/TableSkeleton";
import ViewBookComponent from "@/components/dashboard/crud/ViewBook";

import { DataTable } from "@/components/dashboard/data-table";
import useDelete from "@/hooks/useDelete";
import useGet from "@/hooks/useGet";
import DashboardLayout from "@/layouts/DashboardLayout";
import { IBook } from "@/types/base.type";
import EmptyView from "@/views/NothingFoundView";
import { ActionIcon, Button, Drawer } from "@mantine/core";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineReload } from "react-icons/ai";

const StudentBooksComponent = () => {
    // State and data fetching logic using custom hook
    const {
        data: employees,
        get,
        loading,
        error,
    } = useGet<IBook[]>("/books/all", {
        defaultData: [],
    });

    // State for controlling viewBook modal
    const [viewBook, setViewBook] = useState({
        opened: false,
        data: null as IBook | null
    })

    // Column definitions for DataTable component
    const columns: ColumnDef<IBook>[] = [
        {
            header: "Author",
            accessorKey: "author",
            cell: ({ row }) => <h6 className="">{row.getValue("author")}</h6>,
        },
        {
            header: "Publisher",
            accessorKey: "publisher",
            cell: ({ row }) => <h6 className="">{row.getValue("publisher")}</h6>,
        },
        {
            header: "Publication Year",
            accessorKey: "publicationYear",
            cell: ({ row }) => <h6 className="">{row.getValue("publicationYear")}</h6>,
        },

        {
            header: "Subject",
            accessorKey: "subject",
            cell: ({ row }) => (
                <h6 className="">{row.getValue("subject")}</h6>
            ),
        },
   
        {
            header: "Actions",
            accessorKey: "class",
            cell: (row) => (
                <div className="flex items-center gap-x-3">
                    <ActionIcon
                        variant="transparent"
                        color="black"
                        onClick={() =>
                            setViewBook({
                                opened: true,
                                data: row.row.original,
                            })
                        }
                    >
                        <AiOutlineEye />
                    </ActionIcon>
          
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout

        >
            <div className="flex w-full flex-col p-3">
                {/* Display loading skeleton while data is loading */}
                {loading && <TableSkeleton columns={columns} />}
                {/* Display error message and retry button on error */}
                {error && (
                    <div className="flex flex-col items-center w-full">
                        <span className="flex items-center justify-center text-red-700 text-sm">
                            {error}
                        </span>
                        <Button
                            onClick={get}
                            mt={3}
                            className="flex items-center gap-x-2"
                            px={3}
                        >
                            <AiOutlineReload
                                size={20}
                                className={`mr-2 ${loading ? "animate-spin" : ""}`}
                            />
                            Retry
                        </Button>
                    </div>
                )}
                 {/* Display message when no data is available */}
                {!loading && !error && employees?.length == 0 && (
                    <EmptyView message="No Data To show" />
                )}
                {/* Display DataTable when data is available */}

                {!loading && !error && (
                    <DataTable searchKey="name" columns={columns} data={employees} />
                )}
            </div>

            {/* Drawer component for displaying detailed view of a book */}

            <Drawer
                opened={viewBook.opened}
                onClose={() =>
                    setViewBook({
                        opened: false,
                        data: null,
                    })
                }
                padding="md"
                size="md"
                position="right"
                title={<span className=" font-semibold"> {"Book Details"}</span>}
            >
                <ViewBookComponent book={viewBook.data} />
            </Drawer>

        </DashboardLayout>
    )

}
export default StudentBooksComponent;