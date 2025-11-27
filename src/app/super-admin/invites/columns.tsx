"use client";

import { ColumnSorter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import InviteAction from "./invite-action";
import NumberCopy from "./number-copy";

export const columns: ColumnDef<Partial<userT>>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <ColumnSorter column={column} title="Name" />,
    cell({ row }) {
      return (
        <Link
          href={`/super-admin/user/${row.original._id}`}
          target="_blank"
          className="df hover:text-pink-500"
        >
          <img
            className="size-16 shrink-0 rounded object-cover"
            src={row.original.profileImg || "/imgs/user.jpg"}
            alt=""
          />
          <p>{row.original.fullName}</p>
        </Link>
      )
    },
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
  },
  {
    id: "Caste",
    accessorKey: "otherDetails.caste",
    header: ({ column }) => <ColumnSorter column={column} title="Caste" />,
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
    cell: ({ row }) => <p>{row?.original?.otherDetails?.caste || "---"}</p>,
  },
  {
    id: "Mobile",
    accessorKey: "contactDetails.mobile",
    enableSorting: false,
    header: "Mobile",
    cell: ({ row }) => <NumberCopy number={row?.original?.contactDetails?.mobile || ""} />,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <p className="normal-case">{row?.original?.email || "---"}</p>,
  },
  {
    id: "actions",
    header: () => <p className="pr-2 text-right">Actions</p>,
    enableSorting: false,
    cell: ({ row }) => <InviteAction user={row?.original as any} />
  }
]
