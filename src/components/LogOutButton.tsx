import Link from "next/link";
import { Button } from "./ui/button";
import { pb } from "@/services/pocketbase";

const LogOutButton = () => {
  return (
    <Button
      asChild
      onClick={() => {
        pb.authStore.clear();
      }}
    >
      <Link href="/">Cerrar sesión</Link>
    </Button>
  );
};

export default LogOutButton;
