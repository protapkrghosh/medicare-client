"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
   Field,
   FieldDescription,
   FieldError,
   FieldGroup,
   FieldLabel,
   FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import loginImg from "../../../../public/signin.jpg";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const formSchema = z.object({
   email: z.email(),
   password: z.string().min(8, "Minimum length is 8 character"),
});

export function LoginForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const [showPassword, setShowPassword] = useState(false);

   const handleGoogleLogin = async () => {
      const data = await authClient.signIn.social({
         provider: "google",
         callbackURL: `${window.location.origin}`,
      });

      // console.log("Login Data :", data);
   };

   const from = useForm({
      defaultValues: {
         email: "",
         password: "",
      },
      validators: {
         onSubmit: formSchema,
      },
      onSubmit: async ({ value }) => {
         const toastId = toast.loading("Logging In");

         try {
            const { data, error } = await authClient.signIn.email(value);

            if (error) {
               toast.error(error.message, {
                  id: toastId,
                  position: "top-right",
               });
               return;
            }

            toast.success("User Login Successfully", {
               id: toastId,
               position: "top-right",
            });

            from.reset();
         } catch (error) {
            toast.error("Something went wrong, Please try again.", {
               id: toastId,
               position: "top-right",
            });
         }
      },
   });

   const session = authClient.useSession();
   // console.log(session);

   return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
         <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
               <form
                  onSubmit={(e) => {
                     e.preventDefault();
                     from.handleSubmit();
                  }}
                  className="p-6 md:p-8"
               >
                  <div className="flex flex-col items-center gap-2 text-center mb-10">
                     <h1 className="text-2xl font-bold">Welcome back</h1>
                     <p className="text-muted-foreground text-sm text-balance">
                        Login to your Acme Inc account
                     </p>
                  </div>

                  <FieldGroup>
                     <from.Field
                        name="email"
                        children={(field) => {
                           const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;

                           return (
                              <Field data-invalid={isInvalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Email
                                 </FieldLabel>
                                 <Input
                                    type="email"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) =>
                                       field.handleChange(e.target.value)
                                    }
                                    placeholder="avathompson@gmail.com"
                                 />

                                 {isInvalid && (
                                    <FieldError
                                       errors={field.state.meta.errors}
                                    />
                                 )}
                              </Field>
                           );
                        }}
                     />

                     <from.Field
                        name="password"
                        children={(field) => {
                           const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;

                           return (
                              <Field data-invalid={isInvalid}>
                                 <div className="flex items-center">
                                    <FieldLabel htmlFor={field.name}>
                                       Password
                                    </FieldLabel>

                                    <a
                                       href="#"
                                       className="ml-auto text-sm underline-offset-2 hover:underline"
                                    >
                                       Forgot your password?
                                    </a>
                                 </div>

                                 <div className="relative">
                                                                     <Input
                                                                        type={showPassword ? "text" : "password"}
                                                                        id={field.name}
                                                                        name={field.name}
                                                                        value={field.state.value}
                                                                        onChange={(e) =>
                                                                           field.handleChange(e.target.value)
                                                                        }
                                                                        placeholder="*********"
                                                                        className="pr-10"
                                                                     />
                                 
                                                                     <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                           setShowPassword((prev) => !prev)
                                                                        }
                                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
                                                                     >
                                                                        {showPassword ? (
                                                                           <IoMdEyeOff size={18}  className="opacity-60"/>
                                                                        ) : (
                                                                           <IoMdEye size={18} className="opacity-60"/>
                                                                        )}
                                                                     </button>
                                                                  </div>

                                 {isInvalid && (
                                    <FieldError
                                       errors={field.state.meta.errors}
                                    />
                                 )}
                              </Field>
                           );
                        }}
                     />

                     <Button className="w-full cursor-pointer">Login</Button>

                     <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                        Or continue with
                     </FieldSeparator>

                     <Button
                        variant="outline"
                        type="button"
                        className="cursor-pointer"
                        onClick={() => handleGoogleLogin()}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24"
                        >
                           <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                           />
                        </svg>
                        <span>Sign up with Google</span>
                     </Button>

                     <FieldDescription className="text-center">
                        Don't have an account?{" "}
                        <Link href="/register">Sign Up</Link>
                     </FieldDescription>
                  </FieldGroup>
               </form>

               <div className="bg-muted relative hidden md:block">
                  <Image
                     src={loginImg}
                     alt="Image"
                     className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
               </div>
            </CardContent>
         </Card>

         <FieldDescription className="mx-auto pb-7 px-6">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
         </FieldDescription>
      </div>
   );
}
