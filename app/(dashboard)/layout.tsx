import Header from "@/components/header/Header";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { EllipsisVertical, Phone, Search, Video } from "lucide-react";
import { ToastContainer } from "react-toastify";

export default function Layout({
  children,
  messageList,
  messagingContainer,
}: {
  children: React.ReactNode;
  messageList: React.ReactNode;
  messagingContainer: React.ReactNode;
}) {
  return (
    <div className="flex flex-col max-w-[100vw] min-h-screen ">

      <Header />

      <SidebarProvider className="w-full min-h-[calc(100vh-5.4rem)] ">
          <AppSidebar />
        <main className=" w-[calc(100%-16rem)] left-64 min-h-[calc(100vh-5.4rem)]   ">
          {/* <SidebarTrigger /> */}
         {children}
        </main>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
      </SidebarProvider>
    </div>
  );
}
