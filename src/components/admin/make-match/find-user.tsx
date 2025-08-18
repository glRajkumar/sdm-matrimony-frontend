"use client"

import { useState } from "react";
import { FormProvider, Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFindUser } from "@/hooks/use-admin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";

type props = {
  selected: string
  setSelected: (user: Partial<userT>) => void
  gender: genderT
}

function FindUser({ gender, selected, setSelected }: props) {
  const schema = z.object({
    _id: z.string().optional(),
    email: z.string().optional(),
    mobile: z.string().optional(),
    gender: z.string().optional(),
    fullName: z.string().optional(),
  })

  type formT = z.infer<typeof schema>
  type filterT = Path<formT>

  const list: { name: filterT, label: string }[] = [
    // {
    //   name: "_id",
    //   label: "ID",
    // },
    {
      name: "fullName",
      label: "Full Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "mobile",
      label: "Mobile Number",
    },
  ]

  const [filters, setFilters] = useState<formT>({})

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      _id: "",
      email: "",
      mobile: "",
      fullName: "",
      gender,
    },
  })

  const { isLoading, data: users } = useFindUser(filters)

  const applyFilters = (data: formT) => {
    const payload: formT = {
      gender: data.gender,
    }

    if (data._id) payload._id = data._id
    if (data.email) payload.email = data.email
    if (data.fullName) payload.fullName = data.fullName
    if (data.mobile) payload.mobile = data.mobile

    setFilters(payload)
  }

  const clearFilters = () => {
    methods.reset()
    setFilters({})
  }

  return (
    <Card className="shadow-md relative">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          Search {gender}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(applyFilters)}>
            {list.map((filter) => (
              <InputWrapper
                control={methods.control}
                key={filter.name}
                name={filter.name}
                label={filter.label}
                className="mb-4 gap-0.5"
              />
            ))}

            <div className="df absolute top-4 right-4">
              <Button
                size="sm"
                type="button"
                variant="outline"
                onClick={clearFilters}
              >
                Clear
              </Button>

              <Button size="sm">
                Search
              </Button>
            </div>
          </form>
        </FormProvider>

        {
          !isLoading && users && users.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Results ({users.length})</h3>

              <div className="space-y-2 max-h-[400px] pr-6 -mr-6 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user?._id}
                    className={`df items-start mb-2 border rounded-md overflow-hidden cursor-pointer ${selected === user?._id ? "border-primary" : ""}`}
                    onClick={() => setSelected(user)}
                  >
                    <img
                      className="w-full sm:w-32 h-32 object-cover"
                      src={user?.profileImg || "/imgs/user.jpg"}
                      alt={user?.fullName || "Profile Image"}
                    />

                    <div className="px-2 py-4">
                      <p className="font-medium">{user?.fullName}</p>
                      <p className="text-muted-foreground">{user?.email}</p>
                      <p className="text-muted-foreground">{user?.contactDetails?.mobile}</p>
                      <p className="text-muted-foreground">{user?.otherDetails?.caste} {user?.otherDetails?.subCaste ? `- ${user?.otherDetails?.subCaste}` : ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  )
}

export default FindUser
