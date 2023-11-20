import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { useUser } from "@/hooks/use-user";
import { UpdateIcon } from "@radix-ui/react-icons";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile: NextPageWithLayout = () => {
  const { data: user, isError, isLoading } = useUser();

  if (isLoading) {
    return (
      <UpdateIcon className="h-32 w-32 animate-spin self-center my-auto" />
    );
  }
  if (isError) {
    return (
      <div className="flex flex-row items-center justify-center flex-1">
        Error al cargar la información del usuario, intenta cerrar sesión y
        entrar de nuevo
      </div>
    );
  }
  return (
    <div className="mx-auto my-20">
      <Card>
        <CardHeader>
          <CardTitle>Actualización de datos</CardTitle>
        </CardHeader>
        <CardContent>
          <UpdateUserForm user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

Profile.getLayout = function getLayout(page: ReactElement) {
  return (
    <ContentLayout>
      <Auth>{page}</Auth>
    </ContentLayout>
  );
};

export default Profile;
