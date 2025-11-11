"use client";

import { ColumnSorter } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

import InviteAction from "./invite-action";
import NumberCopy from "./number-copy";

export const columns: ColumnDef<Partial<userT>>[] = [
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
    id: "Caste",
    accessorKey: "otherDetails.caste",
    header: ({ column }) => <ColumnSorter column={column} title="Caste" />,
    filterFn: (row, id, value) => value?.includes(row?.getValue(id)),
    cell: ({ row }) => (
      <p>{row?.original?.otherDetails?.caste || "---"}</p>
    ),
  },
  {
    id: "Mobile",
    accessorKey: "contactDetails.mobile",
    enableSorting: false,
    header: "Mobile",
    cell: ({ row }) => <NumberCopy number={row?.original?.contactDetails?.mobile || ""} />,
  },
  {
    id: "actions",
    header: () => <p className="text-right">Actions</p>,
    enableSorting: false,
    cell: ({ row }) => <InviteAction user={row?.original as any} />
  }
]
