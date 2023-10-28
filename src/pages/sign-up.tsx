import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/components/forms/SignUpForm";
import { ReactElement } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import ContentLayout from "@/components/layouts/ContentLayout";
import { NextPageWithLayout } from "./_app";
const SignUpPage: NextPageWithLayout = () => {
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
