"use client";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
   NavigationMenu,
   NavigationMenuContent,
   NavigationMenuItem,
   NavigationMenuLink,
   NavigationMenuList,
   NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { ModeToggle } from "./ModeToggle";
import { authClient } from "@/lib/auth-client";
import { Input } from "../ui/input";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { IoMdSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MenuItem {
   title: string;
   url: string;
   description?: string;
   icon?: React.ReactNode;
   items?: MenuItem[];
}

interface Navbar1Props {
   className?: string;
   logo?: {
      url: string;
      src: string;
      alt: string;
      title: string;
      className?: string;
   };
   menu?: MenuItem[];
   auth?: {
      login: {
         title: string;
         url: string;
      };
      signup: {
         title: string;
         url: string;
      };
   };
}

const Navbar = ({
   logo = {
      url: "/",
      src: "https://i.ibb.co.com/GQXpc2Qt/medicare.png",
      alt: "logo",
      title: "MediCare",
   },
   menu = [
      {
         title: "Home",
         url: "#",
      },
      {
         title: "Medicine",
         url: "#",
      },
      {
         title: "My Order",
         url: "#",
      },
      {
         title: "Dashboard",
         url: "#",
      },
   ],
   auth = {
      login: { title: "Login", url: "/login" },
      signup: { title: "Sign up", url: "/register" },
   },
   className,
}: Navbar1Props) => {
   const { data } = authClient.useSession();
   const sessionUser = data?.user;

   const handleLogOut = async () => {
      await authClient.signOut();
   };

   const getUserName = (name: string) => {
      return name
         .split(" ")
         .map((word) => word[0])
         .join("")
         .toUpperCase();
   };

   return (
      <section className={cn("", className)}>
         <div className="container">
            {/* Desktop Menu */}
            <nav className="hidden items-center justify-between lg:flex bg-background p-3">
               <div className="flex items-center gap-6">
                  {/* Logo */}
                  <a href={logo.url} className="flex items-center gap-2">
                     <Image
                        src={logo.src}
                        className="dark:invert"
                        alt={logo.alt}
                        width={75}
                        height={100}
                     />

                     <span className="text-primary text-[28px] font-bold tracking-tighter">
                        {logo.title}
                     </span>
                  </a>
               </div>

               <div className="flex items-center">
                  {/* <NavigationMenu>
                     <NavigationMenuList>
                        {menu.map((item) => renderMenuItem(item))}
                     </NavigationMenuList>
                  </NavigationMenu> */}

                  <Field className="w-md">
                     <ButtonGroup className="relative">
                        <IoMdSearch
                           size={20}
                           className="absolute top-3 ml-3 text-ring/70"
                        />

                        <Input
                           id="input-button-group"
                           placeholder="Find your medicine"
                           className="h-10 pl-10"
                        />
                        <Button className="h-10 cursor-pointer">Search</Button>
                     </ButtonGroup>
                  </Field>
               </div>

               <div className="flex items-center gap-6">
                  {/* Shopping Cart */}
                  <Link href={"/"} className="relative">
                     <IoCartOutline size={24} className="text-primary" />

                     <div className="text-[11px] text-primary bg-border border border-primary/40 h-5 w-5 flex items-center justify-center rounded-full absolute -top-2.5 -right-2">
                        5
                     </div>
                  </Link>

                  {/* Login and user profile */}
                  {sessionUser ? (
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild className="cursor-pointer">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-full"
                           >
                              <Avatar className="w-10 h-10">
                                 <AvatarImage
                                    src={
                                       sessionUser?.image ||
                                       "https://i.ibb.co.com/mFrvXNpF/avatar.png"
                                    }
                                    alt={sessionUser?.name || "User"}
                                 />
                                 <AvatarFallback>
                                    {getUserName(sessionUser?.name)}
                                 </AvatarFallback>
                              </Avatar>
                           </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-44 rounded-sm">
                           <DropdownMenuGroup>
                              <DropdownMenuItem>Profile</DropdownMenuItem>
                              <DropdownMenuItem>Billing</DropdownMenuItem>
                              <DropdownMenuItem>
                                 <ModeToggle />
                              </DropdownMenuItem>
                           </DropdownMenuGroup>

                           <DropdownMenuSeparator />
                           <DropdownMenuGroup>
                              <DropdownMenuItem
                                 variant="destructive"
                                 onClick={handleLogOut}
                              >
                                 Log out
                              </DropdownMenuItem>
                           </DropdownMenuGroup>
                        </DropdownMenuContent>
                     </DropdownMenu>
                  ) : (
                     <Button asChild variant="outline" size="sm">
                        <a href={auth.login.url}>{auth.login.title}</a>
                     </Button>
                  )}
               </div>
            </nav>

            {/* Mobile Menu */}
            <div className="block lg:hidden">
               <div className="flex items-center justify-between">
                  {/* Logo */}
                  <a href={logo.url} className="flex items-center gap-2">
                     <Image
                        src={logo.src}
                        className="dark:invert"
                        alt={logo.alt}
                        width={75}
                        height={100}
                     />
                  </a>
                  <Sheet>
                     <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                           <Menu className="size-4" />
                        </Button>
                     </SheetTrigger>
                     <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                           <SheetTitle>
                              <a
                                 href={logo.url}
                                 className="flex items-center gap-2"
                              >
                                 <Image
                                    src={logo.src}
                                    className="dark:invert"
                                    alt={logo.alt}
                                    width={75}
                                    height={100}
                                 />
                              </a>
                           </SheetTitle>
                        </SheetHeader>

                        <div className="flex flex-col gap-6 p-4 -mt-5">
                           <Field>
                              <ButtonGroup className="relative">
                                 <IoMdSearch className="absolute top-3 ml-3" />

                                 <Input
                                    id="input-button-group"
                                    placeholder="Find your medicine"
                                    className="h-10 pl-10"
                                 />
                                 <Button className="h-10 cursor-pointer">
                                    Search
                                 </Button>
                              </ButtonGroup>
                           </Field>

                           <Accordion
                              type="single"
                              collapsible
                              className="flex w-full flex-col gap-4"
                           >
                              {menu.map((item) => renderMobileMenuItem(item))}
                           </Accordion>

                           <div className="flex flex-col gap-3">
                              <Button asChild variant="outline">
                                 <a href={auth.login.url}>{auth.login.title}</a>
                              </Button>
                              <Button asChild>
                                 <a href={auth.signup.url}>
                                    {auth.signup.title}
                                 </a>
                              </Button>
                           </div>
                        </div>
                     </SheetContent>
                  </Sheet>
               </div>
            </div>
         </div>
      </section>
   );
};

const renderMenuItem = (item: MenuItem) => {
   if (item.items) {
      return (
         <NavigationMenuItem key={item.title}>
            <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
            <NavigationMenuContent className="bg-popover text-popover-foreground">
               {item.items.map((subItem) => (
                  <NavigationMenuLink
                     asChild
                     key={subItem.title}
                     className="w-80"
                  >
                     <SubMenuLink item={subItem} />
                  </NavigationMenuLink>
               ))}
            </NavigationMenuContent>
         </NavigationMenuItem>
      );
   }

   return (
      <NavigationMenuItem key={item.title}>
         <NavigationMenuLink
            href={item.url}
            className="group inline-flex h-10 w-max items-center justify-center rounded-md mr-2 text-sm font-medium transition-colors hover:bg-background hover:text-chart-3 hover:scale-105"
         >
            {item.title}
         </NavigationMenuLink>
      </NavigationMenuItem>
   );
};

// Mobile Menu
const renderMobileMenuItem = (item: MenuItem) => {
   if (item.items) {
      return (
         <AccordionItem
            key={item.title}
            value={item.title}
            className="border-b-0"
         >
            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
               {item.title}
            </AccordionTrigger>
            <AccordionContent className="mt-2">
               {item.items.map((subItem) => (
                  <SubMenuLink key={subItem.title} item={subItem} />
               ))}
            </AccordionContent>
         </AccordionItem>
      );
   }

   return (
      <a key={item.title} href={item.url} className="text-md font-semibold">
         {item.title}
      </a>
   );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
   return (
      <a
         className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
         href={item.url}
      >
         <div className="text-foreground">{item.icon}</div>
         <div>
            <div className="text-sm font-semibold">{item.title}</div>
            {item.description && (
               <p className="text-sm leading-snug text-muted-foreground">
                  {item.description}
               </p>
            )}
         </div>
      </a>
   );
};

export { Navbar };
