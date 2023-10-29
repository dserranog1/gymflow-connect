import { pb } from "@/services/pocketbase";
import { useRouter } from "next/router";
import type { FC, PropsWithChildren } from "react";
import { useToast } from "../ui/use-toast";
import { UpdateIcon } from "@radix-ui/react-icons";

const Auth: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  console.log("rendering Auth");
  if (!pb.authStore.isValid) {
    toast({
      variant: "destructive",
      title: "Sesión inválida",
      description: "Por favor inicia sesión de nuevo",
    });
    router.push("/login");
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  return <>{children}</>;
};

export default Auth;
