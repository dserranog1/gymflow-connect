import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import ContentLayout from "@/components/layouts/ContentLayout";
import Auth from "@/components/layouts/Auth";
import { useUser } from "@/hooks/use-user";
import { UpdateIcon } from "@radix-ui/react-icons";

const Profile: NextPageWithLayout = () => {
  const { data: user, isError, isLoading } = useUser("profile");

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
        <h1 className="text-3xl">Profile para {user?.name}</h1>
      </div>
    </>
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
