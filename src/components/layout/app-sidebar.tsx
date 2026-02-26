import * as React from "react";

import {
   Sidebar,
   SidebarContent,
   SidebarGroup,
   SidebarGroupContent,
   SidebarGroupLabel,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Route } from "../../../types/routes.type";
import { adminRoutes } from "@/routes/adminRoutes";
import { SearchForm } from "./search-form";

export function AppSidebar({
   user,
   ...props
}: {
   user: { role: string } & React.ComponentProps<typeof Sidebar>;
}) {
   let routes: Route[] = [];

   switch (user.role) {
      case "admin":
         routes = adminRoutes;
         break;

      case "user":
         // routes = userRoutes;
         break;

      default:
         routes = [];
         break;
   }

   return (
      <Sidebar {...props}>
         <SidebarHeader>
            <SearchForm />
         </SidebarHeader>
         <SidebarContent>
            {routes.map((item) => (
               <SidebarGroup key={item.title}>
                  <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                  <SidebarGroupContent>
                     <SidebarMenu>
                        {item.items.map((item) => (
                           <SidebarMenuItem key={item.title}>
                              <SidebarMenuButton asChild>
                                 <Link href={item.url}>{item.title}</Link>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        ))}
                     </SidebarMenu>
                  </SidebarGroupContent>
               </SidebarGroup>
            ))}
         </SidebarContent>
         <SidebarRail />
      </Sidebar>
   );
}
