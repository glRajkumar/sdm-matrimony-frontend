"use client";

import { ColumnSorter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { BsThreeDots } from "react-icons/bs";

export const columns: ColumnDef<pendingUsersListT>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <ColumnSorter column={column} title="Name" />,
    // filterFn: (row, id, value) => {
    //   return value?.includes(row?.getValue(id))
    // },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnSorter column={column} title="Email" />,
    // filterFn: (row, id, value) => {
    //   return value?.includes(row?.getValue(id))
    // },
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <ColumnSorter column={column} title="Gender" />,
    // filterFn: (row, id, value) => {
    //   return value?.includes(row?.getValue(id))
    // },
  },
  {
    accessorKey: "salary",
    header: ({ column }) => <ColumnSorter column={column} title="Salary" />,
    // filterFn: (row, id, value) => {
    //   return value?.includes(row?.getValue(id))
    // },
  },
  {
    id: "action",
    header: "",
    enableSorting: false,
    cell() {
      return (
        <BsThreeDots />
      )
    }
  }
]
