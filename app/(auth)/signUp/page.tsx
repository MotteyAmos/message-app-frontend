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
import { toast } from "react-toastify";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import signUpImg from "@/public/signUpImg.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "@/lib/apolloClient/clientMutations";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/apolloClient/ApolloErrorMessage";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username is required",
    })
    .max(50),
  email: z.email({ message: "email is required" }),
  password: z.string().min(6, {
    message: "Password should be atleast 6 characters",
  }),
});

export default function SignUp() {
  const [registerUser, { data, loading, error: errorData }] =
    useMutation(REGISTER_USER);
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = await registerUser({
        variables: {
          user: {
            ...values,
          },
        },
      });

      
      toast.success("Account created successfully! Please login.", {
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


      route.push("/signIn");
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
      <div className="relative  h-screen flex-6/12">
        <Image src={signUpImg} fill alt={"side-image"} />
      </div>
      <div className="   flex-6/12 py-10 px-[10%] ">
        <div>
          <p className=" text-center text-xl font-bold text-primary mb-2">
            SignUp to create an ccount
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={() => (
                <FormItem className="bg-white ">
                  <FormLabel className="text-black">User Name</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      {...form.register("username")}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={() => (
                <FormItem className="bg-white mt-2">
                  <FormLabel className="text-black">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="email"
                      {...form.register("email")}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={() => (
                <FormItem className="bg-white mt-2">
                  <FormLabel className="text-black">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      type="password"
                      {...form.register("password")}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className=" w-full mt-3 cursor-pointer">
              {loading ? "Submitting...." : "Sign Up"}
            </Button>
          </form>
        </Form>
        <div className="text-black text-right mt-3">
          Already have an account?{" "}
          <Link href="/signIn" className="text-blue-600 cursor-pointer">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
