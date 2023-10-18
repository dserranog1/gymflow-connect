import MainLayout from "@/components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import { ReactElement } from "react";

const Home: NextPageWithLayout = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      Welcome to Gymflow Connect
    </main>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ContentLayout>{page}</ContentLayout>
    </MainLayout>
  );
};

export default Home;
