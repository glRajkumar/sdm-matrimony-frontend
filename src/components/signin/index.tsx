"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LoginUser, setToken } from "@/actions";
import useUserStore from "@/store/user";
import { useToast } from "../ui/use-toast";

type FormFileds = {
  email: string;
  password: string;
}

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFileds>()

  const updateUser = useUserStore((state: any) => state.updateUser)
  const { toast } = useToast()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data: any) => {
      const { token, ...rest } = data
      if (token) {
        setToken(token)
        updateUser(rest)
        toast({
          title: "Login Success",
        })
        router.push('/')
      } else {
        console.error("No token received in login response")
      }
    },
    onError() {
      toast({
        title: "login error",
      })
    }
  })

  const onSubmit: SubmitHandler<FormFileds> = data => mutate(data)

  return (
    <section className="min-h-screen flex items-center justify-center mx-4 md:mx-0">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
        <div className="px-16">
          <h1 className="text-[18px] sm:text-xl text-[#4F6F52] font-bold py-5">
            Login
          </h1>

          <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="p-2 border h-8 border-gray-300 min-w-[200px] mb-4"
                {...register("email", {
                  required: "email is required",
                  validate: (value) => {
                    if (!value.includes("@")) {
                      return "must be include @ charector";
                    }
                    return true;
                  },
                })}
              />

              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}

              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="p-2 border h-8 border-gray-300 min-w-[200px] mb-4"
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "password must be 8 charecters",
                  },
                })}
              />

              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}

              <div className="my-2 flex justify-center items-center">
                <button className="bg-[#4F6F52] text-white py-1 px-4 text-[13px] sm:text-[15px]">
                  {isSubmitting ? "Loading..." : "Login"}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center">or</p>
              <hr className="border-gray-400" />
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[#4F6F52] text-[14px] sm:text-[16px]">
                You dont't have an account ?{" "}
              </p>
              <p className="text-blue-400">
                <Link href={"/signup"}>Signup</Link>
              </p>
            </div>
          </div>
        </div>

        {/* <div className="hidden sm:block w-1/2">
          <img
            className="rounded-2xl h-full"
            src="https://antphotography.in/wp-content/uploads/2023/07/TIL03525-1024x682.jpg"
          />
        </div> */}
      </div>
    </section>
  );
}

export default SignIn;
