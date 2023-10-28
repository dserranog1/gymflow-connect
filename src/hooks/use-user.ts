import { pb } from "@/services/pocketbase";
import { useRouter } from "next/router";

export const userUser = ({ redirectTo }: { redirectTo: string }) => {
  const user = pb.authStore.isValid;
  if (pb.authStore.isValid) {
    return pb.authStore.model;
  } else {
    const router = useRouter();
    router.push("/login");
  }
};
