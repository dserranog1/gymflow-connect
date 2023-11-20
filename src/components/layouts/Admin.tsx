import { useRouter } from "next/router";
import { useEffect, type FC, type PropsWithChildren } from "react";
import { useToast } from "../ui/use-toast";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useUser } from "@/hooks/use-user";

const Admin: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: user } = useUser();
  useEffect(() => {
    if (!user?.isAdmin) {
      router.replace("/dashboard");
      toast({
        variant: "destructive",
        title: "Sin autorización",
        description: "No tienes permiso para ver esta página",
      });
    }
  }, [user]);
  return (
    <>
      {!user?.isAdmin ? (
        <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default Admin;
