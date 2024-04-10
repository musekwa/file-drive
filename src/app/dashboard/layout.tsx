import { Suspense } from "react";
import TopBar from "./_components/search-bar";
import SideNav from "./side-nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="  light:bg-white">
      <div className="px-4 md:px-6 lg:px-20 mx-auto pl-0">
        <div className="flex gap-8">
          <div className="pt-24 ">
            <SideNav />
          </div>
          <div className="w-full pt-4 ">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
