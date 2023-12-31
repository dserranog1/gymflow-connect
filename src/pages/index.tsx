import { NextPageWithLayout } from "./_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import { ReactElement } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { pb } from "@/services/pocketbase";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  if (pb.authStore.isValid) {
    router.push("/dashboard");
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-8">
      <h1 className="text-4xl">
        Bienvenido a <span className="text-orange-600">Gymflow Connect</span>
      </h1>
      <h1 className="text-2xl">
        Donde el progreso se encuentra con la persistencia
      </h1>
      <div className="text-center border rounded p-4 flex flex-col items-center">
        <h3 className="text-xl">Registrate o inicia sesión para continuar</h3>
        <div className="flex gap-8">
          <Button asChild className="bg-orange-600 hover:bg-orange-400 mt-7">
            <Link href="/login">Iniciar sesión</Link>
          </Button>
          <Button variant="outline" asChild className="border-orange-600 border-2 hover:bg-orange-100 mt-7">
            <Link href="/sign-up">Registrarse</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout>{page}</ContentLayout>;
};

export default Home;
