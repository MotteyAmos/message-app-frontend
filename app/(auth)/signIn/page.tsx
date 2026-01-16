"use client";
import {
  FormField,
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { Input } from "@/components/ui/input";
import signUpImg from "@/public/signUpImg.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "@/lib/apolloClient/clientMutations";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import apolloClient from "@/lib/apolloClient/apolloClient";
import { GET_LOGGED_IN_USER } from "@/lib/apolloClient/clientQuerys";
import { ILoginUser } from "@/lib/types/generalTyps";
import { getErrorMessage } from "@/lib/apolloClient/ApolloErrorMessage";


const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username is required",
    })
    .max(50),
  password: z.string().min(2,{message:"Password is required"}),
});

export default function SignIn() {
  const [login, { data: _, loading }] = useMutation(LOGIN_USER);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data, error } = await login({
        variables: {
          user: {
            ...values,
          },
        },
      });

      const userData = data as ILoginUser;
      localStorage.setItem("loginUserId", userData?.login?._id);
      apolloClient.writeQuery({
        query: GET_LOGGED_IN_USER,
        data: {
          loggedInUser: userData?.login,
        },
      });

      toast.success("Login Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });

      route.push("/messages");
    } catch (error) {
    
      const errorMsg = getErrorMessage(error);



      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
      });
    }
  }

  return (
    <div className=" flex justify-center items-center  h-screen bg-white ">
      <div className="relative h-screen flex-6/12">
        <Image src={signUpImg} fill alt={"side-image"} />
      </div>
      <div className="  flex-6/12 py-10 px-[10%] ">
        <div>
          <p className=" text-center text-xl font-bold text-primary mb-2">
            SignIn to create an ccount
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5  justify-center items-center">
              <FormField
                control={form.control}
                name="username"
                render={() => (
                  <FormItem className="bg-white   flex flex-col   ">
                    <div className="w-150 flex flex-col gap-2">
                      <FormLabel className="text-black ">User Name</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black max-w-150 h-12"
                          {...form.register("username")}
                        />
                      </FormControl>
                    </div>

                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={() => (
                  <FormItem className=" flex flex-col ">
                    <div className="w-150 flex flex-col gap-2">
                      <FormLabel className="text-black ">Password</FormLabel>
                      <FormControl>
                        <Input
                          className="text-black max-w-150 h-12"
                          type="password"
                          {...form.register("password")}
                        />
                      </FormControl>
                    </div>

                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="text-black text-right mt-3 mr-20">
              Don't have an account?{" "}
              <Link href="/signUp" className="text-blue-600 cursor-pointer">
                SignUp
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <Button
                type="submit"
                className=" w-full mt-7 cursor-pointer max-w-150 h-12"
              >
                {loading ? "Submitting...." : "Sign In"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      
    </div>
  );
}
