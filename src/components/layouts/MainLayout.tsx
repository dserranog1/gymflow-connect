import { pb } from "@/services/pocketbase";
import type { FC, PropsWithChildren } from "react";
import LogOutButton from "../LogOutButton";
import { Button } from "../ui/button";
import Link from "next/link";
import Header from "../Header";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const backgroundStyle = {
    backgroundImage: `url("/src/assets/fondo.jpg")`,
    backgroundSize: "cover", // Puedes ajustar esto según tus necesidades
  };
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="flex flex-col flex-1 ">{children}</main>
      <footer className = "flex items-center justify-center text-lg bg-gradient-to-r from-[#FFA500] to-[#FF6347] text-white">2023, All Rights Reserved Gymflow App</footer>
    </div>
  );
};

export default MainLayout;
