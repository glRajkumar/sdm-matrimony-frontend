"use client";

import { useGetNotInvitedUsers } from "@/hooks/use-super-admin";

import { useUserFilters } from "@/hooks/use-user-filters";

import UsersFiltersRow from "@/components/common/users-filters-row";
import { Skeleton } from "@/components/ui/skeleton";
import LoadMore from "@/components/common/load-more";

import InviteAction from "./invite-action";
import NumberCopy from "./number-copy";

function Page() {
  const { final, methods, onReset, onSubmit } = useUserFilters({
    maritalStatus: [],
    fullName: "",
    gender: [],
    caste: [],
  })

  const { isLoading, data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetNotInvitedUsers(final)

  return (
    <div className="relative isolate">
      <UsersFiltersRow
        methods={methods}
        needReset={!!final && Object.keys(final)?.length > 0}
        isLoading={isLoading || isFetching}
        onSubmit={onSubmit}
        onReset={onReset}
        onRefresh={refetch}
        className="py-3 px-8 sticky top-18 bg-background z-1 shadow"
      />

      <div className="px-8">
        <table className="w-full table-fixed overflow-x-auto">
          <thead>
            <tr className="text-left">
              <th className="w-40 px-1 py-2 text-sm font-medium">User</th>
              <th className="w-28 px-1 py-2 text-sm font-medium">Number</th>
              <th className="w-32 px-1 py-2 text-sm font-medium text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {
              isLoading &&
              <tr><td colSpan={3}><Skeleton className="h-96" /></td></tr>
            }

            {
              !isLoading &&
              data?.map(user => (
                <tr key={user?._id} className="mb-2 text-sm odd:bg-muted/60">
                  <td className="px-1 py-2">
                    <div className="df">
                      <img
                        className="size-10 shrink-0 rounded object-cover"
                        src={user?.profileImg || "/imgs/user.jpg"}
                        alt=""
                      />
                      <p>{user?.fullName}</p>
                    </div>
                  </td>

                  <td className="px-1 py-2">
                    <NumberCopy
                      number={user?.contactDetails?.mobile || ""}
                    />
                  </td>

                  <td className="px-1 py-2 text-right">
                    <InviteAction user={user} />
                  </td>
                </tr>
              ))
            }

            {
              !isLoading && data?.length === 0 &&
              <tr>
                <td colSpan={3}>
                  <div className="dc h-60 p-8 text-center text-sm text-gray-500 border rounded-lg">
                    No users found to invite.
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      {
        !isLoading && hasNextPage && !isFetching &&
        <LoadMore fn={fetchNextPage} />
      }
    </div>
  )
}

export default Page
