"use client";

import { ColumnSorter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

import type { tab } from "./types";

import Actions from "./actions";

export const columns = (currentTab: tab, role: rolesT): ColumnDef<Partial<userT>>[] => [
  {
    accessorKey: "fullName",
    header: ({ column }) => <ColumnSorter column={column} title="Name" />,
    cell({ row }) {
      return (
        <div className="df">
          <img
            className="size-16 shrink-0 rounded object-cover"
            src={row.original.profileImg || "/imgs/user.jpg"}
            alt=""
          />
          <p>{row.original.fullName}</p>
        </div>
      )
    },
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
  },
  {
    accessorKey: "email",
    header: ({ column }) => <ColumnSorter column={column} title="Email" />,
    cell: ({ row }) => <p className="normal-case">{row?.original?.email || "---"}</p>,
  },
  {
    id: "Mobile",
    accessorKey: "contactDetails.mobile",
    header: ({ column }) => <ColumnSorter column={column} title="Mobile" />,
    cell: ({ row }) => <p className="normal-case">{row?.original?.contactDetails?.mobile || "---"}</p>,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => <ColumnSorter column={column} title="Gender" />,
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
  },
  {
    accessorKey: "maritalStatus",
    header: ({ column }) => <ColumnSorter column={column} title="Marital Status" />,
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
  },
  {
    id: "Salary",
    accessorKey: "proffessionalDetails.salary",
    header: ({ column }) => <ColumnSorter column={column} title="Salary" />,
    cell: ({ row }) => <p className="normal-case">{row?.original?.proffessionalDetails?.salary?.toLocaleString() || "---"}</p>,
  },
  {
    id: "action",
    header: "",
    enableSorting: false,
    cell({ row }) {
      return (
        <Actions
          _id={row?.original?._id || ""}
          currentTab={currentTab}
          role={role}
        />
      )
    }
  }
]
