import MainLayout from "@/components/layouts/MainLayout";
import { NextPageWithLayout } from "./_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-8">
      <h1 className="text-3xl">
        Bienvenido a <span className="text-orange-600">Gymflow Connect</span>
      </h1>
      <h3 className="text-xl">Registrate o inicia sesión para continuar</h3>
      <div className="flex gap-8">
        <Button asChild className="bg-orange-600 hover:bg-orange-400">
          <Link href="/login">Iniciar sesión</Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="border-orange-600 border-2 hover:bg-orange-100"
        >
          <Link href="/sign-up">Registrarse</Link>
        </Button>
      </div>
    </div>
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
