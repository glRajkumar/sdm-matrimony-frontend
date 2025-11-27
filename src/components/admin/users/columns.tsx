"use client";

import { ColumnSorter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import type { tab } from "./types";

import Actions from "./actions";

export const columns = (currentTab: tab, role: rolesT): ColumnDef<Partial<userT>>[] => [
  {
    accessorKey: "fullName",
    header: ({ column }) => <ColumnSorter column={column} title="Name" />,
    cell({ row }) {
      return (
        <Link
          href={`/${role}/user/${row.original._id}`}
          target="_blank"
          className="df hover:text-pink-500"
        >
          <img
            className="size-16 shrink-0 rounded object-cover"
            src={row.original.profileImg || "/imgs/user.jpg"}
            alt=""
          />
          <span>{row.original.fullName}</span>
        </Link>
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
    id: "Caste",
    accessorKey: "otherDetails.caste",
    header: ({ column }) => <ColumnSorter column={column} title="Caste" />,
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
    cell: ({ row }) => (
      <p>
        {row?.original?.otherDetails?.caste || "---"} {row?.original?.otherDetails?.subCaste ? `- ${row?.original?.otherDetails?.subCaste}` : ""}
      </p>
    ),
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
          dob={row?.original?.dob || ""}
          fullName={row?.original?.fullName || ""}
          currentTab={currentTab}
          role={role}
        />
      )
    }
  }
]
