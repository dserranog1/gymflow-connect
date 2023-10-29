import { pb } from "@/services/pocketbase";
import type { FC, PropsWithChildren } from "react";
import LogOutButton from "../LogOutButton";
import { Button } from "../ui/button";
import Link from "next/link";
import Header from "../Header";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-full min-h-screen flex-col bg-slate-100 justify-between">
      <Header />
      <main className="flex flex-col flex-1">{children}</main>
      <footer>footer goes here!</footer>
    </div>
  );
};

export default MainLayout;
