import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Block non admins from accessing this page
  const user = await currentUser();
  if (!user || user?.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="w-full h-full">
      <Sidebar isAdmin />
      <div className="w-full ml-75">
        <Header />
        <div className="w-full mt-18.75 p-4">{children}</div>
      </div>
    </div>
  );
}
