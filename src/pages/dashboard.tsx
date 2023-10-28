import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { pb } from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types";
import { useRouter } from "next/router";

const SignInPage: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["user"]);
  console.log(user);
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row items-center flex-1">
        <h1 className="text-3xl">Dashboard page for {user?.name}</h1>
        <Button
          onClick={() => {
            // pb.authStore.clear();
            // toast({
            //   title: `Hasta pronto!`,
            // });
            // queryClient.removeQueries(["user"]);
            // router.push("/");
            console.log(queryClient.getQueryData<User>(["user"]));
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    </>
  );
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ContentLayout>{page}</ContentLayout>
    </MainLayout>
  );
};

export default SignInPage;
