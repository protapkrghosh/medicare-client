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
import registerImg from "../../../../public/register.jpg";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
   name: z.string().min(1, "This field is required"),
   image: z.string().min(5, "This field is required"),
   email: z.email(),
   password: z.string().min(8, "Minimum length is 8 character"),
   role: z.string().min(1, "This field is required"),
});

export function RegisterForm({
   className,
   ...props
}: React.ComponentProps<"div">) {
   const handleGoogleLogin = async () => {
      const data = await authClient.signIn.social({
         provider: "google",
         callbackURL: `${window.location.origin}`,
      });

      // console.log("Register Data :", data);
   };

   const from = useForm({
      defaultValues: {
         name: "",
         image: "",
         email: "",
         password: "",
         role: "",
      },
      validators: {
         onSubmit: formSchema,
      },
      onSubmit: async ({ value }) => {
         const toastId = toast.loading("Creating user");

         try {
            const { data, error } = await authClient.signUp.email(value);

            if (error) {
               toast.error(error.message, {
                  id: toastId,
                  position: "top-right",
               });
               return;
            }

            toast.success("User Created Successfully", {
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
                     <h1 className="text-2xl font-bold">Create your account</h1>
                     <p className="text-muted-foreground text-sm text-balance">
                        Enter your email below to create your account
                     </p>
                  </div>

                  <FieldGroup>
                     <from.Field
                        name="name"
                        children={(field) => {
                           const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;

                           return (
                              <Field data-invalid={isInvalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Full Name
                                 </FieldLabel>
                                 <Input
                                    type="text"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) =>
                                       field.handleChange(e.target.value)
                                    }
                                    placeholder="Ava Thompson"
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
                        name="image"
                        children={(field) => {
                           const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;

                           return (
                              <Field data-invalid={isInvalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Image URL
                                 </FieldLabel>
                                 <Input
                                    type="url"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) =>
                                       field.handleChange(e.target.value)
                                    }
                                    placeholder="https://image.com/sunset.jpg"
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
                        name="role"
                        children={(field) => {
                           const isInvalid =
                              field.state.meta.isTouched &&
                              !field.state.meta.isValid;

                           return (
                              <Field data-invalid={isInvalid}>
                                 <FieldLabel htmlFor={field.name}>
                                    Who are you?
                                 </FieldLabel>

                                 <Select
                                    value={field.state.value}
                                    onValueChange={(value) =>
                                       field.handleChange(value)
                                    }
                                 >
                                    <SelectTrigger
                                       className="w-full"
                                       id={field.name}
                                    >
                                       <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>

                                    <SelectContent>
                                       <SelectGroup>
                                          <SelectLabel>Roles</SelectLabel>
                                          <SelectItem value="customer">
                                             Customer
                                          </SelectItem>
                                          <SelectItem value="seller">
                                             Seller
                                          </SelectItem>
                                       </SelectGroup>
                                    </SelectContent>
                                 </Select>

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
                                 <FieldLabel htmlFor={field.name}>
                                    Password
                                 </FieldLabel>
                                 <Input
                                    type="password"
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onChange={(e) =>
                                       field.handleChange(e.target.value)
                                    }
                                    placeholder="*********"
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

                     <Button className="w-full cursor-pointer">Register</Button>

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
                        Already have an account?{" "}
                        <Link href="/login">Sign in</Link>
                     </FieldDescription>
                  </FieldGroup>
               </form>

               <div className="bg-muted relative hidden md:block">
                  <Image
                     src={registerImg}
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
