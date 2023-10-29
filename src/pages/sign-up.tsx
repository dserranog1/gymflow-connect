import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/components/forms/SignUpForm";
import { ReactElement } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { NextPageWithLayout } from "./_app";
import { UpdateIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { pb } from "@/services/pocketbase";
const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  if (pb.authStore.isValid) {
    router.push("/dashboard");
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  return (
    <div className="mx-auto my-20">
      <Card>
        <CardHeader>
          <CardTitle>Registro</CardTitle>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ContentLayout>{page}</ContentLayout>
    </MainLayout>
  );
};

export default SignUpPage;
