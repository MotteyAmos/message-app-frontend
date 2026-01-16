import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  VectorSquare,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { BiMessageError } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";

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
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Overview",
    url: "#",
    icon: Home,
  },
  {
    title: "Automations",
    url: "#",
    icon: VectorSquare,
  },
  {
    title: "Analytics",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Reporting",
    url: "#",
    icon: Search,
  },
  {
    title: "Messages",
    url: "messages",
    icon: Settings,
  },
  {
    title: "Friends",
    url:"Users",
    icon:IoIosPeople
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="top-22">
      <SidebarHeader>
        <div className="relative w-[90%] mx-auto mt-5 max-w-sm bg-accent rounded-sm flex ">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="pl-8 pr-9 text-white "
          />
          <span className="right-2 absolute top-1.5 bg-[#173446] w-6 flex justify-center rounded-sm text-white">
            F
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <SidebarGroupLabel className="pl-6">Menu</SidebarGroupLabel>
          <SidebarGroupContent className="pl-7">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="group/item">
                  <SidebarMenuButton
                    asChild
                    className="hover:backdrop-blur-lg transition-all ease-in-out  duration-300 hover:bg-[linear-gradient(120deg,#0f2537_0%,#0d3042_50%,#0a3a50_100%)]"
                  >
                    <Link href={item.url}>
                      <item.icon
                        className={cn(
                          "font-bold group-hover/item:text-white",
                          item.title === "Automations" &&
                            "rotate-y-25 rotate-z-45"
                        )}
                      />
                      <span className="group-hover/item:text-white">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="pl-6">Support</SidebarGroupLabel>
          <SidebarGroupContent className="pl-7">
            <SidebarMenu>
              <SidebarMenuItem className="group/item">
                <SidebarMenuButton asChild className="hover:backdrop-blur-lg  transition-all ease-in-out  duration-300 hover:bg-[linear-gradient(120deg,#0f2537_0%,#0d3042_50%,#0a3a50_100%)]">
                  <Link href="#">
                    <Settings className="font-bold group-hover/item:text-white"/>
                    <span className="group-hover/item:text-white">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild className="hover:backdrop-blur-lg transition-all ease-in-out duration-300  hover:bg-[linear-gradient(120deg,#0f2537_0%,#0d3042_50%,#0a3a50_100%)] hover:text-white">
                  <Link href="#">
                    <BiMessageError  className="font-bold group-hover/item:text-white"/>
                    <span>Help</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
