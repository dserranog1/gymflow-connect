import { NextPageWithLayout } from "./_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import { ReactElement } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignInForm from "@/components/forms/SignInForm";
import Image from "next/image";
import GymBackground from "@/assets/gym-login.jpg";
import { useRouter } from "next/router";
import { pb } from "@/services/pocketbase";
import { UpdateIcon } from "@radix-ui/react-icons";

const SignInPage: NextPageWithLayout = () => {
  const router = useRouter();
  if (pb.authStore.isValid) {
    router.push("/dashboard");
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  return (
    <>
      <div className="flex flex-row items-center flex-1">
        <Image
          src={GymBackground}
          alt="Dos mancuernas y guantes sobre un fondo gris"
          className="w-2/5 ml-12 border-2 border-slate-800 p-4"
        />
        <Card className="w-96 mx-auto">
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <ContentLayout>{page}</ContentLayout>;
};

export default SignInPage;
