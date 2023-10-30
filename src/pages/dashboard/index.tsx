import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { UpdateIcon } from "@radix-ui/react-icons";

const Dashboard: NextPageWithLayout = () => {
  const { data: user, isError, isLoading } = useUser("dashboard");
  if (isLoading) {
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  if (isError) {
    return (
      <div className="flex flex-row items-center justify-center flex-1">
        Error al cargar la información del usuario
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center flex-1 gap-24 justify-center">
        <h1 className="text-3xl">Dashboard para {user?.name}</h1>
        <Button asChild>
          <Link href="dashboard/profile">Ver/editar informacion personal</Link>
        </Button>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <ContentLayout>
      <Auth>{page}</Auth>
    </ContentLayout>
  );
};

export default Dashboard;
