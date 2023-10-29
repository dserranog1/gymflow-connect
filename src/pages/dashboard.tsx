import { ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "./_app";
import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { pb } from "@/services/pocketbase";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import Auth from "@/components/layouts/Auth";

const Dashboard: NextPageWithLayout = () => {
  const user = pb.authStore.model as User;
  return (
    <>
      <div className="flex flex-col items-center flex-1 gap-24 justify-center">
        <h1 className="text-3xl">Dashboard page for {user?.name}</h1>
      </div>
    </>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ContentLayout>
        <Auth>{page}</Auth>
      </ContentLayout>
    </MainLayout>
  );
};

export default Dashboard;
