import Header from "@/components/header/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Phone, Search, Video } from "lucide-react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
  messageList: React.ReactNode;
}) {
  return (

          <div className=" sticky top-15 min-h-[calc(100vh-9vh)]   overflow-hidden">
            <div className="flex h-15 bg-accent backdrop-blur-lg ">
              <div className="flex-4/12 border border-r-0 border-muted flex  justify-between items-center px-5  ">
                <span className="font-semibold">All Chat</span>
                <span className="flex gap-2 ">
                  <Search className="bg-accent p-2 rounded-sm" size={40} />
                  <EllipsisVertical
                    className="bg-accent p-2 rounded-sm"
                    size={40}
                  />
                </span>
              </div>
              <div className="flex-9/12 flex justify-between border-b-0 items-center  border border-muted px-5">
                <div className="flex  items-center   shadow ">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      width={30}
                      className="rounded-full "
                    />
                    <AvatarFallback>MK</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm">Michael Kimov</p>
                    <p className="text-sm text-muted ">@alisa_w</p>
                  </div>
                </div>
                <div className="flex gap-3 ">
                  <Video className="bg-accent p-2 rounded-sm" size={40} />
                  <Phone className="bg-accent p-2 rounded-sm" size={40} />
                </div>
              </div>
            </div>

            <div className=" min-h-[calc(100vh-15.2vh)] " >
              {children} 
            </div>
          </div>
  );
}
