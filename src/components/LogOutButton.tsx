import Link from "next/link";
import { Button } from "./ui/button";
import { pb } from "@/services/pocketbase";

const LogOutButton = () => {
  return (
    <Button
      asChild
      className="text-amber-300"
      onClick={() => {
        pb.authStore.clear();
      }}
      variant="link"
    >
      <Link href="/">Cerrar sesión</Link>
    </Button>
  );
};

export default LogOutButton;
